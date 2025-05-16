<div {{ $attributes->merge(['class' => 'wp-block-acf-hero align' . ($align ?? 'full')]) }}
     @if(!empty($block->backgroundColor)) 
       style="background-color: var(--wp--preset--color--{{$block->backgroundColor}});"
     @endif>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24 hero-container">
        {{-- Text Content Column --}}
        <div class="hero-text-column">
            @if (!empty($heading_text))
                <h1 class="hero-heading font-montserrat font-thin @if(!empty($block->textColor)) text-{{$block->textColor}} @else text-black @endif" 
                   @if(!empty($block->textColor))
                     style="color: var(--wp--preset--color--{{$block->textColor}});"
                   @else
                     style="color: #000000;"
                   @endif>
                    {{ $heading_text }}
                </h1>
            @endif

            @if (!empty($sub_heading_text))
                <h2 class="hero-subheading font-montserrat font-thin @if(!empty($block->textColor)) text-{{$block->textColor}} @else text-black @endif"
                   @if(!empty($block->textColor))
                     style="color: var(--wp--preset--color--{{$block->textColor}});"
                   @else
                     style="color: #000000;"
                   @endif>
                    {{ $sub_heading_text }}
                </h2>
            @endif
        </div>

        {{-- Image Content Column --}}
        <div class="hero-image-column">
            {{-- Desktop Image: Visible only on lg screens --}}
            <div class="editor-desktop-image">
                @if (!empty($desktop_image_url))
                    <img src="{{ $desktop_image_url }}" 
                         alt="{{ $desktop_image_alt }}" 
                         class="object-cover w-full h-full">
                @elseif($is_preview)
                    <div class="h-full w-full bg-gray-200 flex items-center justify-center rounded-lg text-gray-500">
                        Desktop Image Placeholder (16:9)
                    </div>
                @endif
            </div>

            {{-- Mobile/Tablet Image: Visible on screens smaller than lg --}}
            <div class="editor-mobile-image">
                @if (!empty($mobile_image_url))
                    <img src="{{ $mobile_image_url }}" 
                         alt="{{ $mobile_image_alt }}" 
                         class="object-cover">
                @elseif($is_preview)
                    <div class="h-full w-full bg-gray-200 flex items-center justify-center rounded-lg text-gray-500">
                        Mobile/Tablet Image (200×200)
                    </div>
                @endif
            </div>
        </div>
    </div>

    {{-- Editor-only styles removed since they're handled in hero-block-editor.css --}}
    @if(is_admin())
    <style>
        /* Additional editor-specific styles could go here if needed */
    </style>
    @endif
</div>
