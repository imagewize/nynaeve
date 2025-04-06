@extends('layouts.app')

@section('content')
  @include('partials.page-header')

  <div class="container mx-auto max-w-6xl my-16 font-open-sans text-textbodygray text-base leading-loose">
    @if (! have_posts())
      <x-alert type="warning">
        {!! __('Sorry, no results were found.', 'sage') !!}
      </x-alert>

      {!! get_search_form(false) !!}
    @endif

    @while(have_posts()) @php(the_post())
      @includeFirst(['partials.content-' . get_post_type(), 'partials.content'])
    @endwhile

    {!! get_the_posts_navigation() !!}
  </div>
@endsection

{{-- 
  @section('sidebar')
  @include('sections.sidebar')
@endsection
--}}