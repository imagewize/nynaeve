<?php

/**
 * Theme filters.
 */

namespace App;

/**
 * Customize excerpt length
 */
add_filter('excerpt_length', function () {
    return 25; // Adjust this number to control the word count
});

/**
 * Add "..." to the excerpt.
 *
 * @return string
 */
add_filter('excerpt_more', function () {
    return '...';
});

/**
 * Remove the default widgets editor depenedencies check.
 *
 * @return void
 */
remove_filter('admin_head', 'wp_check_widget_editor_deps');

/**
 * Set ACF JSON Save Path Location
 *
 * @param  string  $path  The default path
 * @return string
 */
function my_acf_json_save_point($path)
{
    // Get current field group being saved
    $field_group = false;
    if (! empty($_POST['acf_field_group'])) {
        $field_group = $_POST['acf_field_group'];
    }

    // Default path
    $custom_path = get_stylesheet_directory().'/resources/acf-json';

    if ($field_group && isset($field_group['title'])) {
        if ($field_group['title'] === 'Homepage Builder') {
            $custom_path = get_stylesheet_directory().'/resources/acf-json/homepage-builder';
        }
    }

    // Create directory if it doesn't exist
    if (! file_exists($custom_path)) {
        wp_mkdir_p($custom_path);
    }

    return $custom_path;
}
/**
 * Set ACF JSON Load Path Location
 *
 * @param  array  $paths  The default paths
 * @return array
 */
add_filter('acf/settings/save_json', __NAMESPACE__.'\\my_acf_json_save_point');

/**
 * Remove the required fields legend from Gravity Forms
 *
 * @return string Empty string to remove the legend
 */
add_filter('gform_required_legend', '__return_empty_string');

/**
 * Make non-critical stylesheets non-render-blocking
 * Uses the "print media" technique to load CSS asynchronously
 *
 * @param  string  $html    The link tag HTML
 * @param  string  $handle  The stylesheet handle
 * @return string Modified HTML
 */
add_filter('style_loader_tag', function ($html, $handle) {
    // List of non-critical stylesheets to load asynchronously
    $async_styles = [
        // Classic WooCommerce styles
        'woocommerce-layout',
        'woocommerce-smallscreen',
        'woocommerce-general',
        'wc-brands-styles',
        // WooCommerce Blocks styles
        'wc-blocks-style',
        'wc-blocks-vendors-style',
        // Other
        'slick-carousel',
    ];

    if (in_array($handle, $async_styles, true)) {
        // Change media to print, swap to all on load
        $html = str_replace(
            "media='all'",
            "media='print' onload=\"this.media='all'\"",
            $html
        );
    }

    return $html;
}, 10, 2);
