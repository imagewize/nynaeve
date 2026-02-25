/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

/**
 * Block template structure using native WordPress blocks
 */
const TEMPLATE = [
  // Row 1 - Featured card (spans 2 columns) + regular card
  ['core/group', {
    className: 'case-studies-grid',
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '2px',
      maxWidth: '1200px',
      margin: '0 auto',
      background: 'var(--wp--preset--color--border-dark)',
      border: '2px solid var(--wp--preset--color--border-dark)'
    }
  }, [
    // Featured card (spans 2 columns)
    ['core/group', {
      className: 'case-study-card featured',
      style: {
        gridColumn: 'span 2',
        background: 'var(--wp--preset--color--main)',
        padding: '3rem 2.5rem',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '400px'
      }
    }, [
      ['core/paragraph', {
        content: 'Featured',
        className: 'featured-badge',
        style: {
          display: 'inline-block',
          fontSize: '10px',
          fontWeight: '500',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          background: 'var(--wp--preset--color--primary)',
          color: 'white',
          padding: '4px 10px',
          marginBottom: '1rem'
        }
      }],
      ['core/heading', {
        level: 3,
        content: '01',
        className: 'case-number',
        textAlign: 'left',
        style: {
          typography: {
            fontSize: '4.5rem',
            fontWeight: '900',
            lineHeight: '1'
          },
          spacing: {
            margin: {
              bottom: '-0.5rem'
            }
          }
        },
        textColor: '#1e2a38',
        fontFamily: 'montserrat'
      }],
      ['core/paragraph', {
        content: 'WordPress · Netherlands',
        className: 'case-tag',
        style: {
          fontSize: '10px',
          fontWeight: '500',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          marginBottom: '0.875rem'
        },
        textColor: 'primary',
        fontFamily: 'open-sans'
      }],
      ['core/heading', {
        level: 3,
        content: 'Link Building Platform',
        className: 'case-title',
        textAlign: 'left',
        style: {
          typography: {
            fontSize: '1.5rem',
            fontWeight: '700',
            lineHeight: '1.2',
            letterSpacing: '-0.01em'
          },
          spacing: {
            margin: {
              bottom: '0.625rem'
            }
          }
        },
        textColor: 'base',
        fontFamily: 'montserrat'
      }],
      ['core/paragraph', {
        content: 'AllTheWayUp — Netherlands',
        className: 'case-client',
        style: {
          fontSize: '0.8125rem',
          marginBottom: '1.5rem',
          paddingBottom: '1.5rem',
          borderBottom: '1px solid #2a3444'
        },
        textColor: 'secondary',
        fontFamily: 'open-sans'
      }],
      ['core/paragraph', {
        content: 'Custom WordPress development with advanced project tracking, user role management, and workflow automation for a technical project management platform.',
        className: 'case-desc',
        style: {
          fontSize: '0.875rem',
          lineHeight: '1.75',
          marginBottom: '2rem',
          flex: '1'
        },
        textColor: '#a8b4c4',
        fontFamily: 'open-sans'
      }],
      ['core/list', {
        className: 'case-features',
        style: {
          listStyle: 'none',
          marginBottom: '2rem'
        }
      }, [
        ['core/list-item', {
          content: 'Custom project management dashboard',
          style: {
            fontSize: '0.8125rem',
            padding: '6px 0',
            paddingLeft: '18px',
            position: 'relative',
            lineHeight: '1.5'
          },
          textColor: '#7a8ea0',
          fontFamily: 'open-sans'
        }],
        ['core/list-item', {
          content: 'Advanced user role management',
          style: {
            fontSize: '0.8125rem',
            padding: '6px 0',
            paddingLeft: '18px',
            position: 'relative',
            lineHeight: '1.5'
          },
          textColor: '#7a8ea0',
          fontFamily: 'open-sans'
        }],
        ['core/list-item', {
          content: 'Streamlined workflow automation',
          style: {
            fontSize: '0.8125rem',
            padding: '6px 0',
            paddingLeft: '18px',
            position: 'relative',
            lineHeight: '1.5'
          },
          textColor: '#7a8ea0',
          fontFamily: 'open-sans'
        }]
      ]],
      ['core/paragraph', {
        content: 'Visit allthewayup.nl',
        className: 'case-link',
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.8125rem',
          fontWeight: '500',
          textDecoration: 'none',
          letterSpacing: '0.04em',
          marginTop: 'auto'
        },
        textColor: 'primary-accent'
      }]
    ]],
    
    // Regular card
    ['core/group', {
      className: 'case-study-card',
      style: {
        background: 'var(--wp--preset--color--base)',
        padding: '3rem 2.5rem',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '400px'
      }
    }, [
      ['core/heading', {
        level: 3,
        content: '02',
        className: 'case-number',
        textAlign: 'left',
        style: {
          typography: {
            fontSize: '4.5rem',
            fontWeight: '900',
            lineHeight: '1'
          },
          spacing: {
            margin: {
              bottom: '-0.5rem'
            }
          }
        },
        textColor: 'border-light',
        fontFamily: 'montserrat'
      }],
      ['core/paragraph', {
        content: 'Research · International',
        className: 'case-tag',
        style: {
          fontSize: '10px',
          fontWeight: '500',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          marginBottom: '0.875rem'
        },
        textColor: 'primary',
        fontFamily: 'open-sans'
      }],
      ['core/heading', {
        level: 3,
        content: 'Research Platform Development',
        className: 'case-title',
        textAlign: 'left',
        style: {
          typography: {
            fontSize: '1.5rem',
            fontWeight: '700',
            lineHeight: '1.2',
            letterSpacing: '-0.01em'
          },
          spacing: {
            margin: {
              bottom: '0.625rem'
            }
          }
        },
        textColor: 'main',
        fontFamily: 'montserrat'
      }],
      ['core/paragraph', {
        content: 'DrugHunter — International',
        className: 'case-client',
        style: {
          fontSize: '0.8125rem',
          marginBottom: '1.5rem',
          paddingBottom: '1.5rem',
          borderBottom: '1px solid var(--wp--preset--color--border-light)'
        },
        textColor: 'main-accent',
        fontFamily: 'open-sans'
      }],
      ['core/paragraph', {
        content: 'Senior-level WordPress development with custom database solutions, complex data visualization, and enhanced UX for a high-traffic international research platform.',
        className: 'case-desc',
        style: {
          fontSize: '0.875rem',
          lineHeight: '1.75',
          marginBottom: '2rem',
          flex: '1'
        },
        textColor: 'main-accent',
        fontFamily: 'open-sans'
      }],
      ['core/list', {
        className: 'case-features',
        style: {
          listStyle: 'none',
          marginBottom: '2rem'
        }
      }, [
        ['core/list-item', {
          content: 'Advanced research data visualization',
          style: {
            fontSize: '0.8125rem',
            padding: '6px 0',
            paddingLeft: '18px',
            position: 'relative',
            lineHeight: '1.5'
          },
          textColor: 'main-accent',
          fontFamily: 'open-sans'
        }],
        ['core/list-item', {
          content: 'Custom database integration',
          style: {
            fontSize: '0.8125rem',
            padding: '6px 0',
            paddingLeft: '18px',
            position: 'relative',
            lineHeight: '1.5'
          },
          textColor: 'main-accent',
          fontFamily: 'open-sans'
        }],
        ['core/list-item', {
          content: 'Enhanced UX for researchers',
          style: {
            fontSize: '0.8125rem',
            padding: '6px 0',
            paddingLeft: '18px',
            position: 'relative',
            lineHeight: '1.5'
          },
          textColor: 'main-accent',
          fontFamily: 'open-sans'
        }]
      ]],
      ['core/paragraph', {
        content: 'Visit drughunter.com',
        className: 'case-link',
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.8125rem',
          fontWeight: '500',
          textDecoration: 'none',
          letterSpacing: '0.04em',
          marginTop: 'auto'
        },
        textColor: 'main'
      }]
    ]]
  ]],
  
  // Row 2 - Three regular cards
  ['core/group', {
    className: 'case-studies-grid case-studies-grid-2',
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '2px',
      maxWidth: '1200px',
      margin: '2px auto 0',
      background: 'var(--wp--preset--color--border-dark)',
      border: '2px solid var(--wp--preset--color--border-dark)',
      borderTop: 'none'
    }
  }, [
    // Card 3
    ['core/group', {
      className: 'case-study-card',
      style: {
        background: 'var(--wp--preset--color--base)',
        padding: '3rem 2.5rem',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '400px'
      }
    }, [
      ['core/heading', {
        level: 3,
        content: '03',
        className: 'case-number',
        textAlign: 'left',
        style: {
          typography: {
            fontSize: '4.5rem',
            fontWeight: '900',
            lineHeight: '1'
          },
          spacing: {
            margin: {
              bottom: '-0.5rem'
            }
          }
        },
        textColor: 'border-light',
        fontFamily: 'montserrat'
      }],
      ['core/paragraph', {
        content: 'eCommerce · Health & Wellness',
        className: 'case-tag',
        style: {
          fontSize: '10px',
          fontWeight: '500',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          marginBottom: '0.875rem'
        },
        textColor: 'primary',
        fontFamily: 'open-sans'
      }],
      ['core/heading', {
        level: 3,
        content: 'WordPress to Shopify Migration',
        className: 'case-title',
        textAlign: 'left',
        style: {
          typography: {
            fontSize: '1.5rem',
            fontWeight: '700',
            lineHeight: '1.2',
            letterSpacing: '-0.01em'
          },
          spacing: {
            margin: {
              bottom: '0.625rem'
            }
          }
        },
        textColor: 'main',
        fontFamily: 'montserrat'
      }],
      ['core/paragraph', {
        content: 'Rocket Pure — Health & Wellness, International',
        className: 'case-client',
        style: {
          fontSize: '0.8125rem',
          marginBottom: '1.5rem',
          paddingBottom: '1.5rem',
          borderBottom: '1px solid var(--wp--preset--color--border-light)'
        },
        textColor: 'main-accent',
        fontFamily: 'open-sans'
      }],
      ['core/paragraph', {
        content: 'Full WooCommerce store build with 100+ SKUs, payment gateways, and international shipping — followed by a seamless Shopify migration preserving SEO rankings.',
        className: 'case-desc',
        style: {
          fontSize: '0.875rem',
          lineHeight: '1.75',
          marginBottom: '2rem',
          flex: '1'
        },
        textColor: 'main-accent',
        fontFamily: 'open-sans'
      }],
      ['core/list', {
        className: 'case-features',
        style: {
          listStyle: 'none',
          marginBottom: '2rem'
        }
      }, [
        ['core/list-item', {
          content: 'Custom WooCommerce store build',
          style: {
            fontSize: '0.8125rem',
            padding: '6px 0',
            paddingLeft: '18px',
            position: 'relative',
            lineHeight: '1.5'
          },
          textColor: 'main-accent',
          fontFamily: 'open-sans'
        }],
        ['core/list-item', {
          content: 'SEO-safe platform migration',
          style: {
            fontSize: '0.8125rem',
            padding: '6px 0',
            paddingLeft: '18px',
            position: 'relative',
            lineHeight: '1.5'
          },
          textColor: 'main-accent',
          fontFamily: 'open-sans'
        }],
        ['core/list-item', {
          content: 'International payment & shipping setup',
          style: {
            fontSize: '0.8125rem',
            padding: '6px 0',
            paddingLeft: '18px',
            position: 'relative',
            lineHeight: '1.5'
          },
          textColor: 'main-accent',
          fontFamily: 'open-sans'
        }]
      ]],
      ['core/paragraph', {
        content: 'Visit rocketpure.com',
        className: 'case-link',
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.8125rem',
          fontWeight: '500',
          textDecoration: 'none',
          letterSpacing: '0.04em',
          marginTop: 'auto'
        },
        textColor: 'main'
      }]
    ]],
    
    // Card 4
    ['core/group', {
      className: 'case-study-card',
      style: {
        background: 'var(--wp--preset--color--base)',
        padding: '3rem 2.5rem',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '400px'
      }
    }, [
      ['core/heading', {
        level: 3,
        content: '04',
        className: 'case-number',
        textAlign: 'left',
        style: {
          typography: {
            fontSize: '4.5rem',
            fontWeight: '900',
            lineHeight: '1'
          },
          spacing: {
            margin: {
              bottom: '-0.5rem'
            }
          }
        },
        textColor: 'border-light',
        fontFamily: 'montserrat'
      }],
      ['core/paragraph', {
        content: 'Performance · Corporate',
        className: 'case-tag',
        style: {
          fontSize: '10px',
          fontWeight: '500',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          marginBottom: '0.875rem'
        },
        textColor: 'primary',
        fontFamily: 'open-sans'
      }],
      ['core/heading', {
        level: 3,
        content: 'Speed Optimization',
        className: 'case-title',
        textAlign: 'left',
        style: {
          typography: {
            fontSize: '1.5rem',
            fontWeight: '700',
            lineHeight: '1.2',
            letterSpacing: '-0.01em'
          },
          spacing: {
            margin: {
              bottom: '0.625rem'
            }
          }
        },
        textColor: 'main',
        fontFamily: 'montserrat'
      }],
      ['core/paragraph', {
        content: 'Jochen Schweizer Corporate — Germany',
        className: 'case-client',
        style: {
          fontSize: '0.875rem',
          marginBottom: '1.5rem',
          paddingBottom: '1.5rem',
          borderBottom: '1px solid var(--wp--preset--color--border-light)'
        },
        textColor: 'main-accent',
        fontFamily: 'open-sans'
      }],
      ['core/paragraph', {
        content: 'Elementor-based corporate website performance overhaul with font-display optimisation, eliminating over 1,500ms of mobile render-blocking time and achieving measurable Core Web Vitals gains.',
        className: 'case-desc',
        style: {
          fontSize: '1rem',
          lineHeight: '1.8',
          marginBottom: '2rem',
          flex: '1'
        },
        textColor: 'main-accent',
        fontFamily: 'open-sans'
      }],
      ['core/list', {
        className: 'case-features',
        style: {
          listStyle: 'none',
          marginBottom: '2rem'
        }
      }, [
        ['core/list-item', {
          content: 'Font-display swap for all text fonts',
          style: {
            fontSize: '0.875rem',
            padding: '6px 0',
            paddingLeft: '18px',
            position: 'relative',
            lineHeight: '1.8'
          },
          textColor: 'main-accent',
          fontFamily: 'open-sans'
        }],
        ['core/list-item', {
          content: 'Resource preconnect tuning',
          style: {
            fontSize: '0.875rem',
            padding: '6px 0',
            paddingLeft: '18px',
            position: 'relative',
            lineHeight: '1.8'
          },
          textColor: 'main-accent',
          fontFamily: 'open-sans'
        }],
        ['core/list-item', {
          content: 'Mobile Core Web Vitals improvements',
          style: {
            fontSize: '0.875rem',
            padding: '6px 0',
            paddingLeft: '18px',
            position: 'relative',
            lineHeight: '1.8'
          },
          textColor: 'main-accent',
          fontFamily: 'open-sans'
        }]
      ]],
      ['core/paragraph', {
        content: 'Visit jochen-schweizer-corporate.de',
        className: 'case-link',
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.875rem',
          fontWeight: '500',
          textDecoration: 'none',
          letterSpacing: '0.04em',
          marginTop: 'auto'
        },
        textColor: 'main'
      }]
    ]],
    
    // Card 5
    ['core/group', {
      className: 'case-study-card',
      style: {
        background: 'var(--wp--preset--color--base)',
        padding: '3rem 2.5rem',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '400px'
      }
    }, [
      ['core/heading', {
        level: 3,
        content: '05',
        className: 'case-number',
        textAlign: 'left',
        style: {
          typography: {
            fontSize: '4.5rem',
            fontWeight: '900',
            lineHeight: '1'
          },
          spacing: {
            margin: {
              bottom: '-0.5rem'
            }
          }
        },
        textColor: 'border-light',
        fontFamily: 'montserrat'
      }],
      ['core/paragraph', {
        content: 'eCommerce · WooCommerce',
        className: 'case-tag',
        style: {
          fontSize: '10px',
          fontWeight: '500',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          marginBottom: '0.875rem'
        },
        textColor: 'primary',
        fontFamily: 'open-sans'
      }],
      ['core/heading', {
        level: 3,
        content: 'WooCommerce Store',
        className: 'case-title',
        textAlign: 'left',
        style: {
          typography: {
            fontSize: '1.5rem',
            fontWeight: '700',
            lineHeight: '1.2',
            letterSpacing: '-0.01em'
          },
          spacing: {
            margin: {
              bottom: '0.625rem'
            }
          }
        },
        textColor: 'main',
        fontFamily: 'montserrat'
      }],
      ['core/paragraph', {
        content: 'Client — Retail',
        className: 'case-client',
        style: {
          fontSize: '0.8125rem',
          marginBottom: '1.5rem',
          paddingBottom: '1.5rem',
          borderBottom: '1px solid var(--wp--preset--color--border-light)'
        },
        textColor: 'main-accent',
        fontFamily: 'open-sans'
      }],
      ['core/paragraph', {
        content: 'High-performance WooCommerce build with advanced product filtering, subscription management, and custom checkout flow optimized for conversion.',
        className: 'case-desc',
        style: {
          fontSize: '0.875rem',
          lineHeight: '1.75',
          marginBottom: '2rem',
          flex: '1'
        },
        textColor: 'main-accent',
        fontFamily: 'open-sans'
      }],
      ['core/list', {
        className: 'case-features',
        style: {
          listStyle: 'none',
          marginBottom: '2rem'
        }
      }, [
        ['core/list-item', {
          content: 'Advanced product filtering',
          style: {
            fontSize: '0.8125rem',
            padding: '6px 0',
            paddingLeft: '18px',
            position: 'relative',
            lineHeight: '1.5'
          },
          textColor: 'main-accent',
          fontFamily: 'open-sans'
        }],
        ['core/list-item', {
          content: 'Subscription management',
          style: {
            fontSize: '0.8125rem',
            padding: '6px 0',
            paddingLeft: '18px',
            position: 'relative',
            lineHeight: '1.5'
          },
          textColor: 'main-accent',
          fontFamily: 'open-sans'
        }],
        ['core/list-item', {
          content: 'Checkout conversion optimization',
          style: {
            fontSize: '0.8125rem',
            padding: '6px 0',
            paddingLeft: '18px',
            position: 'relative',
            lineHeight: '1.5'
          },
          textColor: 'main-accent',
          fontFamily: 'open-sans'
        }]
      ]],
      ['core/paragraph', {
        content: 'View project',
        className: 'case-link',
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.8125rem',
          fontWeight: '500',
          textDecoration: 'none',
          letterSpacing: '0.04em',
          marginTop: 'auto'
        },
        textColor: 'main'
      }]
    ]]
  ]]
];

/**
 * Edit function for the Case Studies block
 */
export default function Edit({ attributes, setAttributes }) {
  const { eyebrow, title, subtitle, align } = attributes;
  
  const blockProps = useBlockProps({
    className: `align${align}`,
  });

  return (
    <Fragment>
      <InspectorControls>
        <PanelBody title={__('Case Studies Settings', 'imagewize')}>
          <TextControl
            label={__('Eyebrow Text', 'imagewize')}
            value={eyebrow}
            onChange={(value) => setAttributes({ eyebrow: value })}
          />
          <TextControl
            label={__('Title', 'imagewize')}
            value={title}
            onChange={(value) => setAttributes({ title: value })}
          />
          <TextControl
            label={__('Subtitle', 'imagewize')}
            value={subtitle}
            onChange={(value) => setAttributes({ subtitle: value })}
          />
        </PanelBody>
      </InspectorControls>
      
      <div {...blockProps}>
        <div className="case-studies-header">
          <span className="case-studies-eyebrow">{eyebrow}</span>
          <RichText
            tagName="h2"
            className="case-studies-title"
            value={title}
            onChange={(value) => setAttributes({ title: value })}
            placeholder={__('Enter title...', 'imagewize')}
          />
          <RichText
            tagName="p"
            className="case-studies-subtitle"
            value={subtitle}
            onChange={(value) => setAttributes({ subtitle: value })}
            placeholder={__('Enter subtitle...', 'imagewize')}
          />
        </div>
        
        <div className="case-studies-grid-container">
          <InnerBlocks template={TEMPLATE} templateLock="false" />
        </div>
      </div>
    </Fragment>
  );
}
