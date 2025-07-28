/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Save function that defines output on the frontend
 * The actual content is rendered dynamically by view.js
 */
export default function Save({ attributes }) {
  const { title, numberOfPosts, relatedBy, maxCommonThreshold, maxTagsToUse, titleAlignment, headerLevel } = attributes;
  const blockProps = useBlockProps.save({
    className: 'wp-block-imagewize-related-articles',
  });
  
  return (
    <div { ...blockProps } 
         data-number-of-posts={numberOfPosts} 
         data-related-by={relatedBy}
         {...(maxCommonThreshold !== 50 && { 'data-max-common-threshold': maxCommonThreshold })}
         {...(maxTagsToUse !== 3 && { 'data-max-tags-to-use': maxTagsToUse })}>
      {React.createElement(
        `h${headerLevel}`,
        {
          className: 'related-articles-title',
          style: { textAlign: titleAlignment }
        },
        title
      )}
      <div className="related-articles-grid" id="related-articles-container">
        {/* Content will be loaded by view.js */}
        <div className="related-articles-loading">
          <p>Loading articles...</p>
        </div>
      </div>
    </div>
  );
}