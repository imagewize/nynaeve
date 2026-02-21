<div class="flex items-center space-x-2 text-sm text-gray-500 flex-nowrap">
  <time class="dt-published" datetime="{{ get_post_time('c', true) }}">
    {{ get_the_date() }}
  </time>

  <span class="text-gray-400">•</span>

  <span>{{ __('By', 'sage') }}</span>
  <a href="{{ get_author_posts_url(get_the_author_meta('ID')) }}" class="p-author h-card hover:text-indigo-600 transition-colors">
    {{ get_the_author() }}
  </a>

  @if(is_single())
    @php($categories = get_the_category())
    @if($categories)
      <span class="text-gray-400">•</span>
      <a href="{{ esc_url(get_category_link($categories[0]->term_id)) }}" class="hover:text-indigo-600 transition-colors">
        {{ esc_html($categories[0]->name) }}
      </a>
    @endif
  @endif
</div>
