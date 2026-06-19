@props(['item'])

{{--
  Mega menu: an alternate renderer for ONE flagged top-level menu item
  (CSS class `mega-menu`). All link data still lives in the WordPress menu and
  is edited in nav-menus.php — this only changes how it is displayed.

  Root reuses `.submenu-list` so the existing CSS does the work for free:
    - mobile (<lg): the parent checkbox accordion expands this panel
    - desktop (lg+): `.group:hover > .submenu-list` reveals it + the hover bridge

  Two renderings of the same `$item->children`:
    - Desktop grid (`.mega-grid`, hidden on mobile): labelled columns with icons,
      descriptions and a hardcoded featured CTA card (column 4).
    - Mobile accordion (`lg:hidden`): recurses <x-menu-item> so group headers
      become the same collapsible rows used everywhere else — one behaviour,
      no forked accordion logic.

  Column layout (see app.css "3.4 Mega Menu") mirrors the prototype and assumes
  the documented group order: Build & Develop · WooCommerce · Growth ·
  Performance & Security (Growth stacks under WooCommerce in column 2).
--}}

@php($groups = is_array($item->children) ? $item->children : [])

<ul class="submenu-list mega-menu-panel
    grid grid-rows-[0fr] lg:block!
    transition-[grid-template-rows] lg:transition-none duration-500 ease-in-out
    text-sm text-white"
    role="menu"
    aria-label="{{ $item->label }} submenu">
    <div class="overflow-hidden lg:overflow-visible">

        {{-- ===== Desktop grid panel ===== --}}
        <div class="mega-inner hidden lg:block">
            <div class="mega-grid">
                @foreach ($groups as $group)
                    <div class="mega-group">
                        <p class="mega-heading"><span class="bar"></span>{!! $group->label !!}</p>
                        @if (is_array($group->children) && count($group->children))
                            <ul class="mega-list">
                                @foreach ($group->children as $link)
                                    <li>
                                        <a href="{{ $link->url }}" class="mega-link" role="menuitem"
                                           @if ($link->target) target="{{ $link->target }}" @endif>
                                            <span class="ic"><x-mega-icon :classes="$link->classes ?? ''" /></span>
                                            <span class="txt">
                                                <span class="name">{!! $link->label !!}</span>
                                                @if (!empty($link->description))
                                                    <span class="desc">{!! $link->description !!}</span>
                                                @endif
                                            </span>
                                        </a>
                                    </li>
                                @endforeach
                            </ul>
                        @endif
                    </div>
                @endforeach

                {{-- Featured CTA card — hardcoded by design (a WP menu can't hold rich card copy). --}}
                <div class="mega-feature">
                    <p class="eyebrow">Not sure where to start?</p>
                    <h3>Built on the Roots Stack</h3>
                    <p>Tell us about your project and get a tailored quote for a Trellis / Bedrock setup — no commitment required.</p>
                    <div class="mega-cta-row">
                        <a href="{{ home_url('/contact/') }}" class="btn btn-primary">Get a Roots Stack Quote</a>
                        <a href="{{ home_url('/services/roots-stack-development/') }}" class="btn btn-ghost">View Pricing</a>
                    </div>
                </div>
            </div>
        </div>

        {{-- ===== Mobile accordion (reuses the standard nested menu) ===== --}}
        <div class="lg:hidden">
            @foreach ($groups as $group)
                <x-menu-item :item="$group" :level="1" />
            @endforeach
        </div>

    </div>
</ul>
