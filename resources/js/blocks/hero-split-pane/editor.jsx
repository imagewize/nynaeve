/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';

/**
 * Edit function that renders in the admin
 */
export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps();
  
  // Define allowed blocks for the hero section
  const ALLOWED_BLOCKS = ['core/heading', 'core/paragraph', 'core/buttons', 'core/image', 'core/spacer', 'core/group'];
  
  // Common elements that don't change between templates
  const HEADING_GROUP = ['core/group', { 
    layout: { type: 'flex', orientation: 'vertical' },
    style: { 
      spacing: { margin: { left: 'auto', right: 'auto' } }
    },
    backgroundColor: "transparent",
    contentSize: "800px",
  }, [
    ['core/heading', { 
      content: 'Imagewize',
      fontSize: '8xl',
      level: 1,
      style: { 
        typography: { 
          fontWeight: '100',
          lineHeight: '1.1',
          fontSize: {
            desktop: 'var(--wp--preset--font-size--8xl)', 
            tablet: 'var(--wp--preset--font-size--6xl)',  
            mobile: 'var(--wp--preset--font-size--5xl)'   
          }
        },
        color: { text: '#000000' }
      },
      className: 'hero-main-heading'
    }],
    ['core/heading', { 
      content: 'Website & Ecommerce Solutions for SME',
      fontSize: '3xl',
      level: 2,
      style: { 
        typography: { 
          fontWeight: '100',
          lineHeight: '1.3',
          fontSize: {
            desktop: 'var(--wp--preset--font-size--3xl)',  
            tablet: 'var(--wp--preset--font-size--2xl)',   
            mobile: 'var(--wp--preset--font-size--xl)'    
          }
        },
        color: { text: '#000000' }
      },
      className: 'hero-sub-heading'
    }],
  ]];

  // Both image elements with appropriate device-specific classes
  const DESKTOP_IMAGE = ['core/image', { 
    aspectRatio: '16/9', 
    scale: 'cover',
    style: { 
      spacing: { margin: { bottom: '30px' } }
    },
    className: 'hero-image-desktop',
    caption: 'Desktop Image. For mobile image switch to mobile/tablet view.'
  }];
  
  const MOBILE_IMAGE = ['core/image', { 
    aspectRatio: '1/1',
    scale: 'cover',
    style: { 
      spacing: { margin: { top: '10px' } }
    },
    className: 'hero-image-mobile',
    caption: 'Mobile Image'
  }];

  // Create image group with both images
  const IMAGES_GROUP = ['core/group', {
    className: 'hero-images-wrapper',
    layout: { type: 'default' },
  }, [
    DESKTOP_IMAGE,
    MOBILE_IMAGE
  ]];

  // Define template structure
  // Desktop layout: Text left, Image right
  const TEMPLATE_DESKTOP = [
    ['core/spacer', { height: '100px', width: '0px' }],
    ['core/group', { 
      layout: { type: 'flex', flexWrap: 'nowrap', justifyContent: 'center' },
      style: { 
        spacing: {
          padding: {
            left: "var:preset|spacing|50",
            right: "var:preset|spacing|50"
          }
        }
      },
      className: 'responsive-layout-container'
    }, [
      HEADING_GROUP,
      IMAGES_GROUP
    ]],
    ['core/spacer', { height: '100px', width: '0px' }]
  ];
  
  return (
    <div { ...blockProps }>
      <InnerBlocks
        allowedBlocks={ALLOWED_BLOCKS}
        template={TEMPLATE_DESKTOP}
      />
    </div>
  );
}