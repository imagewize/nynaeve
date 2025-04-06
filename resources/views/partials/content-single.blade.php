<article @php(post_class('h-entry container max-w-5xl mt-20 px-5 lg:mx-auto'))>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div class="lg:col-span-2">
      <header>
        <h1 class="p-name font-open-sans font-bold text-3xl text-black mb-8 antialiased">
          {!! $title !!}
        </h1>

        @include('partials.entry-meta')
      </header>

      <div class="e-content mt-3 mb-10">
        @php(the_content())
      </div>

      @if ($pagination)
        <footer>
          <nav class="page-nav" aria-label="Page">
            {!! $pagination !!}
          </nav>
        </footer>
      @endif

      @php(comments_template())
    </div>

    <div class="hidden lg:grid lg:col-span-1">
      @include('sections.sidebar')
    </div>
  </div>
</article>
