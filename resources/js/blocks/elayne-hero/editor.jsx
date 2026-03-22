import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

const TEMPLATE = [
  ['core/paragraph', {
    content: 'Free WordPress FSE Theme',
    className: 'elayne-eyebrow',
    align: 'center',
  }],
  ['core/heading', {
    level: 2,
    content: 'The <em>Elayne</em> Theme — Built for Modern Business',
    textAlign: 'center',
    fontFamily: 'montserrat',
    style: {
      typography: { fontWeight: '900', lineHeight: '1.1' },
    },
  }],
  ['core/paragraph', {
    content: 'A full-site editing WordPress theme crafted for agencies, consultants, and digital businesses. Beautiful patterns, a companion block library, and zero compromises on performance.',
    className: 'elayne-lead',
    align: 'center',
  }],
  ['core/buttons', {
    className: 'elayne-buttons',
    layout: { type: 'flex', justifyContent: 'center' },
  }, [
    ['core/button', { text: 'Download Free →', url: '#' }],
    ['core/button', { text: 'View Live Demo', url: '#' }],
  ]],
  ['core/columns', {
    className: 'elayne-metrics',
    isStackedOnMobile: true,
  }, [
    ['core/column', {}, [
      ['core/heading', {
        level: 3,
        content: '100+',
        textAlign: 'center',
        fontFamily: 'montserrat',
        style: { typography: { fontWeight: '900' } },
      }],
      ['core/paragraph', {
        content: 'Block Patterns',
        align: 'center',
        className: 'elayne-metric-label',
      }],
    ]],
    ['core/column', {}, [
      ['core/heading', {
        level: 3,
        content: '100%',
        textAlign: 'center',
        fontFamily: 'montserrat',
        style: { typography: { fontWeight: '900' } },
      }],
      ['core/paragraph', {
        content: 'FSE Ready',
        align: 'center',
        className: 'elayne-metric-label',
      }],
    ]],
    ['core/column', {}, [
      ['core/heading', {
        level: 3,
        content: 'PHP 8.3',
        textAlign: 'center',
        fontFamily: 'montserrat',
        style: { typography: { fontWeight: '900' } },
      }],
      ['core/paragraph', {
        content: 'Supported',
        align: 'center',
        className: 'elayne-metric-label',
      }],
    ]],
  ]],
];

export default function Edit() {
  const blockProps = useBlockProps({
    className: 'wp-block-imagewize-elayne-hero',
  });

  return (
    <div {...blockProps}>
      <div className="elayne-hero__inner">
        <InnerBlocks template={TEMPLATE} templateLock={false} />
      </div>
    </div>
  );
}
