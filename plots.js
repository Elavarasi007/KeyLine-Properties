// ===========================================================
// Keyline Properties — Plots Page (progressive enhancement JS)
// The page works fully without this file. This just adds:
//   1. Wishlist heart toggle (saved in localStorage)
//   2. Back-to-top button show/hide + smooth scroll
// ===========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Wishlist ---------- */
  const wishlist = new Set(JSON.parse(localStorage.getItem('keyline_wishlist') || '[]'));

  function paintButton(btn, id) {
    const isActive = wishlist.has(id);
    btn.classList.toggle('active', isActive);
    btn.querySelector('svg').setAttribute('fill', isActive ? 'currentColor' : 'none');
  }

  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    const id = Number(btn.dataset.id);

    // reflect saved state on load
    paintButton(btn, id);

    btn.addEventListener('click', () => {
      if (wishlist.has(id)) {
        wishlist.delete(id);
      } else {
        wishlist.add(id);
      }
      localStorage.setItem('keyline_wishlist', JSON.stringify([...wishlist]));
      paintButton(btn, id);
    });
  });

  /* ---------- Back to top ---------- */
  const toTopBtn = document.getElementById('toTopBtn');

  if (toTopBtn) {
    window.addEventListener('scroll', () => {
      toTopBtn.classList.toggle('show', window.scrollY > 400);
    });

    toTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
