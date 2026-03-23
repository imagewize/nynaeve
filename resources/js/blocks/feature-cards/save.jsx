import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Save() {
  const blockProps = useBlockProps.save({
    className: 'wp-block-imagewize-feature-cards',
  });

  return (
    <div {...blockProps}>
      <div className="feature-cards__inner">
        <InnerBlocks.Content />
      </div>
    </div>
  );
}
