<?php

namespace App\Blocks;

use Log1x\AcfComposer\Block;
use Log1x\AcfComposer\Builder;
use Roots\Acorn\Assets\Asset;

class HeroBlock extends Block
{
    /**
     * The block name.
     *
     * @var string
     */
    public $name = 'Hero';

    /**
     * The block view.
     *
     * @var string
     */
    public $view = 'blocks.hero-block';

    /**
     * The block description.
     *
     * @var string
     */
    public $description = 'A split-pane hero section with text on one side and images on the other, responsive for all devices.';

    /**
     * The block category.
     *
     * @var string
     */
    public $category = 'layout';

    /**
     * The block icon.
     *
     * @var string|array
     */
    public $icon = 'table-col-after';

    /**
     * The block keywords.
     *
     * @var array
     */
    public $keywords = ['hero', 'split', 'pane', 'image', 'text', 'banner'];

    /**
     * The block post type allow list.
     *
     * @var array
     */
    public $post_types = ['post', 'page'];

    /**
     * The parent block type allow list.
     *
     * @var array
     */
    public $parent = [];

    /**
     * The ancestor block type allow list.
     *
     * @var array
     */
    public $ancestor = [];

    /**
     * The default block mode.
     *
     * @var string
     */
    public $mode = 'preview';

    /**
     * The default block alignment.
     *
     * @var string
     */
    public $align = 'full';

    /**
     * The default block text alignment.
     *
     * @var string
     */
    public $align_text = '';

    /**
     * The default block content alignment.
     *
     * @var string
     */
    public $align_content = '';

    /**
     * The supported block features.
     *
     * @var array
     */
    public $supports = [
        'align' => ['wide', 'full'],
        'html' => false,
        'anchor' => true,
        'mode' => true, // Allows user to switch between edit/preview
        'multiple' => true,
        'jsx' => false, // This is a PHP ACF block
        'color' => [
            'background' => true,
            'text' => true,
            'gradients' => true,
        ],
        'spacing' => [
            'margin' => true,
            'padding' => true, // Enables padding controls in the editor
        ],
        'typography' => [
            'fontSize' => true,
            'lineHeight' => true,
            'fontWeight' => true,
        ],
    ];

    /**
     * The block styles.
     *
     * @var array
     */
    public $styles = [
        // You can define block styles here if needed, e.g.,
        // ['name' => 'default', 'label' => 'Default', 'isDefault' => true],
        // ['name' => 'dark-text', 'label' => 'Dark Text'],
    ];

    /**
     * The block preview example data.
     * Used by ACF to generate a preview in the editor.
     *
     * @var array
     */
    public $example = [
        // Attributes for the block preview wrapper.
        // Field values for preview are handled in with() or by ACF field defaults.
    ];

    /**
     * The block template.
     * For this block, content is managed by ACF fields, not InnerBlocks directly.
     *
     * @var array
     */
    public $template = []; // No InnerBlocks defined for the main structure

    /**
     * Data to be passed to the block before rendering.
     */
    public function with(): array
    {
        $desktop_image = get_field('desktop_image');
        $mobile_image = get_field('mobile_image');

        $heading_text_value = get_field('heading_text');
        $sub_heading_text_value = get_field('sub_heading_text');
        $font_weight_value = get_field('heading_font_weight') ?: '100';

        $is_preview_mode = $this->preview || (isset($this->block->context['isPreview']) && $this->block->context['isPreview']);

        // Default texts from original JS block for preview or if empty
        if (empty($heading_text_value) && $is_preview_mode) {
            $heading_text_value = 'Imagewize';
        }
        if (empty($sub_heading_text_value) && $is_preview_mode) {
            $sub_heading_text_value = 'Website & Ecommerce Solutions for SME';
        }
        
        $desktop_image_url_value = $desktop_image['url'] ?? null;
        $desktop_image_alt_value = $desktop_image['alt'] ?? ($desktop_image['title'] ?? 'Desktop image');
        $mobile_image_url_value = $mobile_image['url'] ?? null;
        $mobile_image_alt_value = $mobile_image['alt'] ?? ($mobile_image['title'] ?? 'Mobile image');

        if ($is_preview_mode) {
            if (!$desktop_image_url_value) {
                // Create desktop placeholder SVG
                $desktop_svg = '<svg width="1280" height="720" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" preserveAspectRatio="none"><rect width="1280" height="720" fill="#e0e0e0"/><path d="M1280 720L0 0" stroke="#969696" stroke-width="2" vector-effect="non-scaling-stroke" fill="none"/><text x="640" y="360" text-anchor="middle" fill="#969696" font-family="system-ui, -apple-system, sans-serif" font-size="32">Desktop Image (16:9)</text></svg>';
                // Base64 encode instead of using urlencode
                $desktop_image_url_value = 'data:image/svg+xml;base64,' . base64_encode($desktop_svg);
                $desktop_image_alt_value = 'Placeholder for desktop image';
            }
            if (!$mobile_image_url_value) {
                // Create mobile placeholder SVG
                $mobile_svg = '<svg width="800" height="800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" preserveAspectRatio="none"><rect width="800" height="800" fill="#e0e0e0"/><path d="M800 800L0 0" stroke="#969696" stroke-width="2" vector-effect="non-scaling-stroke" fill="none"/><text x="400" y="400" text-anchor="middle" fill="#969696" font-family="system-ui, -apple-system, sans-serif" font-size="32">Mobile Image (1:1)</text></svg>';
                // Base64 encode instead of using urlencode
                $mobile_image_url_value = 'data:image/svg+xml;base64,' . base64_encode($mobile_svg);
                $mobile_image_alt_value = 'Placeholder for mobile/tablet image';
            }
        }

        return [
            'heading_text' => $heading_text_value,
            'sub_heading_text' => $sub_heading_text_value,
            'desktop_image_url' => $desktop_image_url_value,
            'desktop_image_alt' => $desktop_image_alt_value,
            'mobile_image_url' => $mobile_image_url_value,
            'mobile_image_alt' => $mobile_image_alt_value,
            'font_weight' => $font_weight_value,
            'is_preview' => $is_preview_mode,
        ];
    }

    /**
     * The block field group.
     */
    public function fields(): array
    {
        $heroFields = Builder::make('hero_split_pane_fields', [
            'title' => 'Hero Content & Settings',
            'style' => 'default', // 'default' or 'seamless'
            'position' => 'normal', // 'normal', 'side', 'acf_after_title'
            'label_placement' => 'top', // 'top' or 'left'
        ]);

        $heroFields
            ->addTab('text_content', ['label' => 'Text Content', 'placement' => 'left'])
                ->addText('heading_text', [
                    'label' => 'Main Heading',
                    'instructions' => 'Enter the main headline for the hero section.',
                    'default_value' => 'Imagewize',
                ])
                ->addTextarea('sub_heading_text', [
                    'label' => 'Sub Heading',
                    'instructions' => 'Enter the sub-headline or descriptive text.',
                    'default_value' => 'Website & Ecommerce Solutions for SME',
                    'rows' => 3,
                ])
                ->addSelect('heading_font_weight', [
                    'label' => 'Heading Font Weight',
                    'instructions' => 'Select the weight of the heading font.',
                    'choices' => [
                        '100' => 'Thin (100)',
                        '200' => 'Extra Light (200)',
                        '300' => 'Light (300)',
                        '400' => 'Regular (400)',
                        '500' => 'Medium (500)',
                        '600' => 'Semi-Bold (600)',
                        '700' => 'Bold (700)',
                        '800' => 'Extra Bold (800)',
                        '900' => 'Black (900)',
                    ],
                    'default_value' => '100',
                    'allow_null' => 0,
                    'multiple' => 0,
                    'ui' => 1,
                    'return_format' => 'value',
                ])
            ->addTab('image_uploads', ['label' => 'Image Uploads', 'placement' => 'left'])
                ->addImage('desktop_image', [
                    'label' => 'Desktop Image',
                    'instructions' => 'Upload image for desktop screens. Recommended aspect ratio: 16/9.',
                    'return_format' => 'array',
                    'preview_size' => 'medium', // WordPress image size for preview in admin
                    'library' => 'all', // 'all' or 'uploadedTo'
                    'mime_types' => 'jpg,jpeg,png,gif,svg,webp', // Allowed mime types
                ])
                ->addImage('mobile_image', [
                    'label' => 'Mobile/Tablet Image',
                    'instructions' => 'Upload image for mobile and tablet screens. Recommended aspect ratio: 1/1 or 4/3.',
                    'return_format' => 'array',
                    'preview_size' => 'medium',
                    'library' => 'all',
                    'mime_types' => 'jpg,jpeg,png,gif,svg,webp',
                ]);

        return $heroFields->build();
    }

    /**
     * Assets enqueued when rendering the block.
     *
     * @param  array $block The block data.
     * @return void
     */
    public function assets(array $block): void
    {
        // Add editor-specific styles for the block
        if (is_admin()) {
            wp_enqueue_style(
                'hero-block-editor-css', 
                get_template_directory_uri() . '/resources/css/blocks/hero-block-editor.css',
                [], 
                null
            );
        }
        
        // Add frontend styles for the block
        wp_enqueue_style(
            'hero-block-style-css', 
            get_template_directory_uri() . '/resources/css/blocks/hero-block-style.css',
            [], 
            null
        );
    }
}
