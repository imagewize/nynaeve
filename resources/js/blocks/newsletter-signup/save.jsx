import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Static markup. The form is wired up by view.js, which posts to the
 * imagewize/v1/newsletter REST route (app/newsletter.php). Nothing here is
 * secret and nothing is generated per request, so the block can be cached.
 */
export default function Save({ attributes }) {
  const {
    nameLabel,
    emailLabel,
    consentText,
    privacyLabel,
    privacyUrl,
    buttonText,
    successMessage,
    errorMessage,
  } = attributes;

  const blockProps = useBlockProps.save({
    className: 'wp-block-imagewize-newsletter-signup',
  });

  return (
    <div {...blockProps}>
      <div className="newsletter-signup__inner">
        <div className="newsletter-signup__intro">
          <InnerBlocks.Content />
        </div>

        <form
          className="newsletter-signup__form"
          method="post"
          noValidate
          data-success={successMessage}
          data-error={errorMessage}
        >
          <div className="newsletter-signup__field">
            <label htmlFor="newsletter-name">{nameLabel}</label>
            <input
              id="newsletter-name"
              name="name"
              type="text"
              autoComplete="given-name"
              maxLength="80"
              required
            />
          </div>

          <div className="newsletter-signup__field">
            <label htmlFor="newsletter-email">{emailLabel}</label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength="254"
              required
            />
          </div>

          <div className="newsletter-signup__trap" aria-hidden="true">
            <label htmlFor="newsletter-website">Leave this field empty</label>
            <input
              id="newsletter-website"
              name="website"
              type="text"
              tabIndex="-1"
              autoComplete="off"
            />
          </div>

          <div className="newsletter-signup__consent">
            <input id="newsletter-consent" name="consent" type="checkbox" value="1" required />
            <label htmlFor="newsletter-consent">
              {consentText}{' '}
              <a href={privacyUrl}>{privacyLabel}</a>
            </label>
          </div>

          <button type="submit" className="newsletter-signup__button">
            {buttonText}
          </button>

          <p className="newsletter-signup__message" role="status" aria-live="polite" />
        </form>
      </div>
    </div>
  );
}
