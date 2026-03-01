<article @php(post_class('search-result-item')) >
  <header>
    <h2 class="search-result-title">
      <a href="{{ get_permalink() }}">
        {!! $title !!}
      </a>
    </h2>

    @includeWhen(get_post_type() === 'post', 'partials.entry-meta')

    @if (get_post_type() !== 'post')
      <span class="search-result-type">{{ ucfirst(get_post_type()) }}</span>
    @endif
  </header>

  <div class="search-result-excerpt">
    @php(the_excerpt())
  </div>

  <a href="{{ get_permalink() }}" class="search-result-readmore">
    Read more
    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
    </svg>
  </a>
</article>
