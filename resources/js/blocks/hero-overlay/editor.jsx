/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { 
  useBlockProps, 
  InnerBlocks,
  InspectorControls,
  PanelColorSettings 
} from '@wordpress/block-editor';
import { 
  Panel, 
  PanelBody 
} from '@wordpress/components';

/**
 * Edit function that renders in the admin
 */
export default function Edit({ attributes, setAttributes }) {
  const { overlayColor } = attributes;
  const blockProps = useBlockProps();
  
  // Define the template structure with locked content
  const TEMPLATE = [
    ['core/columns', { className: 'hero-columns', spacing: { blockGap: 0 } }, [
      ['core/column', { className: 'hero-image-column', spacing: { padding: 0, margin: 0 } }, [
        ['core/image', { className: 'hero-image', sizeSlug: 'full' }]
      ]],
      ['core/column', { 
        className: 'hero-content-column', 
        backgroundColor: 'sky-blue',
        textColor: 'white',
        spacing: { padding: { top: '2rem', bottom: '2rem', left: '2rem', right: '2rem' }, margin: 0 }
      }, [
        ['core/heading', { 
          content: 'Smart Web Design for Growing Brands',
          className: 'hero-heading',
          level: 2,
          textColor: 'white'
        }],
        ['core/paragraph', { 
          content: 'Imagewize builds clean, responsive websites tailored for businesses and e-commerce.',
          className: 'hero-paragraph',
          textColor: 'white'
        }]
      ]]
    ]]
  ];

  return (
    <>
      <InspectorControls>
        <Panel>
          <PanelBody title={__('Overlay Settings', 'imagewize')}>
            <PanelColorSettings
              title={__('Overlay Color', 'imagewize')}
              colorSettings={[
                {
                  value: overlayColor,
                  onChange: (value) => setAttributes({ overlayColor: value }),
                  label: __('Overlay Color', 'imagewize'),
                  disableCustomColors: true
                }
              ]}
            />
          </PanelBody>
        </Panel>
      </InspectorControls>
      
      <div { ...blockProps } style={{ '--overlay-color': overlayColor }}>
        <InnerBlocks
          template={TEMPLATE}
          templateLock="all"
        />
      </div>
    </>
  );
}