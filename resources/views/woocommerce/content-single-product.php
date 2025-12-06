<?php
/**
 * The template for displaying product content in the single-product.php template
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/content-single-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://woocommerce.com/document/template-structure/
 *
 * @version 3.6.0
 */
defined('ABSPATH') || exit;

global $product;

/**
 * Hook: woocommerce_before_single_product.
 *
 * @hooked woocommerce_output_all_notices - 10
 */
do_action('woocommerce_before_single_product');

if (post_password_required()) {
    echo get_the_password_form(); // WPCS: XSS ok.

    return;
}
?>

<div id="product-<?php the_ID(); ?>" <?php wc_product_class('product-content-wrapper', $product); ?>>

  <!-- Product Summary Section -->
  <section class="product-summary bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      <!-- Title at Top -->
      <div class="product-header mb-8">
        <h1 class="text-3xl lg:text-4xl font-bold text-contrast mb-2 font-montserrat">
          <?php the_title(); ?>
        </h1>

        <?php
        // Show price only in standard and catalog modes (not in quote mode)
        $woocommerce_mode = function_exists('App\\get_woocommerce_mode') ? App\get_woocommerce_mode() : 'quote';
if ($woocommerce_mode !== 'quote' && $product->get_price_html()) {
    ?>
          <div class="product-price text-2xl font-bold text-contrast mb-4">
            <?php echo $product->get_price_html(); ?>
          </div>
        <?php } ?>

        <?php
    // Category
    $categories = wc_get_product_category_list(get_the_ID());
if ($categories) {
    echo '<p class="text-sm font-medium text-primary">'.strip_tags($categories).'</p>';
}
?>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

        <!-- Product Image -->
        <div class="product-image-area">
          <div class="product-image-main max-w-md mx-auto lg:mx-0 mb-4">
            <?php
    $image_id = $product->get_image_id();
if ($image_id) {
    echo wp_get_attachment_image($image_id, 'medium_large', false, [
        'class' => 'w-full h-auto rounded-lg shadow-lg',
        'alt' => $product->get_name(),
    ]);
} else {
    echo wc_placeholder_img('medium_large', 'w-full h-auto rounded-lg');
}
?>
          </div>
        </div>

        <!-- Product Info -->
        <div class="product-info">
          <div class="product-short-description text-base-accent mb-6 font-open-sans leading-relaxed text-base">
            <?php echo wpautop($product->get_short_description()); ?>
          </div>

          <!-- Request Quote Button (from WooCommerce hooks) -->
          <div class="product-actions mb-8">
            <?php do_action('woocommerce_single_product_summary'); ?>
          </div>

          <!-- Accordion Sections -->
          <div class="product-details-accordion space-y-4">
            <?php
// Get ACF field values
$features = function_exists('get_field') ? get_field('product_features') : '';
$included = function_exists('get_field') ? get_field('product_included') : '';
$pricing = function_exists('get_field') ? get_field('product_pricing') : '';

// Build sections array with ACF field content
$sections = [];

if ($features) {
    $sections['features'] = [
        'title' => 'Features',
        'content' => $features,
    ];
}

if ($included) {
    $sections['included'] = [
        'title' => 'What\'s Included',
        'content' => $included,
    ];
}

if ($pricing) {
    $sections['pricing'] = [
        'title' => 'Pricing Details',
        'content' => $pricing,
    ];
}

// Only display accordion if there are sections with content
if (! empty($sections)) {
    foreach ($sections as $key => $section) {
        ?>
              <details class="product-detail-item border-b border-base-2 pb-4">
                <summary class="cursor-pointer font-semibold text-contrast flex justify-between items-center py-2 hover:text-primary transition-colors">
                  <span><?php echo esc_html($section['title']); ?></span>
                  <svg class="w-5 h-5 transform transition-transform detail-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                </summary>
                <div class="mt-3 text-base-accent font-open-sans leading-relaxed">
                  <?php echo $section['content']; ?>
                </div>
              </details>
            <?php
    }
}
?>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- Full Product Description (Gutenberg Blocks) -->
  <section class="product-full-content bg-base">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-12">
      <?php the_content(); ?>
    </div>
  </section>

</div>

<style>
/* Accordion styling */
.product-detail-item[open] .detail-arrow {
  transform: rotate(45deg);
}
</style>

<?php do_action('woocommerce_after_single_product'); ?>
