// ===== Shared Navigation Component =====
// Injected into every page via <div id="sidebar-root"></div>

const MODULES = [
  {
    id: 'module0',
    file: 'module0.html',
    number: '0',
    title: 'Avant de commencer',
    steps: [
      { id: 'm0-analogie', label: "Analogie : l'atelier" },
      { id: 'm0-etape1', label: 'Étape 1 — Le terminal' },
      { id: 'm0-etape2', label: 'Étape 2 — Visual Studio Code' },
      { id: 'm0-etape3', label: 'Étape 3 — Git' },
      { id: 'm0-etape4', label: 'Étape 4 — Claude Code' },
      { id: 'm0-recap', label: 'Récapitulatif' },
      { id: 'm0-checkpoint', label: 'Checkpoint' },
    ]
  },
  {
    id: 'module1',
    file: 'module1.html',
    number: '1',
    title: 'Pourquoi ça part en vrille',
    steps: [
      { id: 'm1-analogie', label: "Analogie : l'artisan amnésique" },
      { id: 'm1-etape1', label: 'Étape 1 — Demandez quelque chose' },
      { id: 'm1-etape2', label: 'Étape 2 — Ajoutez des choses' },
      { id: 'm1-etape3', label: 'Étape 3 — Comprendre' },
      { id: 'm1-etape4', label: 'Étape 4 — Construire un plan' },
      { id: 'm1-repartir', label: 'Repartir de zéro' },
      { id: 'm1-etape5', label: 'Étape 5 — Reconstruire avec le plan' },
      { id: 'm1-etape6', label: 'Étape 6 — Le test final' },
      { id: 'm1-bilan', label: 'Ce que vous avez appris' },
    ]
  },
  {
    id: 'module2',
    file: 'module2.html',
    number: '2',
    title: 'Le passage du témoin',
    steps: [
      { id: 'm2-analogie', label: 'Analogie : la course de relais' },
      { id: 'm2-etape1', label: 'Étape 1 — La catastrophe' },
      { id: 'm2-etape2', label: 'Étape 2 — Comprendre' },
      { id: 'm2-etape3', label: 'Étape 3 — Les parcours' },
      { id: 'm2-repartir', label: 'Repartir de zéro' },
      { id: 'm2-etape4', label: 'Étape 4 — Reconstruire' },
      { id: 'm2-etape5', label: 'Étape 5 — Le scénario impossible' },
      { id: 'm2-etape6', label: 'Étape 6 — Compléter le plan' },
      { id: 'm2-bilan', label: 'Ce que vous avez appris' },
    ]
  },
  {
    id: 'projet1',
    file: 'projet1.html',
    number: 'P1',
    numberStyle: 'background:var(--accent-primary);color:white;font-size:0.65rem;',
    title: 'Projet libre 1',
    steps: [
      { id: 'p1-contexte', label: 'Choisir un projet' },
      { id: 'p1-phase1', label: 'Phase 1 — Réfléchir seul' },
      { id: 'p1-phase2', label: 'Phase 2 — Écrire le plan' },
      { id: 'p1-phase3', label: 'Phase 3 — Confronter à Claude' },
      { id: 'p1-phase4', label: 'Phase 4 — Le vrai test' },
      { id: 'p1-eval', label: 'Auto-évaluation' },
    ]
  },
  {
    id: 'module3',
    file: 'module3.html',
    number: '3',
    title: 'La carte et le territoire',
    steps: [
      { id: 'm3-analogie', label: 'Analogie : Google Maps' },
      { id: 'm3-etape1', label: 'Étape 1 — Provoquer le problème' },
      { id: 'm3-etape2', label: 'Étape 2 — Comprendre' },
      { id: 'm3-etape3', label: 'Étape 3 — Créer les fiches' },
      { id: 'm3-repartir', label: 'Repartir de zéro' },
      { id: 'm3-etape4', label: 'Étape 4 — Reconstruire' },
      { id: 'm3-etape5', label: 'Étape 5 — Écrire une fiche' },
      { id: 'm3-etape6', label: 'Étape 6 — Deux conversations' },
      { id: 'm3-etape7', label: 'Étape 7 — Mettre à jour' },
      { id: 'm3-bilan', label: 'Ce que vous avez appris' },
    ]
  },
];

function getCurrentModuleId() {
  const page = location.pathname.split('/').pop().replace('.html', '');
  const mod = MODULES.find(m => m.file.replace('.html', '') === page);
  return mod ? mod.id : MODULES[0].id;
}

function buildSidebar() {
  const root = document.getElementById('sidebar-root');
  if (!root) return;

  const currentId = getCurrentModuleId();
  const currentIndex = MODULES.findIndex(m => m.id === currentId);

  // Build module nav items
  let modulesHtml = '';
  MODULES.forEach(mod => {
    const isActive = mod.id === currentId;
    const numStyle = mod.numberStyle ? ` style="${mod.numberStyle}"` : '';

    let stepsHtml = '';
    mod.steps.forEach(step => {
      const href = mod.id === currentId
        ? `#${step.id}`
        : `${mod.file}#${step.id}`;
      stepsHtml += `<a class="sidebar-step" href="${href}" data-section="${step.id}">${step.label}</a>`;
    });

    modulesHtml += `
      <div class="sidebar-module${isActive ? ' open' : ''}">
        <div class="sidebar-module-header${isActive ? ' active' : ''}" data-module="${mod.id}" data-file="${mod.file}">
          <span class="sidebar-module-number"${numStyle}>${mod.number}</span>
          ${mod.title}
          <span class="chevron">▶</span>
        </div>
        <div class="sidebar-steps">${stepsHtml}</div>
      </div>`;
  });

  // Progress
  const pct = Math.round(((currentIndex + 1) / MODULES.length) * 100);
  const label = MODULES[currentIndex]
    ? (MODULES[currentIndex].number.length <= 2 ? `Module ${MODULES[currentIndex].number}` : MODULES[currentIndex].title)
    : '';

  root.innerHTML = `
    <button class="sidebar-toggle" aria-label="Menu">☰</button>
    <div class="sidebar-overlay"></div>
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="sidebar-brand">Construire avec <span>l'IA</span></div>
        <div class="sidebar-subtitle">Partie 1 — Penser en architecte</div>
      </div>
      <nav class="sidebar-nav">
        <div class="sidebar-section">
          <div class="sidebar-section-label">Modules</div>
          ${modulesHtml}
        </div>
      </nav>
      <div class="sidebar-progress">
        <div class="progress-label">${label} — ${pct}%</div>
        <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
      </div>
    </aside>`;

  // Bind events
  initSidebarEvents();
}

function initSidebarEvents() {
  // Module headers: click to navigate or toggle
  document.querySelectorAll('.sidebar-module-header').forEach(header => {
    header.addEventListener('click', () => {
      const file = header.dataset.file;
      const currentPage = location.pathname.split('/').pop();

      if (file === currentPage) {
        // Same page: toggle steps
        const parent = header.closest('.sidebar-module');
        parent.classList.toggle('open');
      } else {
        // Navigate to other page
        location.href = file;
      }
    });
  });

  // Steps on current page: smooth scroll
  document.querySelectorAll('.sidebar-step').forEach(step => {
    step.addEventListener('click', (e) => {
      const href = step.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.getElementById(href.slice(1));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // Update active
        document.querySelectorAll('.sidebar-step').forEach(s => s.classList.remove('active'));
        step.classList.add('active');
        // Close mobile
        closeMobileMenu();
      }
      // External links (other pages) just follow the href naturally
    });
  });

  // Mobile menu
  const toggle = document.querySelector('.sidebar-toggle');
  const overlay = document.querySelector('.sidebar-overlay');
  if (toggle) {
    toggle.addEventListener('click', () => {
      document.querySelector('.sidebar').classList.toggle('open');
      overlay.classList.toggle('visible');
    });
  }
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

// Init on load
document.addEventListener('DOMContentLoaded', buildSidebar);
