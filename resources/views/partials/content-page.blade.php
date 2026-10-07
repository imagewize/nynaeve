{{--
  WordPress-native layout system (same as block themes like Twenty Twenty-Five):
  - has-global-padding: applies theme.json root padding; core zeroes it on nested
    constrained groups and lets .alignfull children break out with negative margins
  - is-layout-constrained: centers child blocks at contentSize (52rem), alignwide at wideSize
--}}
<div class="wp-block-post-content alignfull has-global-padding is-layout-constrained">
  @php(the_content())
</div>

@if ($pagination())
  <nav class="page-nav" aria-label="Page">
    {!! $pagination !!}
  </nav>
@endif
