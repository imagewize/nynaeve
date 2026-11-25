/**
 * Newsletter signup: posts the form to the imagewize/v1/newsletter REST route.
 * Plain browser JS (loaded as the block's viewScript, no build step).
 */
(function () {
  function restBase() {
    var link = document.querySelector('link[rel="https://api.w.org/"]');
    var href = link ? link.getAttribute('href') : '/wp-json/';
    return href.replace(/\/?$/, '/');
  }

  function init(form) {
    var started = Date.now();
    var message = form.querySelector('.newsletter-signup__message');
    var button = form.querySelector('.newsletter-signup__button');

    function show(text, isError) {
      message.textContent = text;
      message.classList.toggle('is-error', !!isError);
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      show('', false);

      var name = form.elements.name.value.trim();
      var email = form.elements.email.value.trim();
      var consent = form.elements.consent.checked;

      if (!name || !email || !form.elements.email.checkValidity()) {
        show('Please enter your name and a valid email address.', true);
        return;
      }
      if (!consent) {
        show('Please tick the box to agree to receive the newsletter.', true);
        return;
      }

      button.disabled = true;

      fetch(restBase() + 'imagewize/v1/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name,
          email: email,
          consent: true,
          website: form.elements.website.value,
          elapsed: Date.now() - started,
          page: window.location.pathname,
        }),
      })
        .then(function (response) {
          return response.json().then(function (data) {
            return { ok: response.ok, data: data };
          });
        })
        .then(function (result) {
          if (result.ok) {
            form.classList.add('is-done');
            show(form.getAttribute('data-success'), false);
          } else {
            button.disabled = false;
            show((result.data && result.data.message) || form.getAttribute('data-error'), true);
          }
        })
        .catch(function () {
          button.disabled = false;
          show(form.getAttribute('data-error'), true);
        });
    });
  }

  document.querySelectorAll('.wp-block-imagewize-newsletter-signup .newsletter-signup__form').forEach(init);
})();
