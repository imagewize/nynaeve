<div class="container mx-auto max-w-6xl">
  <article @php(post_class('lg:grid lg:grid-cols-12 lg:gap-4 mb-12 mx-5 md:mx-none'))>
    
    <div class="col-span-2 flex justify-center items-start pt-2">
      <div class="hidden lg:flex rounded-full overflow-hidden w-24 h-24 border-8 border-bordergray">
        {!! get_avatar(get_the_author_meta('ID'), 96, '', '', ['class' => 'w-full h-full object-cover']) !!}
      </div>
    </div>

    <div class="col-span-4 entry-title-and-meta">
      <header>
        <h2 class="entry-title text-2xl font-open-sans font-bold text-black">
          <a href="{{ get_permalink() }}">
            {!! $title !!}
          </a>
        </h2>
        @include('partials.entry-meta')
      </header>
    </div>

    <div class="col-span-4 entry-summary font-open-sans text-base leading-loose text-textbodygray">
      @php(the_excerpt())
    </div>

    <div class="col-span-2 hidden lg:flex items-start justify-center pt-2">
      <a href="{{ get_permalink() }}" class="inline-block px-4 py-2 text-gray-800 font-open-sans font-bold text-xl 
      uppercase tracking-wide border-b-4 border-gray-400">
        Read More
      </a>
    </div>
  </article>
</div>
