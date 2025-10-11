import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Save() {
  const blockProps = useBlockProps.save({
    className: 'page-heading-blue'
  });

  return (
    <div {...blockProps}>
      <div className="page-heading-blue__content">
        <InnerBlocks.Content />
      </div>
    </div>
  );
}
