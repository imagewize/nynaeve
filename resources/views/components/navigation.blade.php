@php($menu = Navi::build($name))  
@if ($menu->isNotEmpty())
<nav class="w-full z-30 top-0 py-1" role="navigation" aria-label="Main navigation">
    <div class="w-full container mx-auto max-w-5xl flex flex-wrap items-center justify-between mt-0 px-8 py-6">
      <!-- wrapper for logo and menu -->
      <div class="flex items-center">
        <!-- Toggle icon starts -->
        <label for="menu-toggle" class="cursor-pointer md:hidden block" aria-label="Toggle menu">
          <svg class="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
              <title>menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </label>
        <input class="peer hidden" type="checkbox" id="menu-toggle" aria-hidden="true" />
        <!-- Toggle icon ends -->
        <!-- Logo starts -->
        <div id="logo" class="md:mb-4" role="banner">
            <a class="brand flex items-center tracking-wide no-underline hover:no-underline font-bold text-white text-xl 
            uppercase ml-5 md:ml-0 mr-5" href="{{ home_url('/') }}">
            <img src="{{ Vite::asset('resources/images/logo/logo-imagewize-smaller.png') }}" alt="Imagewize Logo" class="h-8 w-auto mr-2 hidden md:block">
            {!! $siteName !!}
            </a>
        </div>
        <!-- Logo ends -->
        <!-- Menu starts -->
        <div id="menu" class="hidden peer-checked:block md:flex md:items-center 
        w-full md:w-auto absolute top-12 left-0 md:static bg-neutral-900 md:bg-none" role="menubar">
          <ul class="md:flex items-center text-sm py-4 md:pt-0">
            @foreach ($menu->all() as $item)
            <li class="group my-menu-item relative 
            {{ $item->classes ?? '' }} 
            {{ $item->active && !str_contains($item->url, '#') ? 'active 
            text-white md:after:absolute md:after:left-1/2 md:after:bottom-0 md:after:w-10 md:after:h-[3px] 
            md:after:-ml-[21px] md:after:bg-neutral-600 md:after:content-[""] md:after:block 
            md:after:transition-all md:after:duration-300 md:after:ease-in-out' : '' }} 
            flex md:block py-2 px-4 no-underline font-open-sans text-textbodygray hover:text-white" 
            role="none">
                <a href="{{ str_contains($item->url, '#') && !Str::startsWith($item->url, home_url()) ? esc_url(home_url('/')) . ltrim($item->url, '/') : $item->url }}" 
                   role="menuitem" 
                   @if ($item->children) 
                     aria-expanded="false"
                     aria-haspopup="true"
                   @endif
                   @if (str_contains($item->url, '#'))
                     data-home-anchor="true"
                   @endif
                   class="inline-block no-underline" >
                  {{ $item->label }}
                  {{-- 
                  @if ($item->children)
                    <svg class="ml-1 inline-block w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  @endif
                  --}}
                </a>
                @if ($item->children)
                  <!-- Child menu items start -->
                  <ul class="hidden md:group-hover:block md:absolute md:top-full md:left-0 md:min-w-[200px] 
                  md:bg-neutral-900 md:shadow-lg md:z-50 text-sm text-textbodygray"
                      role="menu" 
                      aria-label="{{ $item->label }} submenu">
                    @foreach ($item->children as $child)
                      <li class="my-child-item {{ $child->classes ?? '' }} {{ $child->active ? 'active text-white' : '' }} block no-underline 
                       py-2 px-4 hover:text-white" role="none">
                        <a href="{{ $child->url }}" role="menuitem" class="no-underline">
                          {{ $child->label }}
                        </a>
                      </li>
                    @endforeach
                  </ul>
                  <!-- Child menu items end -->
                @endif
              </li>
            @endforeach
          </ul>
        </div> <!-- Menu ends -->
      </div>
      
      <div class="flex items-center" id="nav-content">
         <!-- facebook icon -->
        <a class="inline-block no-underline " href="https://www.facebook.com/imagewize/" aria-label="Facebook Account">
        <x-css-facebook class="fill-current text-white hover:text-textbodygray w-6 h-6 ml-3" />
        </a>
        <!-- github icons -->
        <a class="pl-3 inline-block no-underline" href="https://github.com/imagewize/" aria-label="Github">
          <x-fab-github class="text-white hover:text-textbodygray" />
        </a>
      </div>
    </div> <!-- navigation container end -->
@endif