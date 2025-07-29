<?php

namespace App\Fields;

use Log1x\AcfComposer\Builder;
use Log1x\AcfComposer\Field;

class ThemeOptions extends Field
{
    /**
     * The field group.
     */
    public function fields(): array
    {
        $themeOptions = Builder::make('theme_options');

        $themeOptions
            ->setLocation('options_page', '==', 'theme-options');

        $themeOptions
            ->addSelect('woocommerce_mode')
            ->setLabel('WooCommerce Mode')
            ->setInstructions('Choose how WooCommerce should function on your site.')
            ->setChoices([
                'quote' => 'Quote Mode - Hide prices and add-to-cart, show request quote button',
                'standard' => 'Standard Mode - Normal WooCommerce with cart and checkout',
                'catalog' => 'Catalog Mode - Show prices but hide add-to-cart buttons',
            ])
            ->setDefaultValue('quote')
            ->setRequired(false);

        return $themeOptions->build();
    }
}
