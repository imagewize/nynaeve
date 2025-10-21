/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import profileImage from './assets/profile.jpg';

// Register core/image styles
wp.domReady(() => {
    if (wp.blocks.getBlockType('core/image')) {
        wp.blocks.registerBlockStyle('core/image', {
            name: 'default',
            label: 'Default'
        });
        wp.blocks.registerBlockStyle('core/image', {
            name: 'rounded',
            label: 'Rounded',
            isDefault: true
        });
    }
});

/**
 * InnerBlocks template for About Block
 */
const TEMPLATE = [
    ['core/group', {
        align: 'full',
        style: {
            color: {
                background: '#ebeced'
            }
        },
        layout: { type: 'constrained' }
    }, [
        ['core/spacer', { height: '60px' }],
        ['core/columns', { layout: { type: 'constrained' }}, [
            ['core/column', {
                width: '20%',
                style: {
                    spacing: {
                        padding: {
                            top: "1rem"
                        }
                    }
                }
            }, [
                ['core/image', {
                    className: 'is-style-rounded aligncenter',
                    url: profileImage,
                    alt: 'Profile Image',
                    style: {
                        border: {
                            width: '8px',
                            color: 'rgba(203,203,203,1)',
                            style: 'solid'
                        }
                    }
                }]
            ]],
            ['core/column', { width: '80%' }, [
                ['core/heading', {
                    fontSize: '3xl',
                    style: {
                        typography: {
                            fontFamily: 'var(--wp--preset--font-family--open-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif)',
                            fontStyle: 'normal',
                            fontWeight: '400'
                        },
                        color: {
                            text: '#000000'
                        }
                    },
                    content: 'Custom Crafted Websites & E-Commerce.'
                }],
                ['core/paragraph', {
                    fontSize: 'lg',
                    style: {
                        typography: {
                            fontFamily: 'var(--wp--preset--font-family--open-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif)',
                            lineHeight: 1.6
                        },
                        color: {
                            text: '#98999a'
                        }
                    },
                    content: 'At Imagewize, we empower SMEs and startups by delivering custom web and e-commerce solutions. With expertise in web design, development, and SEO, every project is tailored to meet your unique needs and drive success. This site is dedicated to helping businesses grow online with customized, high-performance solutions.'
                }],
                ['core/paragraph', {
                    fontSize: 'base',
                    style: {
                        typography: {
                            fontFamily: 'var(--wp--preset--font-family--open-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif)',
                            lineHeight: 2
                        },
                        color: {
                            text: '#98999a'
                        }
                    },
                    content: 'Imagewize began as a passion project in 2016 and has grown into a full-service web solutions provider. Our mission is to craft stunning websites, build powerful e-commerce platforms with WooCommerce, and implement cutting-edge SEO strategies, including technical SEO. Whether you need a custom WordPress site or a tailored WooCommerce solution, we deliver exceptional results designed to help your business thrive online.'
                }]
            ]]
        ]],
        ['core/spacer', { height: '60px' }]
    ]]
];

/**
 * Edit function that renders in the admin
 */
export default function Edit({ attributes, setAttributes }) {
    const { backgroundColor, textColor } = attributes;

    const blockProps = useBlockProps({
        className: 'alignfull'
    });

    return (
        <div {...blockProps}>
            <InnerBlocks template={TEMPLATE} />
        </div>
    );
}
