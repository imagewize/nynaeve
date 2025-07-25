/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Save function that defines output on the frontend
 * The actual content is rendered dynamically by view.js
 */
export default function Save({ attributes }) {
  const { title, numberOfPosts, relatedBy } = attributes;
  const blockProps = useBlockProps.save({
    className: 'wp-block-imagewize-related-articles',
  });
  
  return (
    <div { ...blockProps } data-number-of-posts={numberOfPosts} data-related-by={relatedBy}>
      <h2 className="related-articles-title">{title}</h2>
      <div className="related-articles-grid" id="related-articles-container">
        {/* Content will be loaded by view.js */}
        <div className="related-articles-loading">
          <p>Loading articles...</p>
        </div>
      </div>
    </div>
  );
}