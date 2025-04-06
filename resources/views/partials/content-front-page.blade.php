@php(the_content())

{{--
@if(have_rows('homepage_builder'))
    @while(have_rows('homepage_builder'))
        @php(the_row())

        @if(get_row_layout() == 'about_block')
            <section id="about" class="py-24 bg-bggray">
                <div class="container mx-auto max-w-5xl px-4">
                    <div class="flex flex-col md:flex-row gap-8">
                        <div class="md:w-1/4 w-full">
                            <div id="about-profile" class="rounded-full overflow-hidden w-24 h-24 border-8 border-bordergray mx-auto">
                                @php($image = get_sub_field('about_profile_picture'))
                                @if(!empty($image))
                                    <img src="{{ $image['url'] }}" alt="{{ $image['alt'] }}" class="w-full h-full object-cover">
                                @endif
                            </div>
                        </div>
                        <div class="md:w-3/4 w-full">
                            <h2 id="about-header" class="text-3xl font-open-sans font-semi-bold mb-6">{{ get_sub_field('about_title') }}</h2>
                            <p class="text-xl leading-relaxed font-light mb-6 text-textbodygray font-open-sans">{{ get_sub_field('about_lead') }}</p>
                            <div class="prose text-textbodygray text-base leading-loose font-open-sans">{!! get_sub_field('about_text') !!}</div>
                        </div>
                    </div>
                </div>
            </section>

        @elseif(get_row_layout() == 'services_intro')
            <section id="services" class="py-16 bg-gray-50">
                <div class="container mx-auto max-w-4xl px-4">
                    <div class="mb-12">
                        <h2 class="text-3xl font-bold text-center font-open-sans">{{ get_sub_field('services_title') }}</h2>
                        <p class="mx-auto  max-w-2xl text-xl leading-relaxed my-8 text-center text-textbodygray font-open-sans font-light container">
                          {{ get_sub_field('services_introduction_text_block') }}
                        </p>
                    </div>

        @elseif(get_row_layout() == 'services_blocks')
                <div class="grid md:grid-cols-2 gap-8">
                    @if(have_rows('services_boxes'))
                        @while(have_rows('services_boxes'))
                            @php(the_row())
                            <div class="service-block bg-white p-6 rounded-lg group hover:cursor-pointer">
                                <div class="grid grid-cols-[auto_1fr] gap-4 items-start">
                                    <span class="service-icon inline-flex p-2 text-3xl bg-blue-600 rounded-lg 
                                    group-hover:bg-red-500 transition-colors duration-200">  
                                       <x-dynamic-component :component="get_sub_field('text_box_icon')" class="text-white w-8 h-8" />
                                    </span>
                                    <h3 class="service-title text-lg text-blue-600 group-hover:text-gray-700 font-semibold relative inline-block">
                                        <span class="relative inline-block">
                                            {{ get_sub_field('text_box_title') }}
                                            <span class="absolute -bottom-2 left-0 w-1/4 h-[3px] bg-gray-300 
                                            group-hover:w-1/2 group-hover:bg-gray-700 transition-all duration-300"></span>
                                        </span>
                                    </h3>
                                    <div class="service-body prose text-textbodygray font-open-sans leading-loose col-start-2">
                                        {!! get_sub_field('text_box') !!}
                                    </div>
                                </div>
                            </div>
                        @endwhile
                    @endif
                </div>
            </section>

        @elseif(get_row_layout() == 'portfolio_slider')
            <section id="portfolio" class="py-16 bg-white overflow-x-hidden">
                <div class="container mx-auto max-w-5xl px-4">
                    <h2 class="text-3xl font-bold font-open-sans text-center mb-8">{{ get_sub_field('portfolio_slider_title') }}</h2>
                    @if(have_rows('portfolio_slides'))
                        <div class="portfolio-slider swiper-container relative">
                            <div class="swiper-wrapper">
                                @while(have_rows('portfolio_slides'))
                                    @php(the_row())
                                    @php($slideImage = get_sub_field('slide_image'))
                                    @php($slideUrl = get_sub_field('slide_url'))
                                    <div class="swiper-slide text-center p-4 hover:opacity-90 transition-opacity">
                                        @if($slideUrl)
                                            <a href="{{ $slideUrl }}" class="block cursor-pointer" {{ Str::startsWith($slideUrl, 'http') ? 'target="_blank" rel="noopener"' : '' }}>
                                        @endif
                                            <img src="{{ wp_get_attachment_image_url($slideImage['ID'], 'portfolio-slide') }}" 
                                                 srcset="{{ wp_get_attachment_image_srcset($slideImage['ID'], 'portfolio-slide') }}"
                                                 sizes="(max-width: 768px) 100vw, 800px"
                                                 alt="{{ $slideImage['alt'] }}" 
                                                 class="mx-auto mb-4 w-full h-auto object-cover rounded-lg"
                                                 loading="lazy"/>
                                            <h3 class="text-lg font-semibold">{{ get_sub_field('slide_title') }}</h3>
                                        @if($slideUrl)
                                            </a>
                                        @endif
                                    </div>
                                @endwhile
                            </div>
                            <!-- Add Pagination -->
                            <div class="portfolio-slider-pagination flex justify-center mt-6"></div>
                            <!-- Add Navigation -->
                            <div class="portfolio-slider-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer"></div>
                            <div class="portfolio-slider-next absolute right-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer"></div>
                        </div>
                    @endif
                </div>
            </section>

        @elseif(get_row_layout() == 'cta_banner')
            <section id="CTA" class="py-16 bg-ctablue text-white">
                <div class="container mx-auto max-w-2xl px-4 text-center">
                    <h2 class="text-3xl font-open-sans font-bold my-6">{{ get_sub_field('cta_title') }}</h2>
                    <p class="text-lg font-open-sans mb-8">{{ get_sub_field('cta_text') }}</p>
                    <a href="{{ get_sub_field('cta_button_url') }}" class="inline-flex items-center justify-center h-16 w-full max-w-80 px-8 py-3 
                    bg-ctabuttonblue hover:bg-ctabuttonbluehover text-white rounded-lg font-semibold">
                        {{ get_sub_field('cta_button_text') }}
                    </a>
                </div>
            </section>
        @elseif(get_row_layout() == 'review_block')
            <section id="reviews" class="bg-orange-500 py-24">
              <div class="container mx-auto max-w-xl">
                <h2 class="text-3xl font-open-sans font-bold text-white text-center mb-10">
                {{ get_sub_field('review_header') }}</h2>
              </div>
              <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
                @if(have_rows('review_boxes'))
                    @while(have_rows('review_boxes'))
                        @php(the_row())
                        <div class="text-center">
                            @php($profile_image = get_sub_field('text_box_profile_image'))
                            <img
                                src="{{ $profile_image['url'] ?? '' }}"
                                alt="{{ $profile_image['alt'] ?? 'Profile image' }}"
                                class="w-24 h-24 mx-auto rounded-full mb-4"
                            />
                            <p class="text-lg font-base font-open-sans">{{ get_sub_field('review_text_box') }}</p>
                        </div>
                    @endwhile
                @endif
              </div>
            </section>
        @endif
    @endwhile
@endif

@if($pagination)
    <nav class="page-nav mt-8" aria-label="Page">
        {!! $pagination !!}
    </nav>
@endif
--}}