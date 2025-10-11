import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [
  'core/paragraph',
  'core/heading'
];

const TEMPLATE = [
  ['core/paragraph', {
    content: 'Professional Solutions',
    fontFamily: 'montserrat',
    fontSize: 'sm',
    style: {
      typography: {
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }
    },
    textColor: 'primary-accent'
  }],
  ['core/heading', {
    level: 2,
    content: 'Transform Your Website Performance',
    fontFamily: 'montserrat',
    fontSize: '5xl',
    style: {
      typography: {
        fontWeight: '800',
        lineHeight: '1.2'
      }
    },
    textColor: 'base'
  }],
  ['core/paragraph', {
    content: 'Discover how our advanced image optimization tools help reduce file sizes by up to 80% while maintaining visual quality. Speed up your website, improve SEO rankings, and deliver better user experiences across all devices.',
    fontFamily: 'open-sans',
    fontSize: 'lg',
    style: {
      typography: {
        fontWeight: '400',
        lineHeight: '1.7'
      }
    },
    textColor: 'primary-accent'
  }]
];

export default function Edit() {
  const blockProps = useBlockProps({
    className: 'page-heading-blue'
  });

  return (
    <div {...blockProps}>
      <div className="page-heading-blue__content">
        <InnerBlocks
          allowedBlocks={ALLOWED_BLOCKS}
          template={TEMPLATE}
          templateLock="all"
        />
      </div>
    </div>
  );
}
