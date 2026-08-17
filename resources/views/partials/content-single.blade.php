<article @php(post_class('h-entry mt-20'))>
  {{--
    Two-column article layout (xl+): content column stays at contentSize (55rem)
    while a slim sticky CTA card sits beside it. Below xl the aside is dropped
    entirely and the content behaves exactly like every other page on the site.

    The grid lives on a PLAIN wrapper, never on the `.wp-block-post-content`
    element itself: WP core's block-library stylesheet sets
    `.wp-block-post-content { display: flow-root }` unlayered, which beats
    Tailwind's `xl:grid` (in `@layer utilities`) no matter the specificity —
    the column would silently collapse and the aside would stack underneath.

    Keeping the aside a *sibling* of `.wp-block-post-content` also keeps it out
    of the content-area link rule in app.css, which would otherwise repaint the
    card's white button label `primary` blue-on-blue.
  --}}
  <div class="alignfull pb-16 xl:grid xl:grid-cols-[minmax(0,55rem)_18rem] xl:justify-center xl:gap-12 xl:items-start">
    <div class="wp-block-post-content is-layout-constrained">
      <header>
        <h1 class="p-name mb-8 antialiased !text-black">
          {!! $title !!}
        </h1>

        @include('partials.entry-meta')
      </header>

      <div class="e-content mt-3 mb-10 space-y-3">
        @php(the_content())
      </div>

      @if ($pagination())
        <footer>
          <nav class="page-nav" aria-label="Page">
            {!! $pagination !!}
          </nav>
        </footer>
      @endif

      @php(comments_template())
    </div>

    {{-- `items-start` above shrinks this track to its content height, which is
         what lets `sticky` resolve against the full grid-row height.

         `mb-20` is load-bearing, not decoration: a sticky box is constrained so
         its *margin* box stays inside the containing block, so the margin is
         what stops the card short of the row bottom instead of letting it ride
         flush into the footer. Padding on the grid wrapper can't do this — that
         sits outside the tracks and never extends the grid area. --}}
    <aside class="hidden xl:block xl:sticky xl:top-24 xl:mb-20" aria-label="{{ __('Work with me', 'nynaeve') }}">
      @include('partials.blog-sidebar-card')
    </aside>
  </div>
</article>
