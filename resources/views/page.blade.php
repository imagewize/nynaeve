@extends('layouts.app')

@section('content')
  @while(have_posts()) @php(the_post())
    @include('partials.page-header')
    {{-- No container wrapper - WordPress blocks handle their own layout via is-layout-constrained --}}
    @includeFirst(['partials.content-page', 'partials.content'])
  @endwhile
@endsection
