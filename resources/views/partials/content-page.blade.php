{{--
  WordPress-native layout system (Twenty Twenty-Five approach):
  - alignfull: makes the container full-width
  - is-layout-constrained: centers child blocks at contentSize (55rem/880px)
  - useRootPaddingAwareAlignments in theme.json allows .alignfull blocks to break out
--}}
<div class="wp-block-post-content alignfull is-layout-constrained">
  @php(the_content())
</div>

@if ($pagination())
  <nav class="page-nav" aria-label="Page">
    {!! $pagination !!}
  </nav>
@endif
