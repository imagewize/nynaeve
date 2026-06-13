@extends('layouts.app')

@section('content')
  @include('partials.page-header')

  {{-- Updated text-textbodygray to text-secondary --}}
  <div class="container mx-auto max-w-6xl my-16 font-open-sans text-secondary text-base leading-loose">
    @if (! have_posts())
      <x-alert type="warning">
        {!! __('Sorry, no results were found.', 'sage') !!}
      </x-alert>

      {!! get_search_form(false) !!}
    @endif

    @while(have_posts()) @php(the_post())
      @includeFirst(['partials.content-' . get_post_type(), 'partials.content'])
    @endwhile

    <div class="posts-navigation-wrap mx-5 md:mx-none lg:grid lg:grid-cols-12 lg:gap-4 mt-4">
      {!! get_the_posts_navigation() !!}
    </div>
  </div>
@endsection

{{-- 
  @section('sidebar')
  @include('sections.sidebar')
@endsection
--}}