{{--
  Slim sticky sidebar CTA for single posts (xl+ only). Replaces the old
  full-column "Related Articles" widget, which logs showed got essentially zero
  clicks and was hidden below `lg` anyway (see PR #394).

  Styled to match the in-content CTA groups used across the blog — `tertiary`
  panel, `primary` left accent rule, Montserrat heading, `rounded-[8px]`
  primary button — rather than inventing a second CTA language.
--}}
<div class="bg-tertiary border-l-4 border-primary rounded-r-[10px] px-6 py-7">
  <p class="text-xs font-semibold uppercase tracking-wider text-primary font-open-sans">
    {{ __('Work With Me', 'nynaeve') }}
  </p>

  {{-- app.css styles bare `h2` outside any cascade layer, so plain Tailwind
       utilities lose to it regardless of specificity — hence the `!` variants. --}}
  <h2 class="mt-3 !text-lg !font-bold !leading-snug !text-main !font-montserrat">
    {{ __('Need a WordPress developer?', 'nynaeve') }}
  </h2>

  <p class="mt-3 text-sm leading-relaxed text-main-accent font-open-sans">
    {{ __('I build and maintain fast WordPress & WooCommerce sites on Trellis, Bedrock and Sage. No page builders, no retainer required.', 'nynaeve') }}
  </p>

  <a
    href="{{ home_url('/contact/') }}"
    class="mt-5 inline-flex w-full items-center justify-center rounded-[8px] bg-primary px-4 py-2.5 text-sm font-semibold text-white no-underline transition-colors duration-200 hover:bg-primary-dark"
  >
    {{ __('Get a Quote', 'nynaeve') }}
  </a>

  <p class="mt-7 pt-5 border-t border-border-dark/50 text-xs font-semibold uppercase tracking-wider text-secondary font-open-sans">
    {{ __('Services', 'nynaeve') }}
  </p>

  <ul class="mt-3 list-none space-y-2.5 pl-0">
    @foreach ([
      '/services/wordpress-development/' => __('WordPress Development', 'nynaeve'),
      '/services/woocommerce/' => __('WooCommerce', 'nynaeve'),
      '/services/speed-optimization/' => __('Speed Optimization', 'nynaeve'),
      '/services/managed-wordpress-hosting/' => __('Managed Hosting', 'nynaeve'),
    ] as $path => $label)
      <li>
        <a
          href="{{ home_url($path) }}"
          class="group flex items-center justify-between gap-3 text-sm text-main no-underline transition-colors duration-200 hover:text-primary"
        >
          {{ $label }}
          <span
            aria-hidden="true"
            class="text-primary transition-transform duration-200 group-hover:translate-x-0.5"
          >&rarr;</span>
        </a>
      </li>
    @endforeach
  </ul>
</div>
