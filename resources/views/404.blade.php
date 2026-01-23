@extends('layouts.app')

@section('content')
  <div class="min-h-screen bg-linear-to-b from-tertiary to-base">
    <div class="container mx-auto max-w-4xl px-4 pt-4 pb-8 text-center">

      {{-- 404 Illustration - Confused Robot --}}
      <div class="mb-8">
        <svg class="mx-auto h-64 w-64 text-primary opacity-80" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {{-- Robot Head --}}
          <rect x="50" y="50" width="100" height="90" rx="8" stroke="currentColor" stroke-width="3" fill="none"/>

          {{-- Antenna --}}
          <line x1="100" y1="50" x2="100" y2="30" stroke="currentColor" stroke-width="3"/>
          <circle cx="100" cy="30" r="5" fill="currentColor"/>

          {{-- Eyes (X marks - confused/error state) --}}
          <g opacity="0.9">
            <path d="M70 75 L85 90 M85 75 L70 90" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
            <path d="M115 75 L130 90 M130 75 L115 90" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
          </g>

          {{-- Sad/Confused mouth --}}
          <path d="M70 110 Q100 100, 130 110" stroke="currentColor" stroke-width="3" stroke-linecap="round" fill="none"/>

          {{-- Question marks floating around robot --}}
          <g opacity="0.4">
            <text x="30" y="80" font-size="24" fill="currentColor" font-weight="bold">?</text>
            <text x="155" y="70" font-size="20" fill="currentColor" font-weight="bold">?</text>
            <text x="165" y="120" font-size="18" fill="currentColor" font-weight="bold">?</text>
          </g>

          {{-- Robot Body --}}
          <rect x="60" y="145" width="80" height="40" rx="4" stroke="currentColor" stroke-width="3" fill="none"/>

          {{-- Control panel dots --}}
          <circle cx="85" cy="165" r="3" fill="currentColor" opacity="0.6"/>
          <circle cx="100" cy="165" r="3" fill="currentColor" opacity="0.6"/>
          <circle cx="115" cy="165" r="3" fill="currentColor" opacity="0.6"/>

          {{-- Arms --}}
          <path d="M60 150 L40 160 L35 155" stroke="currentColor" stroke-width="3" stroke-linecap="round" fill="none"/>
          <path d="M140 150 L160 160 L165 155" stroke="currentColor" stroke-width="3" stroke-linecap="round" fill="none"/>
        </svg>
      </div>

      {{-- Heading --}}
      <h1 class="text-6xl font-bold mb-4" style="color: var(--wp--preset--color--primary);">
        404
      </h1>

      {{-- Friendly message --}}
      <p class="text-2xl text-main-accent mb-2">
        Oops! This page seems to have wandered off...
      </p>

      <p class="text-lg text-secondary mb-12 max-w-2xl mx-auto">
        The page you're looking for doesn't exist or may have been moved.
        Let's get you back on track!
      </p>

      {{-- Search bar --}}
      <div class="mb-12 max-w-xl mx-auto">
        <form role="search" method="get" action="{{ home_url('/') }}" class="flex flex-col sm:flex-row gap-3">
          <label class="sr-only">
            {{ _x('Search for:', 'label', 'sage') }}
          </label>

          <input
            type="search"
            placeholder="{!! esc_attr_x('Search our site...', 'placeholder', 'sage') !!}"
            value="{{ get_search_query() }}"
            name="s"
            class="flex-1 px-6 py-4 text-lg border-2 border-border-dark rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all"
          >

          <button
            type="submit"
            class="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg transition-colors font-semibold whitespace-nowrap"
          >
            {{ _x('Search', 'submit button', 'sage') }}
          </button>
        </form>
      </div>

      {{-- Quick navigation links --}}
      <div class="border-t border-border-light pt-12">
        <h2 class="text-xl font-semibold text-main mb-6">
          Or try one of these pages:
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <a
            href="{{ home_url('/') }}"
            class="group block p-6 bg-white border-2 border-border-light rounded-lg hover:border-primary hover:shadow-lg transition-all"
          >
            <svg class="mx-auto h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            <span class="font-semibold text-main group-hover:text-primary transition-colors">Home</span>
            <p class="text-sm text-secondary mt-2">Start from the beginning</p>
          </a>

          <a
            href="{{ home_url('/#our-services') }}"
            class="group block p-6 bg-white border-2 border-border-light rounded-lg hover:border-primary hover:shadow-lg transition-all"
          >
            <svg class="mx-auto h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <span class="font-semibold text-main group-hover:text-primary transition-colors">Services</span>
            <p class="text-sm text-secondary mt-2">What we can do for you</p>
          </a>

          <a
            href="{{ home_url('/contact-us/') }}"
            class="group block p-6 bg-white border-2 border-border-light rounded-lg hover:border-primary hover:shadow-lg transition-all"
          >
            <svg class="mx-auto h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <span class="font-semibold text-main group-hover:text-primary transition-colors">Contact Us</span>
            <p class="text-sm text-secondary mt-2">Get in touch with us</p>
          </a>
        </div>
      </div>

    </div>
  </div>
@endsection
