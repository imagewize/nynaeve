/**
 * View script for the Related Articles block.
 * 
 * This file handles loading the articles dynamically on the frontend
 * using the WordPress REST API.
 */

(function() {
  // Function to get tags with their usage counts
  async function getTagsWithCounts(tagIds) {
    if (!tagIds || tagIds.length === 0) return [];
    
    try {
      const response = await fetch(`/wp-json/wp/v2/tags?include=${tagIds.join(',')}&per_page=100`);
      if (!response.ok) return [];
      
      const tags = await response.json();
      return tags.map(tag => ({
        id: tag.id,
        name: tag.name,
        count: tag.count
      }));
    } catch (error) {
      console.error('Error fetching tag counts:', error);
      return [];
    }
  }

  // Function to select meaningful tags based on specificity
  function selectMeaningfulTags(tagsWithCounts, maxCommonThreshold = 50, maxTags = 3) {
    if (!tagsWithCounts || tagsWithCounts.length === 0) return [];
    
    // 1. Filter out overly common tags
    const meaningfulTags = tagsWithCounts.filter(tag => tag.count <= maxCommonThreshold);
    
    // 2. Sort by specificity (lowest count first = most specific)
    meaningfulTags.sort((a, b) => a.count - b.count);
    
    // 3. Return top N most specific tags
    return meaningfulTags.slice(0, maxTags);
  }

  // Function to get the current post ID from various sources
  function getCurrentPostId() {
    // Method 1: Check if WordPress localized the post ID
    if (typeof wp !== 'undefined' && wp.data && wp.data.select) {
      const postId = wp.data.select('core/editor')?.getCurrentPostId();
      if (postId) return postId;
    }
    
    // Method 2: Look for post ID in body class (common WordPress pattern)
    const bodyClasses = document.body.className;
    const postIdMatch = bodyClasses.match(/postid-(\d+)/);
    if (postIdMatch) return parseInt(postIdMatch[1]);
    
    // Method 3: Check meta tags
    const ogUrlMeta = document.querySelector('meta[property="og:url"]');
    if (ogUrlMeta) {
      const urlMatch = ogUrlMeta.content.match(/\?p=(\d+)/);
      if (urlMatch) return parseInt(urlMatch[1]);
    }
    
    // Method 4: Check canonical link for post ID pattern
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      const urlMatch = canonical.href.match(/\?p=(\d+)/);
      if (urlMatch) return parseInt(urlMatch[1]);
    }
    
    // Method 5: Try to extract from URL
    const pathArray = window.location.pathname.split('/').filter(Boolean);
    if (pathArray.length > 0) {
      // This is a fallback and might not work for all permalink structures
      // We'll rely on the WordPress REST API to find the post by slug
      return null; // Will trigger a different approach
    }
    
    return null;
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Select all instances of this block on the page
    const blocks = document.querySelectorAll('.wp-block-imagewize-related-articles');
  
    // Function to fetch and display articles
    async function loadArticles(block) {
      const container = block.querySelector('#related-articles-container');
      const numberOfPosts = block.getAttribute('data-number-of-posts') || 10;
      const relatedBy = block.getAttribute('data-related-by') || 'tag';
      const maxCommonThreshold = parseInt(block.getAttribute('data-max-common-threshold')) || 50;
      const maxTagsToUse = parseInt(block.getAttribute('data-max-tags-to-use')) || 3;
      
      try {
        let apiUrl;
        
        if (relatedBy === 'recent') {
          // Just fetch recent posts
          apiUrl = `/wp-json/wp/v2/posts?per_page=${numberOfPosts}&_embed&status=publish&orderby=date&order=desc`;
        } else {
          // For tag/category relatedness, we need to get the current post's context
          const currentPostId = getCurrentPostId();
          
          if (!currentPostId) {
            // Fallback to recent posts if we can't determine current post
            apiUrl = `/wp-json/wp/v2/posts?per_page=${numberOfPosts}&_embed&status=publish&orderby=date&order=desc`;
          } else {
            // First, get the current post's tags or categories
            const currentPost = await fetch(`/wp-json/wp/v2/posts/${currentPostId}`);
            const postData = await currentPost.json();
            
            let relatedTerms = [];
            
            if (relatedBy === 'tag' && postData.tags && postData.tags.length > 0) {
              // Get tags with their usage counts
              const tagsWithCounts = await getTagsWithCounts(postData.tags);
              
              // Select meaningful tags based on specificity
              const meaningfulTags = selectMeaningfulTags(tagsWithCounts, maxCommonThreshold, maxTagsToUse);
              
              if (meaningfulTags.length > 0) {
                relatedTerms = meaningfulTags.map(tag => tag.id);
                console.log('Selected meaningful tags:', meaningfulTags.map(t => `${t.name} (${t.count} posts)`));
              } else {
                // Fallback: if no meaningful tags, use the least common ones
                if (tagsWithCounts.length > 0) {
                  tagsWithCounts.sort((a, b) => a.count - b.count);
                  relatedTerms = tagsWithCounts.slice(0, 2).map(tag => tag.id);
                  console.log('Using fallback tags:', tagsWithCounts.slice(0, 2).map(t => `${t.name} (${t.count} posts)`));
                }
              }
            } else if (relatedBy === 'category' && postData.categories && postData.categories.length > 0) {
              relatedTerms = postData.categories;
            }
            
            if (relatedTerms.length > 0) {
              // Build query for posts with matching tags/categories, excluding current post
              const termParam = relatedBy === 'tag' ? 'tags' : 'categories';
              apiUrl = `/wp-json/wp/v2/posts?per_page=${numberOfPosts}&_embed&status=publish&exclude=${currentPostId}&${termParam}=${relatedTerms.join(',')}&orderby=date&order=desc`;
            } else {
              // Fallback to recent posts if no matching terms
              apiUrl = `/wp-json/wp/v2/posts?per_page=${numberOfPosts}&_embed&status=publish&exclude=${currentPostId}&orderby=date&order=desc`;
            }
          }
        }
        
        // Fetch posts from WordPress REST API
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        
        const posts = await response.json();
        
        // Clear loading message
        container.innerHTML = '';
        
        if (posts.length === 0) {
          container.innerHTML = '<p class="no-articles">No articles found.</p>';
          return;
        }
        
        // Create articles HTML
        posts.forEach(post => {
          const article = document.createElement('article');
          article.className = 'related-article-item';
          
          
          // Get excerpt
          let excerpt = '';
          if (post.excerpt && post.excerpt.rendered) {
            const cleanExcerpt = post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 150);
            excerpt = `<p class="article-excerpt">${cleanExcerpt}...</p>`;
          }
          
          // Format date
          const postDate = new Date(post.date).toLocaleDateString();
          
          // Build article HTML
          article.innerHTML = `
            <div class="article-content">
              <h3 class="article-title">
                <a href="${post.link}">${post.title.rendered}</a>
              </h3>
              ${excerpt}
              <div class="article-meta">
                <time datetime="${post.date}">${postDate}</time>
              </div>
            </div>
          `;
          
          container.appendChild(article);
        });
        
      } catch (error) {
        console.error('Error loading articles:', error);
        container.innerHTML = '<p class="articles-error">Error loading articles. Please try again later.</p>';
      }
    }
  
    // Initialize each block found
    if (blocks.length) {
      blocks.forEach(block => {
        loadArticles(block);
      });
    }
  });
})();