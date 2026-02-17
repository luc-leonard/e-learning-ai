# Projet libre 1 : Votre premier plan solo

## *Prouver que vous savez penser avant de construire*

---

## Ce que vous allez faire

Vous allez écrire un `plan.md` complet — parties et parcours — pour une application **qui n'est pas le club de lecture**. Vous allez le faire vous-même, avec votre carnet et votre tête, avant de demander quoi que ce soit à Claude.

C'est le test honnête : est-ce que les réflexes des Modules 1 et 2 sont vraiment ancrés, ou est-ce que vous avez juste suivi les instructions ?

**Durée :** 2-3 heures
**Ce qu'il vous faut :** VSCode, Claude Code, votre carnet, du calme

---

## Le contexte

Choisissez **un** de ces trois projets. Prenez celui qui vous parle le plus — vous allez passer du temps dessus, autant que ce soit un sujet qui vous intéresse.

### Option A : La cantine solidaire

Une association gère une cantine de quartier. Les bénévoles cuisinent, les habitants viennent manger pour un prix libre. L'association a besoin d'un site pour :
- Publier le menu de la semaine
- Gérer les inscriptions des bénévoles (qui cuisine quel jour)
- Permettre aux habitants de réserver un repas
- Suivre les dons (prix libre = chacun donne ce qu'il veut)
- Gérer les stocks d'ingrédients (ce qui reste, ce qu'il faut acheter)

### Option B : Le vide-grenier permanent

Un groupe de voisins veut organiser un vide-grenier en ligne, mais permanent. Chacun peut mettre en vente des objets, les autres peuvent les acheter ou proposer un troc. Il faut :
- Publier des annonces avec photos
- Gérer les messages entre vendeur et acheteur
- Organiser les échanges (lieu, horaire)
- Gérer les paiements (simulés) ou les trocs
- Laisser des avis après une transaction
- Signaler des annonces suspectes

### Option C : L'école de musique

Une petite école de musique gère ses cours, ses profs et ses élèves. Elle a besoin de :
- Planifier les cours (quel prof, quel instrument, quelle salle, quel horaire)
- Gérer les inscriptions des élèves aux cours
- Permettre aux élèves d'annuler ou reporter un cours
- Gérer les paiements mensuels (simulés)
- Organiser des concerts de fin de trimestre (inscription des élèves, réservation des places pour le public)

---

## Phase 1 — Réfléchir seul (45 min)

### Sortez votre carnet

Pas l'ordinateur. Le carnet. Vous allez réfléchir avant d'écrire.

> ✍️ Prenez le projet que vous avez choisi et répondez à ces questions, à la main :
>
> 1. **Qui sont les utilisateurs ?** Listez les types de personnes qui vont utiliser cette application. (Exemple pour le club de lecture : un membre, un admin.)
>
> 2. **Qu'est-ce que chaque type d'utilisateur veut faire ?** Listez les actions principales. Pas toutes — les 5 ou 6 plus importantes.
>
> 3. **Quelles sont les "parties" que vous voyez ?** Essayez de regrouper les fonctionnalités en parties distinctes. Pour chaque partie, notez ce qu'elle fait et — surtout — ce qu'elle ne fait PAS.
>
> 4. **Quelles actions traversent plusieurs parties ?** Ce sont vos futurs parcours. Notez-en au moins 3.
>
> 5. **Qu'est-ce qui peut mal tourner ?** Pour chaque parcours, notez au moins un cas d'échec.

Ne cherchez pas la perfection. Cherchez la clarté.

---

## Phase 2 — Écrire le plan (60 min)

### Ouvrez VSCode

Créez un nouveau dossier pour ce projet (par exemple `projet-cantine`, `projet-vide-grenier`, ou `projet-ecole-musique`). Initialisez git :

```bash
mkdir ~/projet-cantine
cd ~/projet-cantine
git init
```

Ouvrez ce dossier dans VSCode. Créez un fichier `plan.md`.

### Écrivez les parties

En vous basant sur vos notes du carnet, écrivez les parties dans `plan.md`. Suivez le format que vous connaissez :

```
PARTIE : [Nom]
→ Fait : [ce qu'elle fait, en une phrase]
→ Ne fait PAS : [ce qu'elle ne fait PAS, et qui le fait à la place]
→ A besoin de : [les autres parties dont elle dépend]
```

**Écrivez au moins 4 parties.** Chaque partie doit avoir une ligne "Ne fait PAS" — c'est non négociable. Si vous n'arrivez pas à écrire ce qu'une partie ne fait pas, c'est qu'elle fait trop de choses.

### Écrivez les parcours

Ajoutez au moins **3 parcours** à la suite des parties. Suivez le format :

```
PARCOURS : [Action complète]

Étape 1 → [Partie] : [ce qu'elle fait]
  Si ça rate : [ce qui se passe]
  Défaire : [comment on annule ce qui a été fait]

Étape 2 → [Partie] : ...
```

**Un de vos trois parcours doit inclure un cas d'annulation ou de retour en arrière.** C'est là que la vraie difficulté se cache.

### Le test du "et si ?"

Pour chaque parcours, posez-vous la question : **"Et si l'étape 3 échoue, qu'est-ce qui se passe pour les étapes 1 et 2 ?"** Si vous n'avez pas de réponse, votre parcours n'est pas fini.

---

## Phase 3 — Confronter à Claude (45 min)

### Sauvegardez d'abord

Avant de demander quoi que ce soit à Claude, committez votre plan :

```bash
git add plan.md
git commit -m "Mon plan initial, avant relecture par Claude"
```

C'est important : vous voulez garder une trace de votre travail *avant* que Claude y touche. Comme ça, vous pourrez comparer après.

### Demandez une critique, pas une réécriture

Lancez Claude Code :

```bash
claude
```

Et demandez-lui :

> Lis plan.md. C'est un plan d'application que j'ai écrit moi-même. Je veux que tu le critiques sans le réécrire. Dis-moi :
> 1. Est-ce qu'il y a des responsabilités qui se chevauchent entre les parties ?
> 2. Est-ce qu'il manque des parties évidentes ?
> 3. Pour chaque parcours, est-ce que les cas d'échec sont complets ?
> 4. Est-ce qu'il y a des parcours importants que j'ai oubliés ?
>
> Sois honnête et précis. Ne réécris rien — donne-moi juste tes observations.

### Améliorez votre plan

En fonction des retours de Claude, modifiez `plan.md` vous-même dans VSCode. Pas de "Claude, corrige ça pour moi" — c'est vous qui décidez quoi changer et comment.

Quand c'est fait, committez :

```bash
git add plan.md
git commit -m "Plan amélioré après critique de Claude"
```

---

## Phase 4 — Le vrai test (30 min)

### Demandez à Claude de construire

Restez dans Claude Code et demandez :

> Relis plan.md. Construis cette application de zéro en suivant le plan. Commence par la première partie. Les paiements et emails sont simulés.

Lancez le site et vérifiez que ça fonctionne.

Puis demandez-lui d'implémenter un de vos parcours et vérifiez que les cas d'erreur sont gérés.

### Ce que vous devez noter dans votre carnet

> ✍️ Est-ce que Claude a eu du mal à suivre votre plan ? Si oui, c'est probablement que le plan n'était pas assez clair — pas que Claude est mauvais.
>
> ✍️ Est-ce que les parcours se sont traduits naturellement en code qui gère les erreurs ?
>
> ✍️ Qu'est-ce que vous changeriez dans votre plan si vous deviez recommencer ?
>
> ✍️ Comparez les deux commits dans git (`git log --oneline`). Qu'est-ce que la critique de Claude a changé ?

---

## Avant de partir — sauvegardez

```bash
git add .
git commit -m "Projet libre 1 terminé"
```

---

## Auto-évaluation

Cochez honnêtement :

- [ ] J'ai écrit le plan moi-même avant de demander quoi que ce soit à Claude
- [ ] Chaque partie a une ligne "Ne fait PAS"
- [ ] J'ai au moins 3 parcours avec des cas d'échec
- [ ] Au moins un parcours gère un retour en arrière
- [ ] J'ai demandé à Claude de critiquer, pas de réécrire
- [ ] Le plan a été amélioré grâce à la critique
- [ ] L'application se lance et le parcours principal fonctionne

Si vous avez coché 5 ou plus : vous êtes prêt pour le Module 3.
Si vous avez coché moins de 5 : relisez vos notes des Modules 1 et 2, et réessayez. Pas de honte — c'est comme ça qu'on apprend.

---

## La suite

Le Module 3 va vous apprendre quoi faire quand `plan.md` devient trop gros. Pour l'instant, votre plan tient en une ou deux pages. Mais quand l'application grandit, Claude ne peut plus tout lire d'un coup. Il va falloir apprendre à **structurer l'information en niveaux** — comme une carte qui a plusieurs zooms.
