/**
 * Frontend JavaScript for the Service Hero block.
 * Animations are handled entirely via CSS.
 *
 * Aside form card: a hero button linking to the card's anchor (e.g. #check)
 * focuses the card's first field. On desktop the card is already on screen,
 * so the anchor jump barely moves and the click would otherwise look dead.
 */
document.addEventListener('click', (event) => {
  const link = event.target.closest('.wp-block-imagewize-service-hero a[href*="#"]');
  if (!link || !link.hash || link.hash.length < 2) {
    return;
  }

  const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
  if (!target || !target.matches('.service-hero__aside')) {
    return;
  }

  const field = target.querySelector(
    'input:not([type="hidden"]):not([type="submit"]), textarea, select'
  );
  if (!field) {
    return;
  }

  // The browser handles the scroll (and scroll-margin-top); only add focus.
  field.focus({ preventScroll: true });
});
