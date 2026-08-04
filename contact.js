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
  
  const form = document.getElementById("contactForm");
const success = document.getElementById("formSuccess");

form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form)
    });

    if (response.ok) {
        success.innerHTML = "✅ Thank you! Your message has been sent successfully.";
        success.style.color = "#16a34a";
        form.reset();
    } else {
        success.innerHTML = "❌ Failed to send your message. Please try again.";
        success.style.color = "#dc2626";
    }
});
  function showFieldError(field, message) {
    const errorEl = form.querySelector(`[data-error-for="${field.name}"]`);
    if (errorEl) errorEl.textContent = message || '';
    field.classList.toggle('invalid', !!message);
  }

  function validateField(field) {
    const rule = validators[field.name];
    if (!rule) return true;
    const result = rule(field.value);
    if (result === true) {
      showFieldError(field, '');
      return true;
    }
    showFieldError(field, result);
    return false;
  }

  if (form) {
    ['name', 'phone', 'email', 'subject', 'message'].forEach((fieldName) => {
      const field = form.elements[fieldName];
      if (!field) return;
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.classList.contains('invalid')) validateField(field);
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      successMsg.classList.remove('show');

      let isValid = true;
      ['name', 'phone', 'email', 'subject', 'message'].forEach((fieldName) => {
        const field = form.elements[fieldName];
        if (field && !validateField(field)) isValid = false;
      });

      if (!isValid) {
        const firstInvalid = form.querySelector('.invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const submitBtn = form.querySelector('.submit-btn');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      // Simulate network request — replace with real API call when backend is ready
      setTimeout(() => {
        successMsg.classList.add('show');
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/></svg> Send Message';
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 900);
    });
  }

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
