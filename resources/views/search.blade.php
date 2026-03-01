@extends('layouts.app')

@section('content')
  @include('partials.page-header')

  <div class="search-results-page">
    <div class="container mx-auto max-w-4xl px-6 py-12">

      @if (! have_posts())
        <x-alert type="warning">
          {!! __('Sorry, no results were found.', 'sage') !!}
        </x-alert>
        {!! get_search_form(false) !!}
      @else
        <div class="search-results-list">
          @while(have_posts()) @php(the_post())
            @include('partials.content-search')
          @endwhile
        </div>
        {!! get_the_posts_navigation() !!}
      @endif

    </div>
  </div>
@endsection
