// ============================================
// STORYSTUDIOS — site.js
// Shared across all marketing pages
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- NAV SCROLL STATE ----
  const nav = document.getElementById('site-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // ---- SCROLL REVEAL ----
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const ro = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const siblings = Array.from(entry.target.parentElement?.children || []);
        const idx = siblings.filter(s => s.classList.contains('reveal')).indexOf(entry.target);
        const delay = Math.min(idx * 70, 350);
        setTimeout(() => entry.target.classList.add('visible'), delay);
        ro.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
    revealEls.forEach(el => ro.observe(el));
  }

  // ---- HERO SLIDER (home page) ----
  const slides = document.querySelectorAll('.hv-slide');
  const dots = document.querySelectorAll('.hv-dot');
  if (slides.length) {
    let current = 0;
    slides[0].classList.add('active');

    const goTo = (i) => {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = i;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
    };

    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
    setInterval(() => goTo((current + 1) % slides.length), 4000);
  }

  // ---- WORK FILTER (work page) ----
  const filterBtns = document.querySelectorAll('.wf-btn');
  const workCards = document.querySelectorAll('.wc[data-tags]');
  const emptyState = document.getElementById('empty-state');
  const workRows = document.querySelectorAll('.wc-row');

  if (filterBtns.length) {
    // Check URL param on load
    const urlParams = new URLSearchParams(window.location.search);
    const initFilter = urlParams.get('filter');
    if (initFilter) {
      filterBtns.forEach(b => {
        b.classList.toggle('active', b.dataset.filter === initFilter);
      });
      applyFilter(initFilter);
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyFilter(btn.dataset.filter);
      });
    });

    function applyFilter(filter) {
      let visible = 0;
      workCards.forEach(card => {
        const tags = card.dataset.tags || '';
        const show = filter === 'all' || tags.split(' ').includes(filter);
        card.classList.toggle('hidden', !show);
        if (show) visible++;
      });

      // Show/hide row wrappers that have ALL children hidden
      workRows.forEach(row => {
        const rowCards = row.querySelectorAll('.wc');
        const anyVisible = Array.from(rowCards).some(c => !c.classList.contains('hidden'));
        row.style.display = anyVisible ? '' : 'none';
      });

      if (emptyState) {
        emptyState.style.display = visible === 0 ? 'block' : 'none';
      }
    }
  }

  // ---- CONTACT FORM ----
  const form = document.getElementById('contact-form');
  const successEl = document.getElementById('cf-success');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic validation
      const required = form.querySelectorAll('[required]');
      let valid = true;
      required.forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = '#e00';
          valid = false;
        } else {
          field.style.borderColor = '';
        }
      });

      if (!valid) return;

      // Simulate send (replace with real endpoint)
      const btn = form.querySelector('.cf-submit');
      btn.disabled = true;
      btn.querySelector('.cf-submit-text').textContent = 'Sending…';

      setTimeout(() => {
        form.querySelectorAll('.cf-field, .cf-row, .cf-divider, .cf-section-label, .cf-submit-row').forEach(el => {
          el.style.display = 'none';
        });
        if (successEl) successEl.style.display = 'block';
      }, 1200);
    });

    // Clear error state on input
    form.querySelectorAll('.cf-input').forEach(input => {
      input.addEventListener('input', () => { input.style.borderColor = ''; });
    });
  }

  // ---- SMOOTH ANCHOR SCROLL ----
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '64');
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    });
  });

});
