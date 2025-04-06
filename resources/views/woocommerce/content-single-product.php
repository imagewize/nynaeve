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
 * @package WooCommerce\Templates
 * @version 3.6.0
 */

defined( 'ABSPATH' ) || exit;

global $product;

/**
 * Hook: woocommerce_before_single_product.
 *
 * @hooked woocommerce_output_all_notices - 10
 */
do_action( 'woocommerce_before_single_product' );

if ( post_password_required() ) {
	echo get_the_password_form(); // WPCS: XSS ok.
	return;
}
?>
<section class="image-and-short-description relative mb-10">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 mx-auto max-md:px-2" id="product-<?php the_ID(); ?>" <?php wc_product_class('', $product); ?>>
    
    <div class="img">
      <div class="img-box h-full max-lg:mx-auto">
        <?php
        // Remove default WooCommerce gallery
        remove_action('woocommerce_before_single_product_summary', 'woocommerce_show_product_images', 20);
        
        // Custom gallery implementation
        $attachment_ids = $product->get_gallery_image_ids();
        $main_image_id = $product->get_image_id();
        
        if ($main_image_id) {
            array_unshift($attachment_ids, $main_image_id);
        }
        
        if (!empty($attachment_ids)) : ?>
          <div class="product-gallery">
            <div class="gallery-main">
              <?php
              $main_image = wp_get_attachment_image_src($attachment_ids[0], 'product-gallery-main');
              $main_image_srcset = wp_get_attachment_image_srcset($attachment_ids[0], 'product-gallery-main');
              if ($main_image) : ?>
                <img src="<?php echo esc_url($main_image[0]); ?>" srcset="<?php echo esc_attr($main_image_srcset); ?>" sizes="(max-width: 768px) 100vw, 50vw" alt="<?php echo esc_attr($product->get_name()); ?>" class="main-image">
              <?php endif; ?>
            </div>
            
            <?php if (count($attachment_ids) > 1) : ?>
              <div class="gallery-thumbs">
                <?php foreach ($attachment_ids as $index => $attachment_id) :
                  $thumb = wp_get_attachment_image_src($attachment_id, 'thumbnail');
                  $full = wp_get_attachment_image_src($attachment_id, 'product-gallery-main');
                  $full_srcset = wp_get_attachment_image_srcset($attachment_id, 'product-gallery-main');
                  if ($thumb && $full) : ?>
                    <div class="gallery-thumb <?php echo $index === 0 ? 'active' : ''; ?>" data-full="<?php echo esc_url($full[0]); ?>" data-srcset="<?php echo esc_attr($full_srcset); ?>">
                      <img src="<?php echo esc_url($thumb[0]); ?>" alt="">
                    </div>
                  <?php endif;
                endforeach; ?>
              </div>
            <?php endif; ?>
          </div>
        <?php endif; ?>
      </div>
    </div>

    <div class="short-description data w-full lg:pr-8 pr-0 xl:justify-start justify-center flex items-start max-lg:pb-10 xl:my-2 lg:my-5 my-0">
      <div class="data w-full max-w-xl">
        <?php
          $categories = wc_get_product_category_list(get_the_ID());
          if ($categories) {
            echo '<p class="text-lg font-medium leading-8 text-indigo-600 mb-4">' . strip_tags($categories) . '</p>';
          }
        ?>
        
        <div class="summary entry-summary font-open-sans text-bggray">
          <?php do_action('woocommerce_single_product_summary'); ?>
        </div>
      </div>
    </div>

  </div>
</section>
<section class="full-description relative mb-16">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-2xl font-semibold mb-6 font-open-sans">Detailed Description</h2>
    <div class="prose max-w-none">
      <?php the_content(); ?>
    </div>
  </div>
</section>

<?php do_action('woocommerce_after_single_product'); ?>
