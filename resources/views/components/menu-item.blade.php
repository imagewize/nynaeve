@props(['item', 'level' => 0])

@php
    $hasChildren = is_array($item->children) && count($item->children) > 0;
    $isTopLevel = $level === 0;
    $isSecondLevel = $level === 1;
    $children = $hasChildren ? $item->children : [];
@endphp

<li class="group my-menu-item relative
    {{ $item->classes ?? '' }}
    {{ $item->active && !str_contains($item->url, '#') ? 'active
    text-white lg:before:absolute lg:before:left-1/2 lg:before:bottom-0 lg:before:w-10 lg:before:h-0.75
    lg:before:-ml-5.25 lg:before:bg-neutral-600 lg:before:content-[""] lg:before:block
    lg:before:transition-all lg:before:duration-300 lg:before:ease-in-out lg:before:z-48' : '' }}
    lg:block py-2 px-4 no-underline font-open-sans"
    role="none">
    
    @if ($hasChildren)
        <!-- Hidden checkbox for mobile accordion -->
        <input type="checkbox" id="submenu-toggle-{{ $item->id }}-{{ $level }}" class="submenu-toggle-checkbox hidden" aria-hidden="true" />
    @endif

    <!-- Wrapper for parent link and toggle button -->
    <div class="flex items-center gap-1 whitespace-nowrap">
        <a href="{{ str_contains($item->url, '#') && !Str::startsWith($item->url, home_url()) ? esc_url(home_url('/')) . ltrim($item->url, '/') : $item->url }}"
           role="menuitem"
           @if ($hasChildren)
             aria-haspopup="true"
             aria-expanded="false"
           @endif
           @if (str_contains($item->url, '#'))
             data-home-anchor="true"
           @endif
           class="inline-block no-underline uppercase whitespace-nowrap
           {{ $level === 0 ? 'text-white hover:text-white' : 'text-secondary' }}
           {{ $level === 1 ? 'hover:text-primary' : '' }}
           {{ $level === 2 ? 'hover:text-primary-dark' : '' }}
           {{ $level >= 3 ? 'hover:text-main' : '' }}">
            {{ $item->label }}
        </a>

        @if ($hasChildren)
            <!-- Chevron indicator for parent menu items -->
            <label for="submenu-toggle-{{ $item->id }}-{{ $level }}"
                   class="submenu-chevron cursor-pointer p-1 lg:pointer-events-none"
                   data-level="{{ $level }}"
                   aria-label="Toggle {{ $item->label }} submenu">
                <svg class="w-4 h-4 fill-current text-white transition-transform duration-500 ease-in-out"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 20 20"
                     aria-hidden="true">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                </svg>
            </label>
        @endif
    </div>

    @if ($hasChildren)
        <!-- Child menu items start -->
        <ul class="submenu-list
        grid grid-rows-[0fr] lg:block!
        transition-[grid-template-rows] lg:transition-none duration-500 ease-in-out
        text-sm text-white
        lg:absolute lg:min-w-50 lg:bg-neutral-900 lg:shadow-lg"
            role="menu"
            aria-label="{{ $item->label }} submenu">
            <div class="overflow-hidden lg:overflow-visible">
                @foreach ($children as $child)
                    <x-menu-item :item="$child" :level="$level + 1" />
                @endforeach
            </div>
        </ul>
        <!-- Child menu items end -->
    @endif
</li>