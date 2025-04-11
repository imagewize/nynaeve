<div class="page-container mb-16">
  @php(the_content())

  @if ($pagination())
    <nav class="page-nav" aria-label="Page">
      {!! $pagination !!}
    </nav>
  @endif
</div>
