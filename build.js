#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');

// ============================================================
// CONFIGURATION
// ============================================================

const ROOT = path.resolve(__dirname);
const HTML_DIR = path.join(ROOT, 'html');

const MODULE_MAP = [
  { md: 'modules/partie1_penser_en_architecte/module0_avant_de_commencer.md', out: 'module0.html', id: 'module0', prefix: 'm0', number: '0' },
  { md: 'modules/partie1_penser_en_architecte/module1_le_mur_du_contexte.md', out: 'module1.html', id: 'module1', prefix: 'm1', number: '1' },
  { md: 'modules/partie1_penser_en_architecte/module2_le_passage_du_temoin.md', out: 'module2.html', id: 'module2', prefix: 'm2', number: '2' },
  { md: 'modules/partie1_penser_en_architecte/projet1_votre_premier_plan.md', out: 'projet1.html', id: 'projet1', prefix: 'p1', number: 'P1', numberStyle: 'background:var(--accent-primary);color:white;font-size:0.65rem;' },
  { md: 'modules/partie1_penser_en_architecte/module3_la_carte_et_le_territoire.md', out: 'module3.html', id: 'module3', prefix: 'm3', number: '3' },
  { md: 'modules/partie1_penser_en_architecte/module4_faire_confiance_mais_verifier.md', out: 'module4.html', id: 'module4', prefix: 'm4', number: '4' },
  { md: 'modules/partie1_penser_en_architecte/module5_verifier_pour_de_vrai.md', out: 'module5.html', id: 'module5', prefix: 'm5', number: '5' },
  { md: 'modules/partie1_penser_en_architecte/module6_les_vrais_mots.md', out: 'module6.html', id: 'module6', prefix: 'm6', number: '6' },
  { md: 'modules/module7_la_bascule.md', out: 'module7.html', id: 'module7', prefix: 'm7', number: '7' },
  { md: 'modules/partie2_les_mains_dans_le_code/module8_les_mains_dans_le_moteur.md', out: 'module8.html', id: 'module8', prefix: 'm8', number: '8' },
  { md: 'modules/partie2_les_mains_dans_le_code/module9_le_monolithe_qui_enfle.md', out: 'module9.html', id: 'module9', prefix: 'm9', number: '9' },
  { md: 'modules/partie2_les_mains_dans_le_code/module10_les_mots_du_metier.md', out: 'module10.html', id: 'module10', prefix: 'm10', number: '10' },
  { md: 'modules/partie2_les_mains_dans_le_code/module11_les_frontieres_qui_tiennent.md', out: 'module11.html', id: 'module11', prefix: 'm11', number: '11' },
];

// h2 headings that get an ID and optionally appear in nav steps
const SECTION_ID_RULES = [
  { pattern: /analogie/i, suffix: 'analogie', nav: true },
  { pattern: /^Repartir de zéro/i, suffix: 'repartir', nav: true },
  { pattern: /^Ce que vous avez appris$/i, suffix: 'bilan', nav: true },
  { pattern: /^Ce que vous avez installé/i, suffix: 'recap', nav: true },
  { pattern: /^La suite$/i, suffix: 'suite', nav: false },
  { pattern: /^Avant de partir/i, suffix: 'sauvegarde', nav: false },
  { pattern: /^Le contexte$/i, suffix: 'contexte', nav: true },
];

// ============================================================
// HTML UTILITIES
// ============================================================

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ============================================================
// MARKDOWN-IT SETUP
// ============================================================

const md = new MarkdownIt({ html: true, typographer: false, breaks: false });

// Custom fence renderer: <pre data-lang="..."><code> instead of <pre><code class="language-...">
md.renderer.rules.fence = function (tokens, idx) {
  const token = tokens[idx];
  const lang = token.info.trim();
  // Strip trailing newline from content
  const content = escapeHtml(token.content.replace(/\n$/, ''));
  if (lang) {
    return `<pre data-lang="${lang}"><code>${content}</code></pre>\n`;
  }
  return `<pre><code>${content}</code></pre>\n`;
};

// Ensure ordered lists get start attribute
const defaultOlOpen = md.renderer.rules.ordered_list_open;
md.renderer.rules.ordered_list_open = function (tokens, idx, options, env, self) {
  const token = tokens[idx];
  const startVal = token.attrGet('start');
  if (startVal) {
    return `<ol start="${startVal}">\n`;
  }
  return '<ol>\n';
};

// ============================================================
// PRE-PROCESSING
// ============================================================

function preprocess(rawMd, config) {
  const lines = rawMd.split('\n');
  const output = [];
  const steps = [];
  let i = 0;
  let h1Found = false;
  let justAfterH1 = false;
  let moduleTitle = '';
  let checkboxCounter = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // ---- H1: extract title, pass through ----
    if (!h1Found && /^# .+/.test(trimmed)) {
      h1Found = true;
      justAfterH1 = true;
      moduleTitle = trimmed.replace(/^# /, '');
      output.push(line);
      i++;
      continue;
    }

    // ---- Subtitle: ## *text* right after h1 ----
    if (justAfterH1 && /^## \*(.+)\*$/.test(trimmed)) {
      const m = trimmed.match(/^## \*(.+)\*$/);
      output.push('');
      output.push(`<p class="module-subtitle"><em>${m[1]}</em></p>`);
      output.push('');
      justAfterH1 = false;
      i++;
      continue;
    }

    if (justAfterH1 && trimmed !== '' && trimmed !== '---') {
      justAfterH1 = false;
    }

    // ---- Module meta: **Durée :** + **Ce qu'il vous faut :** ----
    if (/^\*\*Durée\s*:\*\*/.test(trimmed)) {
      const dureeText = trimmed.replace(/^\*\*Durée\s*:\*\*\s*/, '');
      let j = i + 1;
      while (j < lines.length && lines[j].trim() === '') j++;
      if (j < lines.length && /^\*\*Ce qu'il vous faut\s*:\*\*/.test(lines[j].trim())) {
        const fautText = lines[j].trim().replace(/^\*\*Ce qu'il vous faut\s*:\*\*\s*/, '');
        output.push('');
        output.push('<div class="module-meta">');
        output.push(`<div class="module-meta-item"><strong>Durée :</strong> ${dureeText}</div>`);
        output.push(`<div class="module-meta-item"><strong>Ce qu'il vous faut :</strong> ${fautText}</div>`);
        output.push('</div>');
        output.push('');
        i = j + 1;
        continue;
      }
    }

    // ---- Step header: ## Étape N — Title (duration) ----
    const etapeMatch = trimmed.match(/^## Étape (\d+) — (.+?) \((.+?)\)\s*$/);
    if (etapeMatch) {
      const [, num, title, duration] = etapeMatch;
      const stepId = `${config.prefix}-etape${num}`;
      steps.push({ id: stepId, label: `Étape ${num} — ${title}` });
      output.push('');
      output.push(`<div class="step-header" id="${stepId}"><span class="step-number">${num}</span><h2>${title} <small style="font-weight:400;font-size:0.65em;color:var(--text-tertiary)">(${duration})</small></h2></div>`);
      output.push('');
      i++;
      continue;
    }

    // ---- Phase header (projet1): ## Phase N — Title (duration) ----
    const phaseMatch = trimmed.match(/^## Phase (\d+) — (.+?) \((.+?)\)\s*$/);
    if (phaseMatch) {
      const [, num, title, duration] = phaseMatch;
      const stepId = `${config.prefix}-phase${num}`;
      steps.push({ id: stepId, label: `Phase ${num} — ${title}` });
      output.push('');
      output.push(`<div class="step-header" id="${stepId}"><span class="step-number">${num}</span><h2>${title} <small style="font-weight:400;font-size:0.65em;color:var(--text-tertiary)">(${duration})</small></h2></div>`);
      output.push('');
      i++;
      continue;
    }

    // ---- Jour header (modules 8-11): ## Jour N — Title [(duration)] ----
    const jourMatch = trimmed.match(/^## Jour (\d+) — (.+?)(?:\s+\((.+?)\))?\s*$/);
    if (jourMatch) {
      const [, num, title, duration] = jourMatch;
      const stepId = `${config.prefix}-jour${num}`;
      steps.push({ id: stepId, label: `Jour ${num} — ${title}` });
      const durationHtml = duration ? ` <small style="font-weight:400;font-size:0.65em;color:var(--text-tertiary)">(${duration})</small>` : '';
      output.push('');
      output.push(`<div class="step-header" id="${stepId}"><span class="step-number">${num}</span><h2>${title}${durationHtml}</h2></div>`);
      output.push('');
      i++;
      continue;
    }

    // ---- Spoiler: ### Lisez ceci APRÈS... ----
    if (/^### Lisez ceci APRÈS/.test(trimmed)) {
      const spoilerTitle = trimmed.replace(/^### /, '');
      output.push('');
      output.push('<div class="spoiler">');
      output.push(`<button class="spoiler-toggle"><span class="spoiler-icon">▶</span>${spoilerTitle}</button>`);
      output.push('<div class="spoiler-content"><div class="spoiler-inner">');
      output.push('');
      i++;
      while (i < lines.length) {
        const l = lines[i].trim();
        if (l === '---' || /^#{1,2} /.test(l)) break;
        output.push(lines[i]);
        i++;
      }
      output.push('');
      output.push('</div></div>');
      output.push('</div>');
      output.push('');
      continue;
    }

    // ---- Callout: ### 🔴 Title / ### 🟢 Title ----
    const colorCalloutMatch = trimmed.match(/^### (🔴|🟢) (.+)$/);
    if (colorCalloutMatch) {
      const [, emoji, title] = colorCalloutMatch;
      const type = emoji === '🔴' ? 'red' : 'green';
      output.push('');
      output.push(`<div class="callout callout-${type}">`);
      output.push(`<div class="callout-title">${emoji} ${title}</div>`);
      output.push('');
      i++;
      while (i < lines.length) {
        const l = lines[i].trim();
        if (l === '---' || /^#{1,2} /.test(l)) break;
        if (/^### (🔴|🟢)/.test(l)) break;
        if (/^\*\*🚩 /.test(l)) break;
        output.push(lines[i]);
        i++;
      }
      output.push('</div>');
      output.push('');
      continue;
    }

    // ---- Flag callout: **🚩 Title.** ----
    if (/^\*\*🚩 .+\*\*$/.test(trimmed)) {
      const flagTitle = trimmed.replace(/^\*\*/, '').replace(/\*\*$/, '');
      output.push('');
      output.push(`<div class="callout callout-flag">`);
      output.push(`<div class="callout-title">${flagTitle}</div>`);
      output.push('');
      i++;
      // Skip blank lines after the title
      while (i < lines.length && lines[i].trim() === '') i++;
      // Collect body paragraph(s) until blank line or next pattern
      while (i < lines.length) {
        const l = lines[i].trim();
        if (l === '') break;
        if (/^\*\*🚩 /.test(l)) break;
        if (l === '---' || /^#{1,3} /.test(l)) break;
        output.push(lines[i]);
        i++;
      }
      output.push('');
      output.push('</div>');
      output.push('');
      continue;
    }

    // ---- Checkpoint: ## Checkpoint / ## Auto-évaluation ----
    if (/^## (Checkpoint|Auto-évaluation)/.test(trimmed)) {
      const checkTitle = trimmed.replace(/^## /, '');
      const sectionId = /Auto-évaluation/.test(checkTitle)
        ? `${config.prefix}-eval`
        : `${config.prefix}-checkpoint`;
      steps.push({ id: sectionId, label: checkTitle });
      output.push('');
      output.push(`<div class="checkpoint" id="${sectionId}">`);
      output.push(`<h2>${checkTitle}</h2>`);
      i++;

      let inChecklist = false;
      while (i < lines.length) {
        const l = lines[i].trim();
        if (l === '---') break;
        if (/^## /.test(l) && !/^## (Checkpoint|Auto-évaluation)/.test(l)) break;

        const cbMatch = l.match(/^- \[ \] (.+)/);
        if (cbMatch) {
          if (!inChecklist) {
            output.push('<ul class="checklist">');
            inChecklist = true;
          }
          checkboxCounter++;
          const cbId = `ck${config.number}-${checkboxCounter}`;
          const cbText = md.renderInline(cbMatch[1]);
          output.push(`<li><input type="checkbox" id="${cbId}"><span>${cbText}</span></li>`);
        } else {
          if (inChecklist) {
            output.push('</ul>');
            inChecklist = false;
          }
          output.push(lines[i]);
        }
        i++;
      }
      if (inChecklist) output.push('</ul>');

      output.push('</div>');
      output.push('');
      continue;
    }

    // ---- Named sections: h2 headings with known IDs ----
    if (/^## [^#*]/.test(trimmed)) {
      const heading = trimmed.replace(/^## /, '');
      let matched = false;
      for (const rule of SECTION_ID_RULES) {
        if (rule.pattern.test(heading)) {
          const sectionId = `${config.prefix}-${rule.suffix}`;
          if (rule.nav) {
            steps.push({ id: sectionId, label: heading });
          }
          output.push('');
          output.push(`<h2 id="${sectionId}">${heading}</h2>`);
          output.push('');
          matched = true;
          break;
        }
      }
      if (matched) {
        i++;
        continue;
      }
    }

    // ---- Notebook prompts: split consecutive > ✍️ lines ----
    if (/^> ✍️/.test(trimmed)) {
      output.push(line);
      i++;
      while (i < lines.length && /^> ✍️/.test(lines[i].trim())) {
        output.push('');
        output.push(lines[i]);
        i++;
      }
      continue;
    }

    // ---- Default: pass through ----
    output.push(line);
    i++;
  }

  return { processed: output.join('\n'), steps, title: moduleTitle };
}

// ============================================================
// POST-PROCESSING
// ============================================================

function postprocess(html, config) {
  // Replace &quot; with " in text content (markdown-it escapes quotes but original HTML doesn't)
  html = html.replace(/&quot;/g, '"');

  // Add class="notebook-prompt" to blockquotes containing ✍️
  html = html.replace(/<blockquote>\n<p>✍️/g, '<blockquote class="notebook-prompt">\n<p>✍️');

  // Add target="_blank" to external links (http/https)
  html = html.replace(/<a href="(https?:\/\/[^"]+)">/g, '<a href="$1" target="_blank">');

  return html;
}

// ============================================================
// HTML TEMPLATE
// ============================================================

function wrapTemplate(content, pageTitle) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageTitle}</title>
  <link rel="stylesheet" href="styles.css">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏗️</text></svg>">
</head>
<body>
  <div class="app">
    <div id="sidebar-root"></div>
    <main class="main-content">
      <div class="module-content">

${content}
      </div>
    </main>
    <button class="back-to-top" aria-label="Retour en haut">↑</button>
  </div>
  <script src="nav.js"></script>
  <script src="app.js"></script>
</body>
</html>
`;
}

// ============================================================
// NAV.JS GENERATION
// ============================================================

function extractNavTitle(h1Text, config) {
  const colonIdx = h1Text.indexOf(' : ');
  if (colonIdx === -1) return h1Text;
  if (config.id.startsWith('projet')) {
    return h1Text.slice(0, colonIdx);
  }
  return h1Text.slice(colonIdx + 3);
}

function generateNavJs(results) {
  // Build the MODULES array
  let modulesArray = 'const MODULES = [\n';
  results.forEach((mod, idx) => {
    modulesArray += '  {\n';
    modulesArray += `    id: '${mod.id}',\n`;
    modulesArray += `    file: '${mod.out}',\n`;
    modulesArray += `    number: '${mod.number}',\n`;
    if (mod.numberStyle) {
      modulesArray += `    numberStyle: '${mod.numberStyle}',\n`;
    }
    modulesArray += `    title: '${mod.navTitle.replace(/'/g, "\\'")}',\n`;
    modulesArray += '    steps: [\n';
    mod.steps.forEach(step => {
      modulesArray += `      { id: '${step.id}', label: '${step.label.replace(/'/g, "\\'")}' },\n`;
    });
    modulesArray += '    ]\n';
    modulesArray += `  }${idx < results.length - 1 ? ',' : ''}\n`;
  });
  modulesArray += '];\n';

  // Read existing nav.js to extract sidebar functions
  const existingNavPath = path.join(HTML_DIR, 'nav.js');
  let sidebarCode = '';
  if (fs.existsSync(existingNavPath)) {
    const navContent = fs.readFileSync(existingNavPath, 'utf8');
    // Find the end of the MODULES array declaration
    const modulesEndMarker = '];\n';
    const modulesStart = navContent.indexOf('const MODULES');
    if (modulesStart !== -1) {
      const modulesEnd = navContent.indexOf(modulesEndMarker, modulesStart);
      if (modulesEnd !== -1) {
        sidebarCode = navContent.slice(modulesEnd + modulesEndMarker.length);
      }
    }
  }

  // Fallback: if we couldn't extract sidebar functions, use a minimal version
  if (!sidebarCode.trim()) {
    sidebarCode = `
function getCurrentModuleId() {
  const page = location.pathname.split('/').pop().replace('.html', '');
  const mod = MODULES.find(m => m.file.replace('.html', '') === page);
  return mod ? mod.id : MODULES[0].id;
}

document.addEventListener('DOMContentLoaded', function() {
  console.warn('nav.js: sidebar functions not found');
});
`;
  }

  const navJs = '// ===== Shared Navigation Component =====\n'
    + '// Auto-generated by build.js — do not edit manually\n\n'
    + modulesArray
    + '\n\n'
    + sidebarCode.trimStart();

  fs.writeFileSync(existingNavPath, navJs, 'utf8');
  console.log('  ✓ nav.js');
}

// ============================================================
// INDEX.HTML
// ============================================================

function generateIndex() {
  const indexHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0;url=module0.html">
  <title>Construire avec l'IA — Formation</title>
</head>
<body>
  <p>Redirection vers <a href="module0.html">Module 0</a>...</p>
</body>
</html>
`;
  fs.writeFileSync(path.join(HTML_DIR, 'index.html'), indexHtml, 'utf8');
  console.log('  ✓ index.html');
}

// ============================================================
// MAIN
// ============================================================

function build() {
  console.log('Build en cours...\n');

  const results = [];

  for (const mod of MODULE_MAP) {
    const mdPath = path.join(ROOT, mod.md);
    if (!fs.existsSync(mdPath)) {
      console.warn(`  ⚠ Fichier non trouvé: ${mod.md}`);
      continue;
    }

    const rawMd = fs.readFileSync(mdPath, 'utf8');
    const { processed, steps, title } = preprocess(rawMd, mod);
    let html = md.render(processed);
    html = postprocess(html, mod);

    const pageTitle = title.replace(' : ', ' — ');
    const navTitle = extractNavTitle(title, mod);

    const fullHtml = wrapTemplate(html, pageTitle);
    const outPath = path.join(HTML_DIR, mod.out);
    fs.writeFileSync(outPath, fullHtml, 'utf8');

    results.push({ ...mod, steps, navTitle });
    console.log(`  ✓ ${mod.out} (${steps.length} steps)`);
  }

  generateNavJs(results);
  generateIndex();

  console.log(`\nBuild terminé: ${results.length} modules générés.`);
}

build();
