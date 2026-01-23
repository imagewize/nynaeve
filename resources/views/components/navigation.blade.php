@php($menu = Navi::build($name))  
@if ($menu->isNotEmpty())
<nav class="w-full z-30 top-0 py-1" role="navigation" aria-label="Main navigation">
    <div class="w-full container mx-auto max-w-5xl flex flex-wrap items-center justify-between mt-0 px-8 py-6">
      <!-- wrapper for logo and menu -->
      <div class="flex items-center">
        <!-- Toggle icon starts -->
        <label for="menu-toggle" class="cursor-pointer lg:hidden block" aria-label="Toggle menu">
          <svg class="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
              <title>menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </label>
        <input class="peer hidden" type="checkbox" id="menu-toggle" aria-hidden="true" />
        <!-- Toggle icon ends -->
        <!-- Logo starts -->
        <div id="logo" class="lg:mb-5" role="banner">
            <a class="brand flex items-center tracking-wide no-underline hover:no-underline font-bold text-white text-xl
            uppercase ml-5 lg:ml-0 mr-5" href="{{ home_url('/') }}">
            {!! $siteName !!}
            </a>
        </div>
        <!-- Logo ends -->
        <!-- Menu starts -->
        <div id="menu" class="hidden peer-checked:block lg:flex lg:items-center
        w-full lg:w-auto absolute top-16 left-0 lg:static bg-neutral-900 lg:bg-none" role="menubar">
          <ul class="lg:flex lg:items-center text-sm py-4 lg:pt-0">
            @foreach ($menu->all() as $item)
            <li class="group my-menu-item relative
            {{ $item->classes ?? '' }}
            {{ $item->active && !str_contains($item->url, '#') ? 'active
            text-white lg:before:absolute lg:before:left-1/2 lg:before:bottom-0 lg:before:w-10 lg:before:h-[3px]
            lg:before:-ml-[21px] lg:before:bg-neutral-600 lg:before:content-[""] lg:before:block
            lg:before:transition-all lg:before:duration-300 lg:before:ease-in-out lg:before:z-[48]' : '' }}
            lg:block py-2 px-4 no-underline font-open-sans text-white"
            role="none">
                @if ($item->children)
                  <!-- Hidden checkbox for mobile accordion -->
                  <input type="checkbox" id="submenu-toggle-{{ $loop->index }}" class="submenu-toggle-checkbox hidden" aria-hidden="true" />
                @endif

                <!-- Wrapper for parent link and toggle button -->
                <div class="flex items-center gap-1 whitespace-nowrap">
                  <a href="{{ str_contains($item->url, '#') && !Str::startsWith($item->url, home_url()) ? esc_url(home_url('/')) . ltrim($item->url, '/') : $item->url }}"
                     role="menuitem"
                     @if ($item->children)
                       aria-haspopup="true"
                     @endif
                     @if (str_contains($item->url, '#'))
                       data-home-anchor="true"
                     @endif
                     class="inline-block no-underline uppercase whitespace-nowrap" >
                    {{ $item->label }}
                  </a>

                  @if ($item->children)
                    <!-- Chevron indicator for parent menu items -->
                    <label for="submenu-toggle-{{ $loop->index }}"
                           class="submenu-chevron cursor-pointer p-1 lg:pointer-events-none"
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

                @if ($item->children)
                  <!-- Child menu items start -->
                  <ul class="submenu-list grid grid-rows-[0fr]
                  transition-[grid-template-rows] duration-500 ease-in-out
                  text-sm text-white
                  lg:absolute lg:top-full lg:left-0 lg:min-w-[200px]
                  lg:bg-neutral-900 lg:shadow-lg lg:z-50 lg:mt-2"
                      role="menu"
                      aria-label="{{ $item->label }} submenu">
                    <div class="overflow-hidden">
                      @foreach ($item->children as $child)
                        <li class="my-child-item {{ $child->classes ?? '' }} {{ $child->active ? 'active text-white' : '' }} block no-underline
                         py-2 px-4 lg:px-4 hover:text-white" role="none">
                          <a href="{{ str_contains($child->url, '#') && !Str::startsWith($child->url, home_url()) ? esc_url(home_url('/')) . ltrim($child->url, '/') : $child->url }}"
                             role="menuitem"
                             @if (str_contains($child->url, '#'))
                               data-home-anchor="true"
                             @endif
                             class="no-underline uppercase">
                            {{ $child->label }}
                          </a>
                        </li>
                      @endforeach
                    </div>
                  </ul>
                  <!-- Child menu items end -->
                @endif
              </li>
            @endforeach
          </ul>
        </div> <!-- Menu ends -->
      </div>
      
      <div class="flex items-center lg:mb-5" id="nav-content">
         <!-- facebook icon -->
        <a class="inline-block no-underline " href="https://www.facebook.com/imagewize/" aria-label="Facebook Account">
        <x-css-facebook class="fill-current text-white hover:text-secondary w-6 h-6 ml-3" />
        </a>
        <!-- github icons -->
        <a class="pl-3 inline-block no-underline" href="https://github.com/imagewize/" aria-label="Github">
          <x-fab-github class="text-white hover:text-secondary w-5 h-5" />
        </a>
      </div>
    </div> <!-- navigation container end -->
@endif