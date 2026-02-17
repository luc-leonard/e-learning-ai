// ===== MOOC App — Interactions (per-page) =====

document.addEventListener('DOMContentLoaded', () => {
  initSpoilers();
  initCheckboxes();
  initBackToTop();
  initScrollSpy();
});

// ===== SPOILER / COLLAPSIBLE =====
function initSpoilers() {
  document.querySelectorAll('.spoiler-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.spoiler').classList.toggle('open');
    });
  });
}

// ===== INTERACTIVE CHECKBOXES =====
function initCheckboxes() {
  const STORAGE_KEY = 'mooc-checkpoints';
  let state = {};
  try { state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch (e) { /* ignore */ }

  document.querySelectorAll('.checklist input[type="checkbox"]').forEach(cb => {
    if (state[cb.id]) {
      cb.checked = true;
      cb.closest('li').classList.add('checked');
    }
    cb.addEventListener('change', () => {
      state[cb.id] = cb.checked;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      cb.closest('li').classList.toggle('checked', cb.checked);
    });
  });
}

// ===== BACK TO TOP =====
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== SCROLL SPY =====
function initScrollSpy() {
  const sections = document.querySelectorAll('[id^="m0-"], [id^="m1-"], [id^="m2-"], [id^="m3-"], [id^="p1-"]');
  if (!sections.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        document.querySelectorAll('.sidebar-step').forEach(s => s.classList.remove('active'));
        const match = document.querySelector(`.sidebar-step[data-section="${id}"]`);
        if (match) match.classList.add('active');
      }
    });
  }, { rootMargin: '-20% 0px -60% 0px' });

  sections.forEach(s => observer.observe(s));
}
