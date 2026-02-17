// ===== MOOC App — Navigation & Interactivity =====

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSpoilers();
  initCheckboxes();
  initBackToTop();
  initMobileMenu();
  initScrollSpy();
});

// ===== MODULE NAVIGATION =====
function initNavigation() {
  const moduleHeaders = document.querySelectorAll('.sidebar-module-header');
  const steps = document.querySelectorAll('.sidebar-step');
  const moduleContents = document.querySelectorAll('.module-content');

  // Click on module header -> show module + toggle steps
  moduleHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const moduleId = header.dataset.module;
      showModule(moduleId);

      // Toggle this module's step list
      const parent = header.closest('.sidebar-module');
      const wasOpen = parent.classList.contains('open');

      // Close all modules
      document.querySelectorAll('.sidebar-module').forEach(m => m.classList.remove('open'));

      // Open clicked if it wasn't open
      if (!wasOpen) {
        parent.classList.add('open');
      }
    });
  });

  // Click on step -> show module + scroll to section
  steps.forEach(step => {
    step.addEventListener('click', (e) => {
      e.preventDefault();
      const moduleId = step.dataset.module;
      const sectionId = step.dataset.section;

      showModule(moduleId);

      // Scroll to section
      setTimeout(() => {
        const target = document.getElementById(sectionId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);

      // Update active step
      steps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');

      // Close mobile menu
      closeMobileMenu();
    });
  });

  // Show first module by default
  showModule('module0');
  document.querySelector('.sidebar-module').classList.add('open');
}

function showModule(moduleId) {
  // Hide all modules
  document.querySelectorAll('.module-content').forEach(mc => mc.classList.remove('active'));

  // Show target module
  const target = document.getElementById(moduleId);
  if (target) {
    target.classList.add('active');
  }

  // Update sidebar active state
  document.querySelectorAll('.sidebar-module-header').forEach(h => h.classList.remove('active'));
  const activeHeader = document.querySelector(`.sidebar-module-header[data-module="${moduleId}"]`);
  if (activeHeader) {
    activeHeader.classList.add('active');

    // Open this module's steps
    document.querySelectorAll('.sidebar-module').forEach(m => m.classList.remove('open'));
    activeHeader.closest('.sidebar-module').classList.add('open');
  }

  // Scroll main content to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Update progress
  updateProgress(moduleId);
}

function updateProgress(moduleId) {
  const moduleMap = { module0: 1, module1: 2, module2: 3 };
  const current = moduleMap[moduleId] || 1;
  const total = 3;
  const pct = Math.round((current / total) * 100);

  const fill = document.querySelector('.progress-fill');
  if (fill) fill.style.width = pct + '%';

  const label = document.querySelector('.progress-label');
  if (label) label.textContent = `Module ${current - 1} sur ${total - 1}`;
}

// ===== SPOILER / COLLAPSIBLE =====
function initSpoilers() {
  document.querySelectorAll('.spoiler-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const spoiler = btn.closest('.spoiler');
      spoiler.classList.toggle('open');
    });
  });
}

// ===== INTERACTIVE CHECKBOXES =====
function initCheckboxes() {
  const STORAGE_KEY = 'mooc-checkpoints';

  // Load state
  let state = {};
  try {
    state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch (e) { /* ignore */ }

  document.querySelectorAll('.checklist input[type="checkbox"]').forEach(cb => {
    const id = cb.id;
    if (state[id]) {
      cb.checked = true;
      cb.closest('li').classList.add('checked');
    }

    cb.addEventListener('change', () => {
      state[id] = cb.checked;
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

// ===== MOBILE MENU =====
function initMobileMenu() {
  const toggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');

  if (!toggle) return;

  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('visible');
  });

  if (overlay) {
    overlay.addEventListener('click', closeMobileMenu);
  }
}

function closeMobileMenu() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('visible');
}

// ===== SCROLL SPY =====
function initScrollSpy() {
  const sections = document.querySelectorAll('[id^="m0-"], [id^="m1-"], [id^="m2-"]');
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
  }, {
    rootMargin: '-20% 0px -60% 0px'
  });

  sections.forEach(s => observer.observe(s));
}
