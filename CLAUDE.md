# E-learning : Apprendre à utiliser l'IA pour créer un produit

## Contexte

Formation e-learning destinée à des **non-programmeurs** qui veulent apprendre à utiliser l'IA (Claude Code) pour construire des produits logiciels. Le projet fil rouge est un site web de **club de lecture**.

Tout le contenu est rédigé en **français**. Les termes techniques (git, commit, interface, rollback...) restent en anglais.

## Structure du projet

```
modules/
├── partie1_penser_en_architecte/    # Modules 0-6 : concepts d'architecture sans coder
│   ├── module0_avant_de_commencer.md
│   ├── module1_le_mur_du_contexte.md
│   ├── module2_le_passage_du_temoin.md
│   ├── module3_la_carte_et_le_territoire.md
│   ├── projet1_votre_premier_plan.md   # Mini-projet intermédiaire (après M3)
│   ├── module4_faire_confiance_mais_verifier.md
│   ├── module5_verifier_pour_de_vrai.md
│   └── module6_les_vrais_mots.md
├── module7_la_bascule.md            # Module de transition entre les deux parties
└── partie2_les_mains_dans_le_code/  # Modules 8-11 : code Elixir/Phoenix
    ├── module8_jour1_installer.md       # M8 découpé en 9 pages (une par jour)
    ├── module8_jour2_reconnaitre_fonction.md
    ├── module8_jour3_ok_error.md
    ├── module8_jour4_module_pipe.md
    ├── module8_jour5_construire.md
    ├── module8_jour6_verifier.md
    ├── module8_jour7_monolithe.md
    ├── module8_jour8_declic.md
    ├── module8_jour9_bilan.md
    ├── module9_jour1_faire_grandir.md   # M9 découpé en 7 pages (une par jour)
    ├── module9_jour2_les_fils.md
    ├── module9_jour3_la_casse.md
    ├── module9_jour4_annoncer.md
    ├── module9_jour5_pubsub.md
    ├── module9_jour6_transformer.md
    ├── module9_jour7_bilan.md
    ├── module10_les_mots_du_metier.md
    └── module11_les_frontieres_qui_tiennent.md
```

## Outils de l'étudiant

Les étudiants utilisent **Claude Code (CLI)**, pas claude.ai. Leur environnement :
- **Terminal** (intégré à VSCode)
- **VSCode** (éditeur + explorateur de fichiers)
- **Git** (sauvegardes)
- **Claude Code** (assistant IA dans le terminal)
- **Un carnet papier** (réflexion, notes manuscrites)

Le dossier de travail des étudiants est `formation-ia/`. Leur plan d'architecture est dans `plan.md`.

## Principes pédagogiques

### Méthode
- **Provoquer l'échec d'abord, expliquer ensuite.** L'étudiant fait une erreur guidée, la constate, puis comprend pourquoi.
- **Analogies du quotidien.** Chaque concept est introduit par une analogie (restaurant, boulangerie, course de relais...) avant le vocabulaire technique.
- **Le carnet papier** sert à la réflexion. Les questions ✍️ sont des moments d'introspection, pas de la documentation.
- **L'étudiant lance le site lui-même** en ligne de commande. Même s'il ne comprend pas le code, il doit savoir que `npm start` (ou équivalent) lance son projet.

### Workflow Claude Code
- "Nouvelle conversation" = `/exit` puis `claude`
- Le plan est dans `plan.md` — Claude Code le lit avec "Lis plan.md", pas de copier-coller
- Les paiements et emails sont **simulés** (pas de Stripe, pas de SMTP)
- Les durées de module sont **réalistes** : 4-5 heures par module pour un débutant complet

### Git — enseignement progressif
Les commandes git sont introduites **au moment où l'étudiant en a besoin**, pas en bloc :

| Module | Commandes introduites |
|--------|-----------------------|
| M0 | `git init`, `git status`, `git add`, `git commit -m`, `git log --oneline` |
| M1 | `git add .` (tout ajouter), `git checkout .` (annuler les modifications) |
| M2 | `git add <fichier>` (committer un fichier spécifique vs tout) |
| M4 | `git diff` (voir les changements avant de committer) |

Chaque module se termine par un commit (`git add . && git commit`).

### Réflexes numérotés
Les modules accumulent des "réflexes" numérotés en continu :
- M1 : réflexes 1-3
- M2 : réflexes 4-6
- M3 : réflexes 7-9
- M4 : réflexes 10-12
- M5 : réflexes 13-14
- M6 : réflexes 15-17

## Structure d'un module

Chaque module suit ce format :

```markdown
# Module N : Titre

## *Sous-titre en italique*

---

## Ce que vous savez déjà (ou "À qui s'adresse ce module" pour M0)

**Durée :** X heures
**Ce qu'il vous faut :** ...

---

## Avant de commencer : une analogie

## Étape 1 — Titre (durée)
### Ce que vous allez faire
### Ce que vous devez noter dans votre carnet

## Étape 2 — ...

## Ce que vous avez appris
### En une phrase
### Les N nouveaux réflexes

## Avant de partir — sauvegardez

## La suite
```

## Ton et style

- **Vouvoiement** pour s'adresser à l'étudiant
- Ton conversationnel, honnête, encourageant mais pas condescendant
- Les analogies viennent AVANT le concept technique
- Pas d'emojis sauf les marqueurs existants (✍️ pour le carnet, 🚩 pour les signaux d'alerte, 🟢 pour les améliorations, 🔴 pour les problèmes)
- Les sections "Lisez ceci APRÈS avoir fait l'étape X" forcent l'étudiant à expérimenter avant de lire l'explication

### Tooltips pour termes techniques

Les termes qu'un non-programmeur pourrait ne pas connaître sont marqués avec `<dfn title="...">` :

```html
des <dfn title="Situation rare ou extrême à laquelle personne ne pense">cas limites</dfn>
```

Règles :
- **Première occurrence seulement** dans chaque module — pas besoin de tooltip à chaque fois
- **Explication courte** (une phrase max) dans le `title`
- **Ne pas tooltiper** les termes déjà expliqués dans le texte environnant
- **Ne pas en abuser** : 3-6 par module max, sinon ça devient du bruit

CSS à ajouter au LMS :
```css
dfn[title] {
  color: var(--primary, #3b82f6);
  border-bottom: 1px dotted currentColor;
  cursor: help;
  font-style: normal;
}
```

## État d'avancement

- **Modules 0, 1, 2** : révisés pour le workflow Claude Code, git progressif, temps réalistes
- **Module 3** : partiellement mis à jour (git ajouté) — le workflow Claude Code n'est pas encore adapté (références à "collez le plan", "nouvelle conversation avec Claude")
- **projet1_votre_premier_plan.md** : mini-projet intermédiaire entre M3 et M4 — statut inconnu, à vérifier
- **Modules 4, 5** : réécrits (M4 = mini-projet vérification, M5 = appliquer au club de lecture). Workflow Claude Code adapté. Points à améliorer identifiés :
  - M4 : confirmer le répertoire de travail avant `claude` ; clarifier que la demande exemple à Claude à l'étape 6 est à adapter (pas à copier mot pour mot) ; formuler la commande de tests de façon moins incertaine
  - M5 : ajouter une étape de test manuel du site avant les vérifications écrites ; clarifier `[copiez la vérification exacte]` pour les non-programmeurs ; ajouter un signal de clôture à l'étape 6 (facultatif)
- **Module 6** (ex-M5, les vrais mots) : réflexes renumérotés (15-17), références mises à jour — le workflow Claude Code n'est pas encore adapté (références à "collez le plan", "un compte Claude")
- **Module 7** (ex-M6, la bascule) : références mises à jour
- **Module 8** : réécrit (9 jours au lieu de 7, rythme progressif un concept par jour, workflow Claude Code adapté). Jours 2-4 = lecture pure (def, ok/error, defmodule+pipe), Jour 5 = construction naïve, Jours 6-8 = vérification + monolithe + déclic plan=code, Jour 9 = bilan
- **Module 9** : réécrit (7 jours, un concept par jour, workflow Claude Code adapté). J1-J3 = comprendre le problème (faire grandir, voir les fils, provoquer la casse), J4-J7 = résoudre (concept événements, PubSub, transformation, bilan). GenServer traité comme "plomberie" — pas expliqué. Tests async retirés (trop avancé). Contextes utilisés = ceux que l'étudiant a réellement (Comptes, Livres, Réunions).
- **Modules 10-11** (ex-M9-10) : renommés, titres et références internes mis à jour — non révisés pour le workflow Claude Code, utilisent les anciennes conventions
