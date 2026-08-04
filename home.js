// ===========================================================
// Keyline Properties — Home Page Interactions
// ===========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a link is tapped (mobile)
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Search Properties form ---------- */
  const searchForm = document.getElementById('searchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const type = document.getElementById('propType').value;
      const location = document.getElementById('propLocation').value;
      const budget = document.getElementById('propBudget').value;
      // In a full build this would redirect to properties.html with query params
      const params = new URLSearchParams({ type, location, budget });
      window.location.href = `properties.html?${params.toString()}`;
    });
  }

  /* ---------- Testimonial slider (auto + dots) ---------- */
  const testimonials = [
    {
      quote: "Keyline Properties helped us find our dream home in the perfect location. The entire process was transparent and their team is very professional.",
      author: "Ramesh & Family",
      project: "Keyline Grandeur Villas"
    },
    {
      quote: "From the first site visit to registration, everything was smooth. Their DTCP-approved plots gave us complete peace of mind.",
      author: "Priya Narayanan",
      project: "Keyline Premium Plots"
    },
    {
      quote: "Great investment and even better after-sales support. Keyline truly stands by their promise of value for vision.",
      author: "Arjun & Meera",
      project: "Keyline Heights"
    }
  ];

  let currentTestimonial = 0;
  const quoteEl = document.querySelector('[data-testimonial-quote]');
  const authorEl = document.querySelector('[data-testimonial-author]');
  const projectEl = document.querySelector('[data-testimonial-project]');
  const dots = document.querySelectorAll('.dots span');

  function renderTestimonial(index) {
    if (!quoteEl) return;
    const t = testimonials[index];
    quoteEl.textContent = t.quote;
    authorEl.textContent = `– ${t.author}`;
    projectEl.textContent = t.project;
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      currentTestimonial = i;
      renderTestimonial(currentTestimonial);
    });
  });

  if (quoteEl) {
    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      renderTestimonial(currentTestimonial);
    }, 6000);
  }

  /* ---------- Newsletter subscribe ---------- */
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const msg = document.getElementById('newsletterMsg');
      const email = emailInput.value.trim();
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!isValid) {
        msg.textContent = 'Please enter a valid email address.';
        msg.style.color = '#E86A6A';
        return;
      }
      msg.textContent = 'Thanks for subscribing! Watch your inbox for updates.';
      msg.style.color = '#D9A441';
      newsletterForm.reset();
    });
  }

  /* ---------- Scroll reveal animations ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Header shrink + Back-to-top button ---------- */
  const toTopBtn = document.querySelector('.to-top');

  window.addEventListener('scroll', () => {
    if (toTopBtn) {
      toTopBtn.classList.toggle('show', window.scrollY > 500);
    }
  });

  if (toTopBtn) {
    toTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Active nav link on load ---------- */
  const navLinks = document.querySelectorAll('.main-nav a');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === 'home.html' || link.getAttribute('href') === '#home') {
      link.classList.add('active');
    }
  });

});
