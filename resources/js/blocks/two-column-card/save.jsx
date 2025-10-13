import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Save() {
  const blockProps = useBlockProps.save({
    className: 'two-column-card'
  });

  return (
    <div {...blockProps}>
      <InnerBlocks.Content />
    </div>
  );
}
