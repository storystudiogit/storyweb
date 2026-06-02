// ============================================
// STORYSTUDIOS — Brand Bible JS
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // --- NAV SCROLL STATE ---
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // --- SCROLL REVEAL ---
  const revealTargets = document.querySelectorAll(
    '.brand-card, .discipline, .swatch, .combo, .voice-pillar, .mp-item, ' +
    '.usage-card, .sig-card, .typeface-block, .tone-row:not(.tone-header-row), .anim-row'
  );

  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger siblings
          const siblings = Array.from(entry.target.parentElement?.children || []);
          const idx = siblings.indexOf(entry.target);
          const delay = Math.min(idx * 60, 400);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealTargets.forEach(el => revealObserver.observe(el));

  // --- NAV ACTIVE STATE ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${id}`) {
              link.style.color = 'var(--signal)';
            }
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach(s => sectionObserver.observe(s));

  // --- SWATCH HOVER COPY ---
  const swatchValues = document.querySelectorAll('.swatch-values span');
  swatchValues.forEach(span => {
    span.style.cursor = 'pointer';
    span.title = 'Click to copy';
    span.addEventListener('click', () => {
      navigator.clipboard?.writeText(span.textContent).then(() => {
        const orig = span.textContent;
        span.textContent = 'Copied!';
        span.style.color = 'var(--signal)';
        setTimeout(() => {
          span.textContent = orig;
          span.style.color = '';
        }, 1200);
      });
    });
  });

  // --- SMOOTH NAV SCROLL ---
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));
          const top = target.getBoundingClientRect().top + window.scrollY - navH;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

  // --- PM COVER ITALIC FIX (inject em) ---
  const pmTitle = document.querySelector('.pm-cover-title');
  if (pmTitle) {
    pmTitle.innerHTML = 'The<br><em>Story</em><br>Issue';
  }

});
