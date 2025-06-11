// Simple script to add "js-enabled" class to the body tag
document.addEventListener('DOMContentLoaded', function() {
  document.body.classList.add('js-enabled');
  
  // Handle mobile navigation toggle if it exists
  const navToggle = document.querySelector('.nav-toggle');
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      const nav = document.querySelector('.site-nav');
      nav.classList.toggle('is-open');
      this.setAttribute('aria-expanded', 
        this.getAttribute('aria-expanded') === 'false' ? 'true' : 'false'
      );
    });
  }
});