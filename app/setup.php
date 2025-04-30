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
     * Get processed pattern content with caching
     *
     * @param  string  $pattern_file  Path to pattern file
     * @return string Processed pattern content
     */
    function get_processed_pattern_content($pattern_file)
    {
        static $cache = [];

        if (isset($cache[$pattern_file])) {
            return $cache[$pattern_file];
        }

        // Capture output from the pattern file
        ob_start();
        include $pattern_file;
        $output = ob_get_clean();

        // Store in cache for future use
        $cache[$pattern_file] = $output;

        return $output;
    }

    /**
     * Extract pattern metadata from file contents
     *
     * @param  string  $file_contents  The contents of the pattern file
     * @return array Associative array of pattern metadata
     */
    function extract_pattern_metadata($file_contents)
    {
        $metadata = [
            'title' => '',
            'slug' => '',
            'description' => '',
            'categories' => [],
        ];

        // Extract all metadata at once with a single regex
        preg_match_all('/(?:Title|Slug|Categories|Description):\s*(.+)$/m', $file_contents, $matches, PREG_SET_ORDER);

        foreach ($matches as $match) {
            $line = $match[0];
            $value = trim($match[1]);

            if (strpos($line, 'Title:') === 0) {
                $metadata['title'] = __($value, 'nynaeve');
            } elseif (strpos($line, 'Slug:') === 0) {
                $metadata['slug'] = $value;
            } elseif (strpos($line, 'Description:') === 0) {
                $metadata['description'] = __($value, 'nynaeve');
            } elseif (strpos($line, 'Categories:') === 0) {
                $metadata['categories'] = array_map('trim', explode(',', $value));
            }
        }

        // Set default category if none specified
        if (empty($metadata['categories'])) {
            $metadata['categories'] = ['nynaeve-patterns'];
        }

        return $metadata;
    }

    /**
     * Get theme files modification timestamp
     * Used to invalidate cache when files change
     *
     * @return int Latest modification timestamp
     */
    function get_patterns_modification_time()
    {
        $pattern_files = glob(get_theme_file_path('resources/patterns/*.php'));
        $latest_time = 0;

        foreach ($pattern_files as $file) {
            $mod_time = filemtime($file);
            if ($mod_time > $latest_time) {
                $latest_time = $mod_time;
            }
        }

        return $latest_time;
    }

    /**
     * Register all block patterns from the patterns directory
     *
     * This function scans the theme's patterns directory for PHP files,
     * extracts metadata from each pattern file (title, slug, description, categories),
     * and registers each pattern with WordPress. It handles error logging
     * for file access issues and provides meaningful defaults when metadata is missing.
     *
     * Each registered pattern is tracked in the returned array for cache management
     * and later verification of registration status.
     *
     * @return array Registered patterns data as [slug => string, file => string]
     */
    function register_all_block_patterns()
    {
        $pattern_files = glob(get_theme_file_path('resources/patterns/*.php'));
        $registered = [];

        foreach ($pattern_files as $file) {
            try {
                $file_contents = file_get_contents($file);
                if ($file_contents === false) {
                    error_log("Nynaeve: Failed to read pattern file: {$file}");

                    continue;
                }

                // Extract all metadata at once
                $metadata = extract_pattern_metadata($file_contents);

                if (empty($metadata['slug'])) {
                    continue;
                }

                // Set title default if needed
                if (empty($metadata['title'])) {
                    $metadata['title'] = basename($file);
                }

                // Get pattern content
                $pattern_content = get_processed_pattern_content($file);

                register_block_pattern(
                    $metadata['slug'],
                    [
                        'title' => $metadata['title'],
                        'description' => $metadata['description'],
                        'content' => $pattern_content,
                        'categories' => $metadata['categories'],
                    ]
                );

                $registered[] = [
                    'slug' => $metadata['slug'],
                    'file' => wp_normalize_path($file),
                ];
            } catch (\Exception $e) {
                error_log("Nynaeve: Error registering pattern from {$file}: ".$e->getMessage());
            }
        }

        return $registered;
    }

    // Auto-register all patterns from resources/patterns directory
    // Use transient caching to improve performance
    if (function_exists('register_block_pattern')) {
        // Get cached pattern data
        $patterns_data = get_transient('nynaeve_registered_patterns');
        $last_mod_time = get_transient('nynaeve_patterns_last_modified');
        $current_mod_time = get_patterns_modification_time();

        // Check if cache needs refreshing:
        // 1. No cached patterns
        // 2. Pattern files have been modified since cache was created
        if (! $patterns_data || ! $last_mod_time || $current_mod_time > $last_mod_time) {
            $patterns_data = register_all_block_patterns();

            if (! empty($patterns_data)) {
                set_transient('nynaeve_registered_patterns', $patterns_data, DAY_IN_SECONDS);
                set_transient('nynaeve_patterns_last_modified', $current_mod_time, DAY_IN_SECONDS);
            }
        } else {
            // Check if we need to re-register any patterns
            // (e.g., after plugin updates that might clear registrations)
            $needs_refresh = false;

            if (! empty($patterns_data)) {
                foreach ($patterns_data as $pattern) {
                    if (! registered_pattern_exists($pattern['slug'])) {
                        $needs_refresh = true;
                        break;
                    }
                }

                if ($needs_refresh) {
                    $patterns_data = register_all_block_patterns();
                    set_transient('nynaeve_registered_patterns', $patterns_data, DAY_IN_SECONDS);
                }
            }
        }

        // Apply filters to allow other code to refresh patterns
        add_filter('nynaeve_refresh_block_patterns', function ($refresh) {
            if ($refresh) {
                delete_transient('nynaeve_registered_patterns');
                delete_transient('nynaeve_patterns_last_modified');
            }

            return $refresh;
        });
    }
}, 9); // Lower priority so it runs BEFORE other pattern registrations

/**
 * Check if a registered pattern exists
 *
 * @param  string  $pattern_slug  The pattern slug to check
 * @return bool Whether the pattern exists
 */
function registered_pattern_exists($pattern_slug)
{
    if (! class_exists('\WP_Block_Patterns_Registry') || ! method_exists('\WP_Block_Patterns_Registry', 'get_instance')) {
        return false;
    }

    $registry = \WP_Block_Patterns_Registry::get_instance();

    return $registry->is_registered($pattern_slug);
}

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
    if (function_exists('is_woocommerce')) {
        add_action('template_redirect', function () {
            if (is_cart() || is_checkout() || is_account_page()) {
                wp_redirect(home_url());
                exit;
            }
        });
    }
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
            register_block_type($block_json_path);
        }
    }
}, 10);
