import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function Edit({ attributes }) {
  const blockProps = useBlockProps({
    className: 'image-text-card',
  });

  // Template for the InnerBlocks with predefined structure
  const TEMPLATE = [
    [
      'core/image',
      {
        className: 'image-text-card__image',
        url: typeof window !== 'undefined' && window.location.origin 
          ? `${window.location.origin}/app/themes/nynaeve/resources/images/macbook-partly-opened.jpg` 
          : '',
        alt: __('Card image', 'imagewize'),
        sizeSlug: 'large',
      },
    ],
    [
      'core/group',
      {
        className: 'image-text-card__content',
        layout: { type: 'constrained' },
      },
      [
        [
          'core/heading',
          {
            className: 'image-text-card__heading',
            level: 3,
            content: __('Image and Text Card', 'imagewize'),
            placeholder: __('Add heading...', 'imagewize'),
          },
        ],
        [
          'core/paragraph',
          {
            className: 'image-text-card__body',
            content: __('I love using WordPress but traditionally it has been hard to design in. Not any more! Now, I can quickly build full page designs with beautiful patterns!', 'imagewize'),
            placeholder: __('Add your descriptive text here...', 'imagewize'),
          },
        ],
      ],
    ],
    [
      'core/group',
      {
        className: 'image-text-card__buttons',
        layout: { type: 'flex', flexWrap: 'nowrap' },
      },
      [
        [
          'core/button',
          {
            text: __('Get Started', 'imagewize'),
            url: '',
          },
        ],
        [
          'core/button',
          {
            text: __('Read More', 'imagewize'),
            url: '',
          },
        ],
      ],
    ],
  ];

  // Allowed blocks - only the ones we want in our template
  const ALLOWED_BLOCKS = [
    'core/image',
    'core/heading', 
    'core/paragraph',
    'core/button',
    'core/group',
  ];

  return (
    <div {...blockProps}>
      <InnerBlocks
        template={TEMPLATE}
        allowedBlocks={ALLOWED_BLOCKS}
        // templateLock="insert"
      />
    </div>
  );
}