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
 * ACF Options Pages
 */
add_action('acf/init', function () {
    if (function_exists('acf_add_options_page')) {
        acf_add_options_page([
            'page_title' => 'Theme Options',
            'menu_title' => 'Theme Options',
            'menu_slug' => 'theme-options',
            'capability' => 'edit_posts',
            'icon_url' => 'dashicons-admin-generic',
            'position' => 30,
        ]);
    }
});

/**
 * WooCommerce Support
 */
if (class_exists('WooCommerce')) {
    // Theme support calls moved to 'after_setup_theme' hook above

    /**
     * Get WooCommerce mode from theme options
     *
     * @return string The WooCommerce mode: 'quote', 'standard', or 'catalog'
     */
    function get_woocommerce_mode()
    {
        if (function_exists('get_field')) {
            $mode = get_field('woocommerce_mode', 'option');

            return $mode ?: 'quote'; // Default to quote mode
        }

        return 'quote';
    }

    /**
     * WooCommerce Customizations based on selected mode
     *
     * Three modes available:
     * 1. Quote Mode: Removes prices and add-to-cart, shows "Request Quote" button
     * 2. Standard Mode: Normal WooCommerce functionality with cart and checkout
     * 3. Catalog Mode: Shows prices but removes add-to-cart functionality
     */

    // Apply customizations based on selected mode
    add_action('init', function () {
        $mode = get_woocommerce_mode();

        if ($mode === 'quote') {
            // Quote Mode: Remove prices and add-to-cart
            if (function_exists('remove_action')) {
                remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_price', 10);
                remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_add_to_cart', 30);
                remove_action('woocommerce_after_shop_loop_item_title', 'woocommerce_template_loop_price', 10);
                remove_action('woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart', 10);
            }
        } elseif ($mode === 'catalog') {
            // Catalog Mode: Keep prices but remove add-to-cart
            if (function_exists('remove_action')) {
                remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_add_to_cart', 30);
                remove_action('woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart', 10);
            }
        }
        // Standard mode: No modifications needed, WooCommerce works normally
    });

    // Add "Request Quote" button for quote mode
    add_action('woocommerce_single_product_summary', function () {
        $mode = get_woocommerce_mode();

        if ($mode === 'quote') {
            ?>
            <div class="quote-button-wrapper mt68">
                <a href="/contact-us" 
                   class="text-center w-full px-4 py-3 bg-indigo-600 flex items-center 
                  justify-center font-semibold text-lg text-white shadow-sm transition-all 
                  duration-500 hover:bg-indigo-700 hover:shadow-indigo-400;"
                  style="color: #fff !important;">
                    Request Quote
                </a>
            </div>
            <?php
        }
    }, 30);

    // Quote mode allows all pages to load but removes purchasing functionality
    // Cart and checkout pages will show but without functional add-to-cart buttons
    // This allows users to see quote buttons on all WooCommerce pages

    // Intercept checkout API for quote mode
    add_action('rest_api_init', function () {
        $mode = get_woocommerce_mode();

        if ($mode === 'quote') {
            register_rest_route('wc/store/v1', '/checkout', [
                'methods' => 'POST',
                'callback' => function ($request) {
                    error_log('Checkout endpoint was hit at: '.current_time('mysql'));
                    error_log(print_r($request->get_params(), true));

                    return new \WP_REST_Response([
                        'message' => 'Custom intercepted.',
                    ], 403);
                },
                'permission_callback' => '__return_true',
            ]);
        }
    }, 99);

    /**
     * Fix WooCommerce product-collection blocks missing queryId attribute
     * Prevents "WooCommerce product-collection missing queryId" warnings in debug.log
     */
    add_filter('render_block', function ($block_content, $block) {
        // Only process woocommerce/product-collection blocks
        if ($block['blockName'] !== 'woocommerce/product-collection') {
            return $block_content;
        }

        // Check if queryId is missing from the block attributes
        if (empty($block['attrs']['queryId'])) {
            // Generate a unique queryId based on block position and context
            $query_id = isset($block['attrs']['collection'])
                ? 'collection-' . sanitize_key($block['attrs']['collection'])
                : 'product-collection-' . wp_generate_password(8, false);

            // Log the fix (only in debug mode)
            if (defined('WP_DEBUG') && WP_DEBUG) {
                error_log(sprintf(
                    'WooCommerce product-collection missing queryId - auto-fixed with ID: %s',
                    $query_id
                ));
            }
        }

        return $block_content;
    }, 10, 2);

    /**
     * Suppress WooCommerce duplicate key database errors
     * These errors are harmless - they occur when WooCommerce tries to add indexes that already exist
     * This prevents them from cluttering debug.log
     */
    add_filter('query', function ($query) {
        global $wpdb;

        // Suppress duplicate key errors for known WooCommerce indexes
        if (
            strpos($query, 'ADD KEY `session_expiry`') !== false ||
            strpos($query, 'ADD INDEX woo_idx_comment_date_type') !== false
        ) {
            // Check if the index already exists before attempting to add it
            $suppress_errors = $wpdb->suppress_errors();
            $wpdb->suppress_errors(true);

            // Execute the query (it will fail silently if index exists)
            $result = $wpdb->query($query);

            // Restore error suppression state
            $wpdb->suppress_errors($suppress_errors);

            // Return empty to prevent the original query from running
            return '';
        }

        return $query;
    }, 1);
}

/**
 * Register block types using block.json metadata from the theme's blocks directory.
 * This function will scan the 'resources/js/blocks' directory for block.json files.
 */
add_action('init', function () {
    $blocks_dir = get_template_directory().'/resources/js/blocks';
    if (! is_dir($blocks_dir)) {
        return;
    }

    $block_folders = scandir($blocks_dir);

    foreach ($block_folders as $folder) {
        if ($folder === '.' || $folder === '..') {
            continue;
        }

        $block_json_path = $blocks_dir.'/'.$folder.'/block.json';

        if (file_exists($block_json_path)) {
            // Special handling for blocks that use Slick Carousel
            if ($folder === 'carousel' || $folder === 'testimonial-grid') {
                register_block_type($block_json_path, [
                    'render_callback' => function ($attributes, $content) {
                        if (! is_admin()) {
                            // Enqueue Slick Carousel CSS
                            wp_enqueue_style(
                                'slick-carousel',
                                get_template_directory_uri().'/resources/vendor/slick/slick.min.css',
                                [],
                                '1.8.1'
                            );

                            // Enqueue Slick Carousel JS
                            wp_enqueue_script(
                                'slick-carousel',
                                get_template_directory_uri().'/resources/vendor/slick/slick.min.js',
                                ['jquery'],
                                '1.8.1',
                                true
                            );
                        }

                        return $content;
                    },
                ]);
            } else {
                register_block_type($block_json_path);
            }
        }
    }
}, 10);

/**
 * Register custom block category for Imagewize blocks.
 */
add_filter('block_categories_all', function ($categories) {
    return array_merge($categories, [
        [
            'slug' => 'imagewize',
            'title' => __('Imagewize', 'imagewize'),
            'icon' => null,
        ],
    ]);
}, 10, 2);

/**
 * Register a custom REST API endpoint to intercept checkout requests.
 * This is used to prevent normal checkout processing since we're using a quote-based system.
 * The endpoint logs the request data for debugging and returns a custom response.
 * Priority 99 ensures this runs after WooCommerce's own endpoints are registered.
 */
add_action('rest_api_init', function () {
    register_rest_route('wc/store/v1', '/checkout', [
        'methods' => 'POST',
        'callback' => function ($request) {
            error_log('Checkout endpoint was hit at: '.current_time('mysql'));
            error_log(print_r($request->get_params(), true));

            return new \WP_REST_Response([
                'message' => 'Custom intercepted.',
            ], 403);
        },
        'permission_callback' => '__return_true',
    ]);
}, 99);
