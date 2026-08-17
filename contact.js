document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile menu toggle ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      menuToggle.classList.toggle('active', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  /* ---------- Contact form validation ---------- */
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');

  const validators = {
    name: (v) => v.trim().length >= 2 || 'Please enter your full name.',
    phone: (v) => /^[0-9+\-\s()]{7,15}$/.test(v.trim()) || 'Please enter a valid phone number.',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Please enter a valid email address.',
    subject: (v) => v.trim().length >= 3 || 'Please enter a subject.',
    message: (v) => v.trim().length >= 10 || 'Message should be at least 10 characters.'
  };
  
  /* ---------- Newsletter form ---------- */
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const btn = newsletterForm.querySelector('button');
      if (!emailInput.value.trim()) return;
      btn.textContent = 'Subscribed!';
      newsletterForm.reset();
      setTimeout(() => { btn.textContent = 'Subscribe'; }, 2500);
    });
  }

});
