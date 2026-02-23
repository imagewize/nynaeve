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
        <!-- github icons -->
        <a class="pl-3 inline-block no-underline" href="https://github.com/imagewize/" aria-label="Github">
          <x-fab-github class="text-white hover:text-secondary w-5 h-5" />
        </a>
      </div>
    </div> <!-- navigation container end -->
@endif