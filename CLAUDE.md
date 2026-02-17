# E-learning : Apprendre à utiliser l'IA pour créer un produit

## Contexte

Formation e-learning destinée à des **non-programmeurs** qui veulent apprendre à utiliser l'IA (Claude Code) pour construire des produits logiciels. Le projet fil rouge est un site web de **club de lecture**.

Tout le contenu est rédigé en **français**. Les termes techniques (git, commit, interface, rollback...) restent en anglais.

## Structure du projet

```
modules/
├── partie1_penser_en_architecte/    # Modules 0-5 : concepts d'architecture sans coder
│   ├── module0_avant_de_commencer.md
│   ├── module1_le_mur_du_contexte.md
│   ├── module2_le_passage_du_temoin.md
│   ├── module3_la_carte_et_le_territoire.md
│   ├── module4_faire_confiance_mais_verifier.md
│   └── module5_les_vrais_mots.md
├── module6_la_bascule.md            # Module de transition entre les deux parties
└── partie2_les_mains_dans_le_code/  # Modules 7-10 : code Elixir/Phoenix
    ├── module7_les_mains_dans_le_moteur.md
    ├── module8_le_monolithe_qui_enfle.md
    ├── module9_les_mots_du_metier.md
    └── module10_les_frontieres_qui_tiennent.md
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
- M4 : réflexes 10-13
- M5 : réflexes 14-16

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

## État d'avancement

- **Modules 0, 1, 2** : révisés pour le workflow Claude Code, git progressif, temps réalistes
- **Modules 3, 4, 5** : partiellement mis à jour (git ajouté, tests automatiques dans M4, réflexes renumérotés dans M5) — le workflow Claude Code n'est pas encore adapté (références à "collez le plan", "nouvelle conversation avec Claude", "un compte Claude")
- **Module 6** : écrit (transition)
- **Modules 7-10** : non révisés, utilisent les anciennes conventions
