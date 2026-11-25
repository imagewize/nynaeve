<?php

/**
 * Newsletter signup endpoint for the imagewize/newsletter-signup block.
 *
 * POST /wp-json/imagewize/v1/newsletter
 *
 * Sends the signup to Brevo as a double opt-in request: Brevo emails the
 * person a confirmation link and only adds them to the list once they click.
 * Nothing is stored in WordPress.
 *
 * Configuration (Bedrock .env / Trellis wordpress_sites env, never in git):
 *   BREVO_API_KEY            API key (v3), a different key from the SMTP login
 *   BREVO_LIST_ID            numeric ID of the newsletter list
 *   BREVO_DOI_TEMPLATE_ID    numeric ID of the double opt-in email template
 *   BREVO_DOI_REDIRECT_URL   page shown after the confirmation click
 */
add_action('rest_api_init', function () {
    register_rest_route('imagewize/v1', '/newsletter', [
        'methods' => 'POST',
        'callback' => 'imagewize_newsletter_signup',
        'permission_callback' => '__return_true',
    ]);
});

function imagewize_newsletter_setting(string $key): string
{
    $value = $_ENV[$key] ?? getenv($key);

    return is_string($value) ? trim($value) : '';
}

function imagewize_newsletter_signup(WP_REST_Request $request): WP_REST_Response
{
    $fail = function (string $message, int $status) {
        return new WP_REST_Response(['ok' => false, 'message' => $message], $status);
    };
    $done = new WP_REST_Response(['ok' => true], 200);

    $name = trim(wp_strip_all_tags((string) $request->get_param('name')));
    $email = sanitize_email((string) $request->get_param('email'));
    $consent = $request->get_param('consent') === true || $request->get_param('consent') === '1';
    $trap = (string) $request->get_param('website');
    $elapsed = (int) $request->get_param('elapsed');

    // Bots: honeypot filled, or submitted faster than a person can type.
    // Answer "ok" so they learn nothing.
    if ($trap !== '' || $elapsed < 3000) {
        return $done;
    }

    if ($name === '' || mb_strlen($name) > 80 || ! is_email($email) || strlen($email) > 254) {
        return $fail('Please enter your name and a valid email address.', 422);
    }

    // Explicit consent is required by the form and re-checked here.
    if (! $consent) {
        return $fail('Please tick the box to agree to receive the newsletter.', 422);
    }

    // Limit confirmation emails: a forged signup makes Brevo email a stranger.
    $ip_key = 'nl_ip_'.md5($_SERVER['REMOTE_ADDR'] ?? 'unknown');
    $mail_key = 'nl_em_'.md5(strtolower($email));
    $ip_hits = (int) get_transient($ip_key);
    if ($ip_hits >= 5 || get_transient($mail_key)) {
        return $fail('Too many attempts. Please try again later.', 429);
    }
    set_transient($ip_key, $ip_hits + 1, HOUR_IN_SECONDS);
    set_transient($mail_key, 1, HOUR_IN_SECONDS);

    $api_key = imagewize_newsletter_setting('BREVO_API_KEY');
    $list_id = (int) imagewize_newsletter_setting('BREVO_LIST_ID');
    $template_id = (int) imagewize_newsletter_setting('BREVO_DOI_TEMPLATE_ID');
    $redirect = imagewize_newsletter_setting('BREVO_DOI_REDIRECT_URL') ?: home_url('/');

    if ($api_key === '' || $list_id < 1 || $template_id < 1) {
        error_log('[newsletter] BREVO_API_KEY, BREVO_LIST_ID or BREVO_DOI_TEMPLATE_ID is not configured');

        return $fail('The signup is not available right now. Please try again later.', 503);
    }

    $response = wp_remote_post('https://api.brevo.com/v3/contacts/doubleOptinConfirmation', [
        'timeout' => 10,
        'headers' => [
            'api-key' => $api_key,
            'accept' => 'application/json',
            'content-type' => 'application/json',
        ],
        'body' => wp_json_encode([
            'email' => $email,
            'attributes' => ['FIRSTNAME' => $name],
            'includeListIds' => [$list_id],
            'templateId' => $template_id,
            'redirectionUrl' => $redirect,
        ]),
    ]);

    if (is_wp_error($response)) {
        error_log('[newsletter] Brevo request failed: '.$response->get_error_message());

        return $fail('Something went wrong. Please try again in a minute.', 502);
    }

    $code = wp_remote_retrieve_response_code($response);

    // 2xx: confirmation email queued. An existing contact comes back as a 400
    // "already exist"; treat that as success too so the form never reveals
    // who is already subscribed. Match "already", not "exist": Brevo's
    // "An active DOI template does not exist" must stay an error.
    if ($code >= 200 && $code < 300) {
        return $done;
    }

    $body = (string) wp_remote_retrieve_body($response);
    if ($code === 400 && stripos($body, 'already') !== false) {
        return $done;
    }

    error_log('[newsletter] Brevo returned '.$code.': '.substr($body, 0, 300));

    return $fail('Something went wrong. Please try again in a minute.', 502);
}
