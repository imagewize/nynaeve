/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks, BlockControls, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Edit function that renders in the admin
 */
export default function Edit({ attributes, setAttributes }) {
  const { contentLayout } = attributes;
  
  const blockProps = useBlockProps();
  
  // Define allowed blocks for the hero section
  const ALLOWED_BLOCKS = ['core/heading', 'core/paragraph', 'core/buttons', 'core/image', 'core/spacer', 'core/group'];
  
  // Define template structure
  const TEMPLATE = [
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
      }
    }, [
      ['core/group', { 
        layout: { type: 'flex', orientation: 'vertical' },
        style: { 
          spacing: { margin: { left: 'auto', right: 'auto' } }
        },
        // Set a max width for better readability
        backgroundColor: "transparent",
        contentSize: "800px",
      }, [
        ['core/heading', { 
          placeholder: 'Add main heading here...',
          fontSize: '8xl',
          style: { typography: { fontWeight: '100' } }
        }],
        ['core/heading', { 
          placeholder: 'Add subheading here...',
          fontSize: '3xl',
          level: 2,
          style: { typography: { fontWeight: '100' } }
        }]
      ]],
      ['core/image', { 
        aspectRatio: '16/9', 
        scale: 'cover',
        style: { 
          spacing: { margin: { left: 'auto', right: 'auto' } }
        }
      }],
      ['core/spacer', { height: '100px', width: '0px' }]
    ]],
    ['core/spacer', { height: '100px', width: '0px' }]
  ];
  
  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Layout Settings', 'imagewize')}>
          <SelectControl
            label={__('Content Layout', 'imagewize')}
            value={contentLayout}
            options={[
              { label: 'Flex', value: 'flex' },
              { label: 'Stack', value: 'stack' }
            ]}
            onChange={(newLayout) => setAttributes({ contentLayout: newLayout })}
          />
        </PanelBody>
      </InspectorControls>
      <div { ...blockProps }>
        <InnerBlocks
          allowedBlocks={ALLOWED_BLOCKS}
          template={TEMPLATE}
        />
      </div>
    </>
  );
}