<?php

/**
 * Theme setup.
 */

namespace App;

use Illuminate\Support\Facades\Vite;

/**
 * Inject styles into the block editor.
 *
 * @return array
 */
add_filter('block_editor_settings_all', function ($settings) {
    $style = Vite::asset('resources/css/editor.css');

    $settings['styles'][] = [
        'css' => "@import url('{$style}')",
    ];

    return $settings;
});

/**
 * Inject scripts into the block editor.
 *
 * @return void
 */
add_filter('admin_head', function () {
    if (! get_current_screen()?->is_block_editor()) {
        return;
    }

    $dependencies = json_decode(Vite::content('editor.deps.json'));

    foreach ($dependencies as $dependency) {
        if (! wp_script_is($dependency)) {
            wp_enqueue_script($dependency);
        }
    }

    echo Vite::withEntryPoints([
        'resources/js/editor.js',
    ])->toHtml();
});

/**
 * Use the generated theme.json file.
 *
 * @return string
 */
add_filter('theme_file_path', function ($path, $file) {
    return $file === 'theme.json'
        ? public_path('build/assets/theme.json')
        : $path;
}, 10, 2);

/**
 * Register the initial theme setup.
 *
 * @return void
 */
add_action('after_setup_theme', function () {
    /**
     * Disable full-site editing support.
     *
     * @link https://wptavern.com/gutenberg-10-5-embeds-pdfs-adds-verse-block-color-options-and-introduces-new-patterns
     */
    remove_theme_support('block-templates');

    /**
     * Register the navigation menus.
     *
     * @link https://developer.wordpress.org/reference/functions/register_nav_menus/
     */
    register_nav_menus([
        'primary_navigation' => __('Primary Navigation', 'sage'),
    ]);

    /**
     * Disable the default block patterns.
     *
     * @link https://developer.wordpress.org/block-editor/developers/themes/theme-support/#disabling-the-default-block-patterns
     */
    remove_theme_support('core-block-patterns');

    /**
     * Enable plugins to manage the document title.
     *
     * @link https://developer.wordpress.org/reference/functions/add_theme_support/#title-tag
     */
    add_theme_support('title-tag');

    /**
     * Enable post thumbnail support.
     *
     * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
     */
    add_theme_support('post-thumbnails');

    /**
     * Enable responsive embed support.
     *
     * @link https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-support/#responsive-embedded-content
     */
    add_theme_support('responsive-embeds');

    /**
     * Enable HTML5 markup support.
     *
     * @link https://developer.wordpress.org/reference/functions/add_theme_support/#html5
     */
    add_theme_support('html5', [
        'caption',
        'comment-form',
        'comment-list',
        'gallery',
        'search-form',
        'script',
        'style',
    ]);

    /**
     * Enable selective refresh for widgets in customizer.
     *
     * @link https://developer.wordpress.org/reference/functions/add_theme_support/#customize-selective-refresh-widgets
     */
    add_theme_support('customize-selective-refresh-widgets');

    /**
     * Add WooCommerce theme support.
     */
    if (class_exists('WooCommerce')) {
        add_theme_support('wc-product-gallery-zoom');
        add_theme_support('wc-product-gallery-lightbox');
        add_theme_support('wc-product-gallery-slider');
    }
}, 20);

/**
 * Register custom image sizes.
 */
add_action('after_setup_theme', function () {
    add_image_size('product-gallery-main', 800, 1000, true); // 800x1000 pixels, cropped
    add_image_size('portfolio-slide', 800, 500, true); // 16:10 aspect ratio, good for both desktop and mobile
}, 20);

/**
 * Register the theme sidebars.
 *
 * @return void
 */
add_action('widgets_init', function () {
    $config = [
        'before_widget' => '<section class="widget %1$s %2$s">',
        'after_widget' => '</section>',
        'before_title' => '<h3>',
        'after_title' => '</h3>',
    ];

    register_sidebar([
        'name' => __('Primary', 'sage'),
        'id' => 'sidebar-primary',
    ] + $config);

    register_sidebar([
        'name' => __('Footer', 'sage'),
        'id' => 'sidebar-footer',
    ] + $config);
});

/**
 * Register custom block pattern categories and patterns.
 */
add_action('init', function () {
    // First register the block type
    register_block_type('nynaeve/website-packages', [
        'render_callback' => function ($attributes, $content) {
            return $content; // Simply return the content as is
        },
    ]);

    // Register standard pattern categories that our patterns may use
    register_block_pattern_category(
        'pricing',
        [
            'label' => __('Pricing', 'nynaeve'),
        ]
    );

    // Register our custom pattern category
    register_block_pattern_category(
        'nynaeve-patterns',
        [
            'label' => __('Nynaeve Patterns', 'nynaeve'),
        ]
    );

    /**
     * Get processed pattern content from a pattern file
     */
    function get_processed_pattern_content($pattern_file)
    {
        // Use the actual file path directly instead of calling get_theme_file_path again
        ob_start();
        include $pattern_file;

        return ob_get_clean();
    }

    // Auto-register all patterns from resources/patterns directory
    $pattern_files = glob(get_theme_file_path('resources/patterns/*.php'));

    foreach ($pattern_files as $file) {
        $pattern_content = get_processed_pattern_content($file);

        // Extract metadata from file comments
        preg_match('/Title:\s*(.+)$/m', file_get_contents($file), $title);
        preg_match('/Slug:\s*(.+)$/m', file_get_contents($file), $slug);
        preg_match('/Categories:\s*(.+)$/m', file_get_contents($file), $categories);
        preg_match('/Description:\s*(.+)$/m', file_get_contents($file), $description);

        if (! empty($slug[1])) {
            $pattern_slug = trim($slug[1]);
            $pattern_title = isset($title[1]) ? __(trim($title[1]), 'nynaeve') : basename($file);
            $pattern_description = isset($description[1]) ? __(trim($description[1]), 'nynaeve') : '';

            // Process categories - split by comma and trim each
            $pattern_categories = [];
            if (isset($categories[1])) {
                $categories_list = explode(',', $categories[1]);
                foreach ($categories_list as $category) {
                    $pattern_categories[] = trim($category);
                }
            } else {
                $pattern_categories = ['nynaeve-patterns'];
            }

            register_block_pattern(
                $pattern_slug,
                [
                    'title' => $pattern_title,
                    'description' => $pattern_description,
                    'content' => $pattern_content,
                    'categories' => $pattern_categories,
                ]
            );
        }
    }
}, 20); // Increasing priority to ensure this runs after core patterns are registered

/**
 * Allow SVG uploads.
 *
 * @param  array  $mimes  Allowed mime types.
 * @return array Modified mime types.
 */
add_filter('upload_mimes', function ($mimes) {
    $mimes['svg'] = 'image/svg+xml';

    return $mimes;
});

/**
 * WooCommerce Support
 */
if (class_exists('WooCommerce')) {
    // Theme support calls moved to 'after_setup_theme' hook above

    /**
     * WooCommerce Customizations
     *
     * Removes default WooCommerce price displays and add-to-cart functionality
     * since this site operates on a quote-based system rather than direct sales.
     *
     * 1. Removes price display from single product pages and archive pages
     * 2. Removes add-to-cart buttons from single product pages and archive pages
     * 3. Adds a "Request Quote" button to single product pages only
     * 4. Redirects users away from cart/checkout pages since they're not needed
     */

    // Remove price and add to cart functionality from all product displays
    add_action('init', function () {
        if (function_exists('remove_action')) {
            remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_price', 10);
            remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_add_to_cart', 30);
            remove_action('woocommerce_after_shop_loop_item_title', 'woocommerce_template_loop_price', 10);
            remove_action('woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart', 10);
        }
    });

    // Add "Request Quote" button to single product pages only
    add_action('woocommerce_single_product_summary', function () {
        ?>
         <div class="quote-button-wrapper mt68">
             <a href="/contact-us" 
                class="text-center w-full px-4 py-3 bg-indigo-600 flex items-center 
               justify-center font-semibold text-lg text-white shadow-sm transition-all 
               duration-500 hover:bg-indigo-700 hover:shadow-indigo-400;">
                 Request Quote
             </a>
         </div>
         <?php
    }, 30);

    // Redirect users from cart and checkout pages since they're not needed
    add_action('template_redirect', function () {
        // Use the correctly imported global functions
        if (function_exists('is_cart') && function_exists('is_checkout') && function_exists('is_account_page')) {
            if (\is_cart() || \is_checkout() || \is_account_page()) {
                wp_redirect(home_url());
                exit;
            }
        }
    });
}
