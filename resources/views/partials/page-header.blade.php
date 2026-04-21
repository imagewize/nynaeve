<div class="page-header bg-neutral-900 py-8">
  <div class="container mx-auto max-w-5xl text-center">
    <h1 class="text-white uppercase font-bold text-3xl mt-6 pb-2 inline-block">
      {!! $title !!}
      <div class="border-b-4 border-blue-600 w-[30%] mx-auto mt-2"></div>
    </h1>
    @if($description)
      <div class="mt-4 max-w-2xl mx-auto font-open-sans text-[#e6f4fb] text-base leading-relaxed">
        {!! $description !!}
      </div>
    @endif
  </div>
</div>
