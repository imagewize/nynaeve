import.meta.glob([
  '../images/**',
  '../fonts/**',
]);

// Import our local domReady function with named import
import { domReady } from './utils/dom-ready';

/**
 * Application entrypoint
 */
domReady(async () => {
  // Product gallery
  const gallery = document.querySelector('.product-gallery');
  if (gallery) {
    const mainImage = gallery.querySelector('.main-image');
    const thumbs = gallery.querySelectorAll('.gallery-thumb');
    
    if (mainImage && thumbs.length > 0) {
      // console.log('Gallery initialized with', thumbs.length, 'thumbnails.');
      
      thumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
          const fullSrc = this.dataset.full;
          const fullSrcset = this.dataset.srcset;
          // console.log('Thumbnail clicked:', fullSrc);
          mainImage.src = fullSrc;
          mainImage.srcset = fullSrcset;
          
          // Update active state
          thumbs.forEach(t => t.classList.remove('active'));
          this.classList.add('active');
        });
      });
    } else {
      // console.error('Main image or thumbnails not found.');
    }
  } else {
    // console.error('Gallery not found.');
  }

});

// Back to top button functionality
document.addEventListener('DOMContentLoaded', function() {
  const goTop = document.getElementById('go-top');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      goTop.classList.remove('hidden');
      goTop.classList.add('is-visible');
    } else {
      goTop.classList.remove('is-visible');
      goTop.classList.add('hidden');
    }
  });
});

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
  // Helper function to handle smooth scrolling
  const smoothScrollTo = (targetId) => {
    // Special case for #top
    if (targetId === '#top') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    const headerHeight = document.querySelector('header').offsetHeight || 0;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerHeight - 20;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  // Handle all anchor links
  document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      const isHomeAnchor = this.hasAttribute('data-home-anchor');
      
      // If it's a homepage anchor and we're not on homepage, let the link work normally
      if (isHomeAnchor && !window.location.pathname.match(/^\/?$/)) {
        return;
      }
      
      // Check if the href is for the current page
      const isCurrentPage = href.startsWith('#') || 
                          href.startsWith(window.location.origin) ||
                          href.startsWith(window.location.pathname);
      
      if (!isCurrentPage) return;
      
      // Extract the hash part
      const hash = href.includes('#') ? '#' + href.split('#')[1] : null;
      if (!hash) return;
      
      e.preventDefault();
      smoothScrollTo(hash);
      
      // Update URL without scrolling
      history.pushState(null, null, hash);
    });
  });

  // Handle initial load with hash in URL
  if (window.location.hash) {
    setTimeout(() => {
      smoothScrollTo(window.location.hash);
    }, 100);
  }
});

/**
 * @see {@link https://webpack.js.org/api/hot-module-replacement/}
 */
if (import.meta.webpackHot) import.meta.webpackHot.accept(console.error);
