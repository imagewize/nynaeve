import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Save() {
  const blockProps = useBlockProps.save({
    className: 'wp-block-nynaeve-contact-section',
  });

  return (
    <div {...blockProps}>
      <div className="contact-section__inner">
        <InnerBlocks.Content />
      </div>
    </div>
  );
}
