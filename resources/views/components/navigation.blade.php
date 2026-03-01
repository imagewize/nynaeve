@php($menu = Navi::build($name))  
@if ($menu->isNotEmpty())
<nav class="w-full z-30 top-0 py-1" role="navigation" aria-label="Main navigation">
    <div class="w-full container mx-auto max-w-6xl flex flex-wrap items-center justify-between mt-0 px-8 py-6">
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
        <div id="logo" class="lg:mb-3" role="banner">
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
              <x-menu-item :item="$item" :level="0" />
            @endforeach
          </ul>
        </div> <!-- Menu ends -->
      </div>
      
      <div class="hidden xl:flex items-center lg:mb-5" id="nav-content">
         <!-- mastodon icon -->
        <a class="inline-block no-underline " href="https://mastodon.social/@jfrumau" aria-label="Mastodon" rel="me">
        <x-fab-mastodon class="fill-current text-white hover:text-secondary w-6 h-6 ml-3" />
        </a>
        <!-- github icon -->
        <a class="pl-3 inline-block no-underline" href="https://github.com/imagewize/" aria-label="Github">
          <x-fab-github class="text-white hover:text-secondary w-5 h-5" />
        </a>
        <!-- search icon -->
        <button id="search-toggle" aria-label="Open search" class="pl-3 inline-flex items-center text-white hover:text-secondary focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
          </svg>
        </button>
      </div>

      <!-- mobile search icon -->
      <button id="search-toggle-mobile" aria-label="Open search" class="xl:hidden ml-auto mr-4 text-white hover:text-secondary focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
        </svg>
      </button>

    </div> <!-- navigation container end -->

    <!-- Search Overlay -->
    <div id="search-overlay" role="dialog" aria-modal="true" aria-label="Search" class="search-overlay">
      <div class="search-overlay-inner">
        <button id="search-close" aria-label="Close search" class="search-overlay-close">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <form role="search" method="get" action="{{ home_url('/') }}" class="search-overlay-form">
          <label for="overlay-search-input" class="sr-only">Search</label>
          <input
            type="search"
            id="overlay-search-input"
            name="s"
            placeholder="Search…"
            value="{{ get_search_query() }}"
            autocomplete="off"
            class="search-overlay-input"
          />
          <button type="submit" class="search-overlay-submit" aria-label="Submit search">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
            </svg>
          </button>
        </form>
        <p class="search-overlay-hint">Press Enter to search &mdash; Esc to close</p>
      </div>
    </div>

</nav>
@endif