<?php
/**
 * Title: Pricing Table
 * Slug: nynaeve/pricing-table
 * Description: A comparison of website packages with pricing and feature details in a two-column layout.
 * Categories: pricing, nynaeve-patterns
 * Keywords: pricing, packages, features, columns, websites, comparison
 * Viewport Width: 1500
 * Block Types: core/group
 * Post Types:
 * Inserter: true
 */
?>
<!-- wp:group {"align":"full","className":"pricing-table-container","style":{"spacing":{"padding":{"right":"2rem","left":"2rem","top":"4rem","bottom":"4rem"}},"backgroundColor":{"slug":"bggray","name":"BgGray","color":"#ebeced"}},"backgroundColor":"primary-accent"} -->
<div class="wp-block-group alignfull pricing-table-container has-bggray-background-color has-background has-primary-accent-background-color" style="padding-top:4rem;padding-right:2rem;padding-bottom:4rem;padding-left:2rem">
    <!-- wp:heading {"className":"wp-block-heading has-text-align-center has-open-sans-font-family has-4xl-font-size","textColor":"black","fontSize":"3xl","fontFamily":"open-sans"} -->
    <h2 class="wp-block-heading has-text-align-center has-open-sans-font-family has-black-color has-text-color has-3-xl-font-size">Website Packages.</h2>
    <!-- /wp:heading -->

    <!-- wp:paragraph {"align":"center","className":"pricing-subtitle","fontSize":"lg","textColor":"textbodygray"} -->
    <p class="has-text-align-center pricing-subtitle has-textbodygray-color has-lg-font-size has-text-color">Choose the package that best fits your business needs</p>
    <!-- /wp:paragraph -->

    <!-- wp:group {"layout":{"type":"constrained","contentSize":"64rem"}} -->
    <div class="wp-block-group">
        <!-- wp:group -->
        <div class="wp-block-group">
            <!-- wp:columns {"style":{"spacing":{"blockGap":{"top":"2rem","left":"2rem"}}}} -->
            <div class="wp-block-columns">
                <!-- wp:column {"backgroundColor":"base","style":{"border":{"width":"1px","color":"#cbcbcb","radius":"1rem"},"spacing":{"padding":{"top":"2rem","right":"2rem","bottom":"2rem","left":"2rem"}}}} -->
                <div class="wp-block-column has-base-background-color has-background has-border-color" style="border-color:#cbcbcb;border-width:1px;border-radius:1rem;padding-top:2rem;padding-right:2rem;padding-bottom:2rem;padding-left:2rem">
                    <!-- wp:heading {"level":2,"style":{"spacing":{"margin":{"bottom":"0.5rem"}}}} -->
                    <h2 class="wp-block-heading" style="margin-bottom:0.5rem">Standard</h2>
                    <!-- /wp:heading -->
                    
                    <!-- wp:paragraph {"style":{"spacing":{"margin":{"top":"0","bottom":"1.5rem"}}},"fontSize":"lg","textColor":"textbodygray","fontFamily":"open-sans"} -->
                    <p class="has-textbodygray-color has-open-sans-font-family has-lg-font-size" style="margin-top:0;margin-bottom:1.5rem">Perfect for small websites that need a professional presence.</p>
                    <!-- /wp:paragraph -->
                    
                    <!-- wp:heading {"level":3,"style":{"spacing":{"margin":{"top":"1.5rem","bottom":"1.5rem"}}}} -->
                    <h3 class="wp-block-heading" style="margin-top:1.5rem;margin-bottom:1.5rem"><strong>€799</strong> <span style="font-weight:normal;font-size:1rem;color:#98999a">starting price</span></h3>
                    <!-- /wp:heading -->
                    
                    <!-- wp:group -->
                    <div class="wp-block-group">
                        <!-- wp:group {"className":"feature-item"} -->
                        <div class="wp-block-group feature-item">
                            <!-- wp:group {"style":{"spacing":{"blockGap":"0.5rem"}},"layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"top"}} -->
                            <div class="wp-block-group">
                                <!-- wp:image {"width":"24px","height":"24px","className":"feature-icon"} -->
                                <figure class="wp-block-image is-resized feature-icon"><img src="<?php echo esc_url(get_theme_file_uri('resources/images/icons/pricing/check-circle.svg')); ?>" alt="Check icon" style="width:24px;height:24px"/></figure>
                                <!-- /wp:image -->
                                
                                <!-- wp:paragraph {"textColor":"textbodygray"} -->
                                <p class="has-textbodygray-color has-text-color">Standard hosting included</p>
                                <!-- /wp:paragraph -->
                            </div>
                            <!-- /wp:group -->
                        </div>
                        <!-- /wp:group -->
                        
                        <!-- wp:group {"className":"feature-item"} -->
                        <div class="wp-block-group feature-item">
                            <!-- wp:group {"style":{"spacing":{"blockGap":"0.5rem"}},"layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"top"}} -->
                            <div class="wp-block-group">
                                <!-- wp:image {"width":"24px","height":"24px","className":"feature-icon"} -->
                                <figure class="wp-block-image is-resized feature-icon"><img src="<?php echo esc_url(get_theme_file_uri('resources/images/icons/pricing/check-circle.svg')); ?>" alt="Check icon" style="width:24px;height:24px"/></figure>
                                <!-- /wp:image -->
                                
                                <!-- wp:paragraph {"textColor":"textbodygray"} -->
                                <p class="has-textbodygray-color has-text-color">Responsive design</p>
                                <!-- /wp:paragraph -->
                            </div>
                            <!-- /wp:group -->
                        </div>
                        <!-- /wp:group -->
                        
                        <!-- wp:group {"className":"feature-item"} -->
                        <div class="wp-block-group feature-item">
                            <!-- wp:group {"style":{"spacing":{"blockGap":"0.5rem"}},"layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"top"}} -->
                            <div class="wp-block-group">
                                <!-- wp:image {"width":"24px","height":"24px","className":"feature-icon"} -->
                                <figure class="wp-block-image is-resized feature-icon"><img src="<?php echo esc_url(get_theme_file_uri('resources/images/icons/pricing/check-circle.svg')); ?>" alt="Check icon" style="width:24px;height:24px"/></figure>
                                <!-- /wp:image -->
                                
                                <!-- wp:paragraph {"textColor":"textbodygray"} -->
                                <p class="has-textbodygray-color has-text-color">Basic SEO setup</p>
                                <!-- /wp:paragraph -->
                            </div>
                            <!-- /wp:group -->
                        </div>
                        <!-- /wp:group -->
                        
                        <!-- wp:group {"className":"feature-item"} -->
                        <div class="wp-block-group feature-item">
                            <!-- wp:group {"style":{"spacing":{"blockGap":"0.5rem"}},"layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"top"}} -->
                            <div class="wp-block-group">
                                <!-- wp:image {"width":"24px","height":"24px","className":"feature-icon"} -->
                                <figure class="wp-block-image is-resized feature-icon"><img src="<?php echo esc_url(get_theme_file_uri('resources/images/icons/pricing/x-circle.svg')); ?>" alt="Not included icon" style="width:24px;height:24px"/></figure>
                                <!-- /wp:image -->
                                
                                <!-- wp:paragraph {"textColor":"textbodygray"} -->
                                <p class="has-textbodygray-color has-text-color">Custom development</p>
                                <!-- /wp:paragraph -->
                            </div>
                            <!-- /wp:group -->
                        </div>
                        <!-- /wp:group -->
                        
                        <!-- wp:buttons {"layout":{"type":"flex","justifyContent":"left"},"style":{"spacing":{"margin":{"top":"2rem"}}}} -->
                        <div class="wp-block-buttons" style="margin-top:2rem">
                            <!-- wp:button {"backgroundColor":"ctablue","textColor":"base","className":"is-style-fill","style":{"border":{"radius":"0.5rem"}}} -->
                            <div class="wp-block-button is-style-fill"><a class="wp-block-button__link has-base-color has-ctablue-background-color has-text-color has-background wp-element-button" style="border-radius:0.5rem">Get Started</a></div>
                            <!-- /wp:button -->
                        </div>
                        <!-- /wp:buttons -->
                    </div>
                    <!-- /wp:group -->
                </div>
                <!-- /wp:column -->
                
                <!-- wp:column {"backgroundColor":"base","style":{"border":{"color":"#017cb6","width":"2px","radius":"1rem"},"spacing":{"padding":{"top":"2rem","right":"2rem","bottom":"2rem","left":"2rem"}}}} -->
                <div class="wp-block-column has-base-background-color has-background has-border-color" style="border-color:#017cb6;border-width:2px;border-radius:1rem;padding-top:2rem;padding-right:2rem;padding-bottom:2rem;padding-left:2rem">
                    <!-- wp:heading {"level":2,"style":{"spacing":{"margin":{"bottom":"0.5rem"}}},"className":"premium-heading"} -->
                    <h2 class="wp-block-heading premium-heading" style="margin-bottom:0.5rem">Premium <span class="has-ctablue-color has-text-color has-background has-xs-font-size" style="border-radius:1rem;background-color:#e8f7fd;padding:0.5rem 1rem;font-size:0.75rem;margin-left:0.5rem"><strong>MOST POPULAR</strong></span></h2>
                    <!-- /wp:heading -->
                    
                    <!-- wp:paragraph {"style":{"spacing":{"margin":{"top":"0","bottom":"1.5rem"}}},"fontSize":"lg","textColor":"textbodygray","fontFamily":"open-sans"} -->
                    <p class="has-textbodygray-color has-open-sans-font-family has-lg-font-size" style="margin-top:0;margin-bottom:1.5rem">Fully customized solution with advanced features.</p>
                    <!-- /wp:paragraph -->
                    
                    <!-- wp:heading {"level":3,"style":{"spacing":{"margin":{"top":"1.5rem","bottom":"1.5rem"}}}} -->
                    <h3 class="wp-block-heading" style="margin-top:1.5rem;margin-bottom:1.5rem"><strong>€2499</strong> <span style="font-weight:normal;font-size:1rem;color:#98999a">starting price</span></h3>
                    <!-- /wp:heading -->
                    
                    <!-- wp:group -->
                    <div class="wp-block-group">
                        <!-- wp:group {"className":"feature-item"} -->
                        <div class="wp-block-group feature-item">
                            <!-- wp:group {"style":{"spacing":{"blockGap":"0.5rem"}},"layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"top"}} -->
                            <div class="wp-block-group">
                                <!-- wp:image {"width":"24px","height":"24px","className":"feature-icon"} -->
                                <figure class="wp-block-image is-resized feature-icon"><img src="<?php echo esc_url(get_theme_file_uri('resources/images/icons/pricing/check-circle.svg')); ?>" alt="Check icon" style="width:24px;height:24px"/></figure>
                                <!-- /wp:image -->
                                
                                <!-- wp:paragraph {"textColor":"textbodygray"} -->
                                <p class="has-textbodygray-color has-text-color">Premium hosting with CDN</p>
                                <!-- /wp:paragraph -->
                            </div>
                            <!-- /wp:group -->
                        </div>
                        <!-- /wp:group -->
                        
                        <!-- wp:group {"className":"feature-item"} -->
                        <div class="wp-block-group feature-item">
                            <!-- wp:group {"style":{"spacing":{"blockGap":"0.5rem"}},"layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"top"}} -->
                            <div class="wp-block-group">
                                <!-- wp:image {"width":"24px","height":"24px","className":"feature-icon"} -->
                                <figure class="wp-block-image is-resized feature-icon"><img src="<?php echo esc_url(get_theme_file_uri('resources/images/icons/pricing/check-circle.svg')); ?>" alt="Check icon" style="width:24px;height:24px"/></figure>
                                <!-- /wp:image -->
                                
                                <!-- wp:paragraph {"textColor":"textbodygray"} -->
                                <p class="has-textbodygray-color has-text-color">Custom design &amp; development</p>
                                <!-- /wp:paragraph -->
                            </div>
                            <!-- /wp:group -->
                        </div>
                        <!-- /wp:group -->
                        
                        <!-- wp:group {"className":"feature-item"} -->
                        <div class="wp-block-group feature-item">
                            <!-- wp:group {"style":{"spacing":{"blockGap":"0.5rem"}},"layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"top"}} -->
                            <div class="wp-block-group">
                                <!-- wp:image {"width":"24px","height":"24px","className":"feature-icon"} -->
                                <figure class="wp-block-image is-resized feature-icon"><img src="<?php echo esc_url(get_theme_file_uri('resources/images/icons/pricing/check-circle.svg')); ?>" alt="Check icon" style="width:24px;height:24px"/></figure>
                                <!-- /wp:image -->
                                
                                <!-- wp:paragraph {"textColor":"textbodygray"} -->
                                <p class="has-textbodygray-color has-text-color">Advanced SEO optimization</p>
                                <!-- /wp:paragraph -->
                            </div>
                            <!-- /wp:group -->
                        </div>
                        <!-- /wp:group -->
                        
                        <!-- wp:group {"className":"feature-item"} -->
                        <div class="wp-block-group feature-item">
                            <!-- wp:group {"style":{"spacing":{"blockGap":"0.5rem"}},"layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"top"}} -->
                            <div class="wp-block-group">
                                <!-- wp:image {"width":"24px","height":"24px","className":"feature-icon"} -->
                                <figure class="wp-block-image is-resized feature-icon"><img src="<?php echo esc_url(get_theme_file_uri('resources/images/icons/pricing/check-circle.svg')); ?>" alt="Check icon" style="width:24px;height:24px"/></figure>
                                <!-- /wp:image -->
                                
                                <!-- wp:paragraph {"textColor":"textbodygray"} -->
                                <p class="has-textbodygray-color has-text-color">6-month maintenance plan</p>
                                <!-- /wp:paragraph -->
                            </div>
                            <!-- /wp:group -->
                        </div>
                        <!-- /wp:group -->
                        
                        <!-- wp:buttons {"layout":{"type":"flex","justifyContent":"left"},"style":{"spacing":{"margin":{"top":"2rem"}}}} -->
                        <div class="wp-block-buttons" style="margin-top:2rem">
                            <!-- wp:button {"backgroundColor":"ctablue","textColor":"base","style":{"border":{"radius":"0.5rem"}}} -->
                            <div class="wp-block-button"><a class="wp-block-button__link has-base-color has-ctablue-background-color has-text-color has-background wp-element-button" style="border-radius:0.5rem">Get Started</a></div>
                            <!-- /wp:button -->
                        </div>
                        <!-- /wp:buttons -->
                    </div>
                    <!-- /wp:group -->
                </div>
                <!-- /wp:column -->
            </div>
            <!-- /wp:columns -->
        </div>
        <!-- /wp:group -->
    </div>
    <!-- /wp:group -->
</div>
<!-- /wp:group -->
