/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Save function — defines frontend output
 */
export default function Save() {
	const blockProps = useBlockProps.save( {
		className: 'wp-block-imagewize-expect-list',
	} );

	return (
		<div { ...blockProps }>
			<div className="expect-list__inner">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
