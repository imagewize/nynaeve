<div class="{{ $block->classes }}" style="{{ $block->inlineStyle }}">
  @if ($items)
    <ul>
      @foreach ($items as $item)
        @if (isset($item['page']))
          <li><a href="{{ get_permalink($item['page']) }}">{{ html_entity_decode(get_the_title($item['page'])) }}</a></li>
        @endif
      @endforeach
    </ul>
  @else
    <p>{{ $block->preview ? 'Add an item...' : 'No items found!' }}</p>
  @endif
</div>
