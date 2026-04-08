/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Save function — defines frontend output
 */
export default function Save() {
	const blockProps = useBlockProps.save( {
		className: 'wp-block-imagewize-service-intro',
	} );

	return (
		<div { ...blockProps }>
			<div className="service-intro__inner">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
