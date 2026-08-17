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
document.addEventListener("DOMContentLoaded", function () {

  const slider = document.querySelector(".leadership-slider");

  if (!slider) return;

  const slides = slider.querySelectorAll(".leadership-slide");
  const dots = slider.querySelectorAll(".slider-dot");
  const prevBtn = slider.querySelector(".slider-prev");
  const nextBtn = slider.querySelector(".slider-next");

  let currentIndex = 0;
  let autoSlide;

  // Auto slide time: 5 seconds
  const slideInterval = 5000;


  /* ---------- Show Slide ---------- */

  function showSlide(index) {

    if (index >= slides.length) {
      currentIndex = 0;
    } else if (index < 0) {
      currentIndex = slides.length - 1;
    } else {
      currentIndex = index;
    }

    slides.forEach((slide, i) => {
      slide.classList.toggle(
        "active",
        i === currentIndex
      );
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle(
        "active",
        i === currentIndex
      );
    });
  }


  /* ---------- Next ---------- */

  function nextSlide() {
    showSlide(currentIndex + 1);
  }


  /* ---------- Previous ---------- */

  function previousSlide() {
    showSlide(currentIndex - 1);
  }


  /* ---------- Start Auto Slide ---------- */

  function startAutoSlide() {

    clearInterval(autoSlide);

    autoSlide = setInterval(function () {
      nextSlide();
    }, slideInterval);
  }


  /* ---------- Next Button ---------- */

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {

      nextSlide();

      // Restart timer after manual click
      startAutoSlide();

    });
  }


  /* ---------- Previous Button ---------- */

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {

      previousSlide();

      // Restart timer after manual click
      startAutoSlide();

    });
  }


  /* ---------- Dots ---------- */

  dots.forEach(function (dot, index) {

    dot.addEventListener("click", function () {

      showSlide(index);

      // Restart timer
      startAutoSlide();

    });

  });


  /* ---------- Pause on Hover ---------- */

  slider.addEventListener("mouseenter", function () {
    clearInterval(autoSlide);
  });


  /* ---------- Resume on Mouse Leave ---------- */

  slider.addEventListener("mouseleave", function () {
    startAutoSlide();
  });


  /* ---------- Start Slider ---------- */

  showSlide(0);
  startAutoSlide();

});