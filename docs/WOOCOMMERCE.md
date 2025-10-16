# WooCommerce Integration

Nynaeve includes flexible WooCommerce integration with three distinct modes to support different business models. Perfect for B2B businesses, custom products, and lead generation.

## Table of Contents

- [Operating Modes](#operating-modes)
- [Configuration](#configuration)
- [Quote Mode (Default)](#quote-mode-default)
- [Standard Mode](#standard-mode)
- [Catalog Mode](#catalog-mode)
- [Customization](#customization)

## Operating Modes

The theme supports three WooCommerce operating modes, configurable via Theme Options:

| Mode | Prices | Add to Cart | Checkout | Best For |
|------|--------|-------------|----------|----------|
| **Quote Mode** | Hidden | "Request Quote" button | Disabled | B2B, custom products, lead generation |
| **Standard Mode** | Visible | Standard buttons | Enabled | Traditional e-commerce |
| **Catalog Mode** | Visible | Hidden | Disabled | Product showcases, price transparency |

## Configuration

### Theme Options

Configure WooCommerce mode via **WordPress Admin → Theme Options**:

1. Navigate to **Appearance → Theme Options** (or wherever your ACF Options page is located)
2. Find the **WooCommerce Settings** section
3. Select your desired mode from the dropdown:
   - Quote Mode
   - Standard Mode
   - Catalog Mode
4. Save changes

Changes take effect immediately - no cache clearing required.

## Quote Mode (Default)

**Best for:** B2B businesses, custom products, services requiring consultation, lead generation

### Features

- **Hide Prices**: Product prices are hidden throughout the site
- **Request Quote Buttons**: Replaces "Add to Cart" with "Request Quote" buttons on single product pages
- **Cart/Checkout Disabled**: Users are redirected away from cart and checkout pages
- **REST API Protection**: Checkout requests are intercepted and prevented
- **Lead Generation Focus**: Encourages direct contact with potential customers

### How It Works

**On Product Archives (Shop, Category, Tag pages):**
- Products display without prices
- No add-to-cart buttons visible
- Users must visit product page for details

**On Single Product Pages:**
- Product details visible (images, description, attributes)
- Price section hidden
- "Request Quote" button displayed instead of "Add to Cart"
- Button links to contact page or quote request form

**Cart/Checkout Protection:**
- Direct access to cart page redirects to shop or home
- Checkout page redirects to shop or home
- REST API checkout endpoint returns error response
- No accidental purchases possible

### Use Cases

- **Custom Manufacturing**: Products require specifications before pricing
- **B2B Sales**: Pricing varies by volume or customer relationship
- **Services**: Consultation required before quoting
- **Complex Products**: Multiple variables affect final price
- **Lead Generation**: Capture customer information before revealing pricing

## Standard Mode

**Best for:** Traditional e-commerce, retail businesses, standard product sales

### Features

- **Full WooCommerce**: All standard WooCommerce functionality enabled
- **Visible Prices**: Product prices displayed everywhere
- **Add to Cart**: Standard add-to-cart buttons and functionality
- **Cart & Checkout**: Full shopping cart and checkout process
- **Payment Gateways**: All configured payment methods available

### How It Works

Standard WooCommerce behavior with no restrictions. Perfect for traditional online stores.

## Catalog Mode

**Best for:** Product showcases, dealer locators, price transparency without direct sales

### Features

- **Visible Prices**: Product prices displayed for transparency
- **No Add to Cart**: Add-to-cart functionality hidden
- **No Checkout**: Cart and checkout pages disabled
- **Product Information**: Full product details visible
- **Price Discovery**: Customers can see pricing without purchasing

### How It Works

**On Product Archives:**
- Products display with prices
- No add-to-cart buttons
- Users can browse and see pricing

**On Single Product Pages:**
- Full product details visible
- Prices displayed
- No purchase buttons
- May include dealer locator or contact information

**Use Cases:**
- **Dealer Networks**: Show products but direct to local dealers
- **Wholesale Only**: Display catalog but require dealer account
- **Coming Soon**: Show products before launch
- **Price Transparency**: Display pricing without enabling sales

## Customization

### Changing Button Text

To customize the "Request Quote" button text in Quote Mode:

**Via Filter (recommended):**

```php
// In app/filters.php or a custom service provider
add_filter('nynaeve_quote_button_text', function($text) {
    return 'Get a Quote'; // or 'Contact Us', 'Request Pricing', etc.
});
```

### Custom Redirects

To change where cart/checkout pages redirect in Quote Mode:

```php
// Redirect to custom quote form page
add_filter('nynaeve_quote_mode_redirect_url', function($url) {
    return home_url('/request-quote/');
});
```

### Quote Button Styling

The "Request Quote" button inherits WooCommerce button styles by default. To customize:

```css
/* In resources/css/app.css */
.single-product .request-quote-button {
  @apply bg-primary text-white hover:bg-primary-dark;
  /* Add your custom styles */
}
```

### Per-Product Quote Buttons

To hide the quote button on specific products:

```php
// In app/filters.php
add_filter('nynaeve_show_quote_button', function($show, $product_id) {
    $hide_on = [123, 456]; // Product IDs to hide button
    return !in_array($product_id, $hide_on);
}, 10, 2);
```

### Custom REST API Responses

To customize the checkout API error message in Quote Mode:

```php
add_filter('nynaeve_checkout_api_error', function($error) {
    return new WP_Error(
        'checkout_disabled',
        'Please contact us for a quote.',
        ['status' => 403]
    );
});
```

## Developer Notes

### Code Location

WooCommerce integration is handled in:
- `app/setup.php` - Mode detection and setup
- `app/filters.php` - WooCommerce filter customizations
- `app/View/Composers/` - Product view composers

### Conditional Logic

Check current mode in templates:

```php
$mode = get_field('woocommerce_mode', 'option');

if ($mode === 'quote') {
    // Quote mode logic
} elseif ($mode === 'catalog') {
    // Catalog mode logic
} else {
    // Standard mode logic
}
```

### Testing

When testing mode changes:
1. Change mode in Theme Options
2. Visit a product page (not cached)
3. Test cart/checkout access
4. Clear object cache if using persistent caching

### Known Limitations

- Quote mode does not support variable products (simple products only recommended)
- Cart widget and mini-cart should be hidden in quote/catalog modes
- Some WooCommerce extensions may not respect quote mode restrictions

## Troubleshooting

### Prices Still Visible in Quote Mode

1. Check Theme Options setting is saved correctly
2. Clear any page caching (WP Rocket, W3 Total Cache, etc.)
3. Check for plugin conflicts (other WooCommerce customization plugins)
4. Verify theme is up to date

### Cart Still Accessible

1. Confirm redirect functionality is not disabled by plugin
2. Check for caching issues
3. Test in incognito/private browsing mode

### Quote Button Not Appearing

1. Verify product type is "Simple" (not Variable)
2. Check product visibility settings
3. Confirm no conflicting plugins hiding the button area

## Additional Resources

- [WooCommerce Documentation](https://woocommerce.com/documentation/)
- [WooCommerce Template Structure](https://github.com/woocommerce/woocommerce/wiki/Template-structure)
- [Sage Theme Development](https://roots.io/sage/docs/)
