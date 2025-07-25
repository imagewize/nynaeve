/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from '@wordpress/block-editor';
import {
  PanelBody,
  RangeControl,
  SelectControl,
  Spinner,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

/**
 * Edit function that renders in the admin
 */
export default function Edit({ attributes, setAttributes }) {
  const { title, numberOfPosts, relatedBy } = attributes;
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const blockProps = useBlockProps({
    className: 'wp-block-imagewize-related-articles',
  });

  // Fetch posts from REST API
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    // Build query parameters based on relatedness type
    let queryParams = `per_page=${numberOfPosts}&_embed&status=publish`;
    
    if (relatedBy === 'recent') {
      queryParams += '&orderby=date&order=desc';
    } else {
      // For tag/category relatedness, we'll just show recent posts in editor preview
      // The actual relatedness logic will be handled on the frontend
      queryParams += '&orderby=date&order=desc';
    }

    apiFetch({
      path: `/wp/v2/posts?${queryParams}`,
    })
      .then((fetchedPosts) => {
        setPosts(fetchedPosts);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [numberOfPosts, relatedBy]);


  // Get excerpt
  const getExcerpt = (post) => {
    if (post.excerpt && post.excerpt.rendered) {
      return post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 150) + '...';
    }
    return '';
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Settings', 'imagewize')} initialOpen={true}>
          <SelectControl
            label={__('Show Articles Related By', 'imagewize')}
            value={relatedBy}
            options={[
              { label: __('Tags', 'imagewize'), value: 'tag' },
              { label: __('Categories', 'imagewize'), value: 'category' },
              { label: __('Most Recent', 'imagewize'), value: 'recent' },
            ]}
            onChange={(value) => setAttributes({ relatedBy: value })}
            help={__('Choose how to determine which articles are related to the current post.', 'imagewize')}
          />
          <RangeControl
            label={__('Number of Articles', 'imagewize')}
            value={numberOfPosts}
            onChange={(value) => setAttributes({ numberOfPosts: value })}
            min={1}
            max={20}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <RichText
          tagName="h2"
          className="related-articles-title"
          value={title}
          onChange={(value) => setAttributes({ title: value })}
          placeholder={__('Related Articles', 'imagewize')}
        />

        {isLoading && (
          <div className="related-articles-loading">
            <Spinner />
            <p>{__('Loading articles...', 'imagewize')}</p>
          </div>
        )}

        {error && (
          <div className="related-articles-error">
            <p>{__('Error loading articles: ', 'imagewize') + error}</p>
          </div>
        )}

        {!isLoading && !error && posts.length > 0 && (
          <div className="related-articles-grid">
            {posts.map((post) => (
              <article key={post.id} className="related-article-item">
                <div className="article-content">
                  <h3 className="article-title">
                    <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                  </h3>
                  {getExcerpt(post) && (
                    <p className="article-excerpt">{getExcerpt(post)}</p>
                  )}
                  <div className="article-meta">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString()}
                    </time>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {!isLoading && !error && posts.length === 0 && (
          <div className="related-articles-empty">
            <p>{__('No articles found.', 'imagewize')}</p>
          </div>
        )}
      </div>
    </>
  );
}