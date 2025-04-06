<div class="page-container mb-16 font-open-sans text-textbodygray text-base leading-loose">
  @php(the_content())

  @if ($pagination)
    <nav class="page-nav" aria-label="Page">
      {!! $pagination !!}
    </nav>
  @endif
</div>
