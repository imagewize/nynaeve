{{-- WordPress blocks self-manage layout via is-layout-constrained --}}
@php(the_content())

@if ($pagination())
  <nav class="page-nav" aria-label="Page">
    {!! $pagination !!}
  </nav>
@endif
