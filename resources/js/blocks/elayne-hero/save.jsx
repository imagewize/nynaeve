import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Save() {
  const blockProps = useBlockProps.save({
    className: 'wp-block-imagewize-elayne-hero',
  });

  return (
    <div {...blockProps}>
      <div className="elayne-hero__inner">
        <InnerBlocks.Content />
      </div>
    </div>
  );
}
