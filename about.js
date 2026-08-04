// ===========================================================
// Keyline Properties — About Us Page Interactions
// ===========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Animated stat counters ---------- */
  const counters = document.querySelectorAll('[data-count]');

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value = Math.round(target * eased);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  /* ---------- Testimonial slider dots (3 static cards, dots for visual pagination) ---------- */
  const dots = document.querySelectorAll('.testimonials-dots span');
  const testimonialTrack = document.querySelector('.testimonials-grid');

  if (dots.length && testimonialTrack) {
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        dots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        // Simple highlight-pulse feedback on the corresponding card set
        testimonialTrack.style.transition = 'opacity 0.25s ease';
        testimonialTrack.style.opacity = '0.4';
        setTimeout(() => { testimonialTrack.style.opacity = '1'; }, 200);
      });
    });
  }

});
