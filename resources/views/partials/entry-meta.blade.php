<div class="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500">
  <span class="flex items-center gap-x-2 flex-nowrap">
    <time class="dt-published" datetime="{{ get_post_time('c', true) }}">
      {{ get_the_date() }}
    </time>

    <span class="text-gray-400">•</span>

    <span>{{ __('By', 'sage') }}</span>
    <a href="{{ get_author_posts_url(get_the_author_meta('ID')) }}" class="p-author h-card hover:text-indigo-600 transition-colors">
      {{ get_the_author() }}
    </a>

  </span>

  @if(is_single())
    @php($categories = get_the_category())
    @if($categories)
      <span class="flex items-center gap-x-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-gray-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 2H2v10l10 10L22 12 12 2z"/>
          <circle cx="7" cy="7" r="1" fill="currentColor" stroke="none"/>
        </svg>
        <a href="{{ esc_url(get_category_link($categories[0]->term_id)) }}" class="hover:text-indigo-600 transition-colors">
          {{ esc_html($categories[0]->name) }}
        </a>
      </span>
    @endif
  @endif
</div>
