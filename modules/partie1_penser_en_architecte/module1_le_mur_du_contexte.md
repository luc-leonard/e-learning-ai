# Module 1 : Pourquoi ça part en vrille

## *Votre premier projet avec l'IA — et votre première catastrophe*

---

## Ce que vous savez déjà

Vous avez un terminal, VSCode, git, et Claude Code. Vous savez créer un dossier, lancer Claude Code, et sauvegarder votre travail avec git. C'est tout ce qu'il vous faut.

Ce qu'on va faire : vous allez demander à Claude Code de construire quelque chose pour vous. Ça va très bien se passer au début. Puis ça va partir en vrille. Et c'est exactement le but.

**Durée :** 4-5 heures (en une ou deux sessions)
**Ce qu'il vous faut :** Votre dossier `formation-ia` ouvert dans VSCode, Claude Code, votre carnet

---

## Avant de commencer : une analogie

Imaginez que vous rénovez un appartement. Vous engagez un artisan incroyablement rapide et compétent. Il sait tout faire : plomberie, électricité, peinture, carrelage.

Mais il a un problème : **il a une mémoire de poisson rouge.**

Chaque matin, il oublie ce qu'il a fait la veille. Si vous lui dites "installe un évier dans la cuisine", il le fait parfaitement. Mais si le lendemain vous dites "ajoute un lave-vaisselle à côté de l'évier", il y a un risque qu'il ne se souvienne plus exactement où il a mis les tuyaux de l'évier. Alors il va en poser de nouveaux. Maintenant vous avez deux réseaux de tuyaux qui ne communiquent pas.

Au bout de deux semaines de travaux, votre appartement *fonctionne*, techniquement. Mais derrière les murs, c'est un cauchemar.

Claude Code, c'est cet artisan. Brillant, rapide, et amnésique. Ce module va vous apprendre à devenir le **chef de chantier** qui lui donne un plan à suivre.

---

## Étape 1 — Demandez quelque chose de simple (30 min)

### Ce que vous allez faire

Ouvrez le terminal intégré de VSCode (`` Ctrl + ` ``). Vérifiez que vous êtes dans votre dossier `formation-ia` (`pwd`), puis lancez Claude Code :

```bash
claude
```

Envoyez-lui ce message :

> Crée-moi un site web simple pour un club de lecture. Les membres doivent pouvoir :
> - Voir la liste des livres qu'on a lus
> - Proposer un nouveau livre
> - Voter pour le prochain livre à lire
>
> Utilise Node.js avec Express pour le serveur, SQLite pour la base de données, et Pico.css chargé depuis un CDN pour le style. Fais quelque chose de simple et joli.

### Ce qui va se passer

Claude Code va créer des fichiers dans votre dossier. Vous les verrez apparaître dans le panneau gauche de VSCode en temps réel. Vous n'avez pas besoin de comprendre le code — ce qui compte, c'est que ça marche.

### Lancer le site

Claude Code va probablement vous dire qu'il faut **installer les <dfn title="Les outils supplémentaires dont le projet a besoin pour fonctionner — comme des ingrédients qu'il faut acheter avant de cuisiner">dépendances</dfn>** puis **lancer le site**. Il va peut-être exécuter ces commandes lui-même, ou vous donner les commandes à taper.

Si Claude Code vous donne des commandes à exécuter, **tapez-les vous-même** dans le terminal. C'est important : même si vous ne comprenez pas tout, vous devez savoir que lancer un site, c'est une commande dans le terminal. Quelque chose comme :

```bash
npm install
npm start
```

L'essentiel est de comprendre le principe : **installer** (une seule fois) puis **lancer** (à chaque fois que vous voulez voir le site).

Une fois lancé, Claude vous dira d'ouvrir votre navigateur à une adresse comme `http://localhost:3000`. Faites-le. Vous devriez voir votre site de club de lecture.

Si ça ne marche pas du premier coup, dites simplement à Claude Code ce que vous voyez (le message d'erreur, ou "rien ne se passe") et laissez-le corriger. C'est normal que ça prenne quelques allers-retours.

### Ce que vous devez noter dans votre carnet

> ✍️ Est-ce que ça a marché du premier coup ?
> ✍️ Quelle commande lance le site ? Notez-la — vous en aurez besoin.
> ✍️ Comment vous sentez-vous ? (Normalement : impressionné, enthousiaste)

---

## Étape 2 — Demandez-lui d'ajouter des choses (2h)

### Ce que vous allez faire

**Ne quittez pas Claude Code.** Restez dans la même session — c'est important pour la suite de l'expérience.

Envoyez ces demandes une par une, dans l'ordre. Attendez que Claude Code ait fini chacune avant de passer à la suivante. Après chaque demande, relancez le site et vérifiez dans votre navigateur que ça fonctionne.

> **Demande 1 :** "Ajoute un système de compte. Les gens doivent pouvoir s'inscrire avec un email et un mot de passe, et on doit voir qui a proposé quel livre."

> **Demande 2 :** "Les membres veulent pouvoir écrire une critique après avoir lu le livre. Ajoute ça."

> **Demande 3 :** "Ajoute des catégories de livres (roman, SF, polar, etc.) et la possibilité de filtrer par catégorie."

> **Demande 4 :** "L'admin du club veut pouvoir supprimer des propositions inappropriées et bannir des membres. Ajoute un rôle administrateur."

> **Demande 5 :** "Les membres veulent recevoir un email quand un nouveau livre est choisi. Ajoute des notifications."

> **Demande 6 :** "Ajoute un calendrier des réunions du club. Les membres peuvent indiquer s'ils viennent ou pas."

> **Demande 7 :** "On veut un système de prêt : les membres qui possèdent un livre peuvent le signaler, et d'autres membres peuvent demander à l'emprunter."

> **Demande 8 :** "Ajoute une page de statistiques : livres les plus populaires, membre le plus actif, catégorie préférée du club, etc."

> **Demande 9 :** "Le club veut s'ouvrir à d'autres villes. Il faut pouvoir créer des 'chapitres' locaux avec chacun leur propre liste de livres et réunions, mais un catalogue commun."

> **Demande 10 :** "Tout doit marcher aussi sur téléphone, et les gens veulent pouvoir consulter les livres même sans connexion internet."

### 🔴 Ce que vous devez surveiller

À un moment pendant ces demandes — probablement entre la 4ème et la 7ème — vous allez commencer à remarquer des choses étranges. Voici ce qu'il faut guetter :

**🚩 Claude vous redemande des choses que vous avez déjà décidées.**
Par exemple, vous aviez déjà un système de comptes, mais pour les notifications, il recrée quelque chose de différent pour identifier les utilisateurs.

**🚩 Le site ne se lance plus.**
Claude Code modifie des fichiers qui dépendent les uns des autres. À un moment, une modification casse quelque chose qui marchait avant. Vous tapez la commande pour lancer le site, et il y a des erreurs.

**🚩 Les nouvelles fonctionnalités cassent les anciennes.**
Le système de prêt ne sait pas que les livres ont des catégories. Les statistiques ne comptent pas les réunions. Les chapitres locaux ne fonctionnent pas avec le système de vote.

**🚩 Claude se contredit.**
Dans un message il organise les choses d'une certaine façon, dans le suivant il le fait autrement, sans expliquer pourquoi.

### Ce que vous devez noter dans votre carnet

> ✍️ À quelle demande avez-vous senti que quelque chose n'allait plus ?
> ✍️ Combien de fois avez-vous dû dire à Claude "non, ça existait déjà" ou "tu oublies que..." ?
> ✍️ Est-ce que le site se lance encore ? Si non, à partir de quelle demande ?
> ✍️ Comment vous sentez-vous ? (Normalement : frustré, perdu, ou les deux)

---

## Étape 3 — Comprendre ce qui s'est passé (15 min)

### Lisez ceci APRÈS avoir fait l'étape 2

Vous venez de vivre exactement ce que vivent les développeurs professionnels depuis des décennies. Ce que vous avez ressenti a un nom : la **dette technique**. C'est quand un projet devient de plus en plus difficile à modifier parce que personne n'a planifié comment les morceaux s'emboîtent.

Mais pourquoi est-ce que ça s'est passé ? Vous aviez pourtant une IA ultra-compétente.

Voici l'explication, et elle est simple :

**Claude est comme un chef cuisinier avec une toute petite table de travail.**

Imaginez un chef brillant qui peut préparer n'importe quel plat. Mais sa table de travail est petite. Au début du repas, il a de la place : il voit tous ses ingrédients, toutes les assiettes en cours. Mais au fur et à mesure qu'il cuisine, la table se remplit. Les anciens plats sont poussés au bord, puis tombent par terre. Le chef continue de cuisiner, mais il ne voit plus ce qu'il a préparé avant. Alors quand vous lui demandez un dessert qui doit aller avec l'entrée, il ne se souvient plus de l'entrée.

C'est exactement ce qui arrive avec Claude Code. Sa "table de travail" a une taille limitée. Au début de la conversation, il voit tout. Après 10 demandes, les premières décisions sont floues ou oubliées.

**Le problème, ce n'est pas l'IA. C'est l'absence de plan.**

Personne n'a donné au chef un menu écrit. Personne n'a dit "l'entrée est une salade de tomates, le plat principal est du poisson, le dessert doit être léger pour aller avec". Si le chef avait ce menu sous les yeux en permanence, il n'oublierait rien — parce qu'il n'aurait pas besoin de s'en souvenir.

---

## Étape 4 — Construire un plan (45 min)

### Ce que vous allez faire

Quittez Claude Code (`/exit`). Vous allez d'abord écrire un **plan de votre application**. Pas du code. Pas un schéma technique. Juste une description en français normal de comment votre club de lecture est organisé.

Dans VSCode, créez un nouveau fichier et enregistrez-le sous le nom `plan.md` dans votre dossier `formation-ia`. Ce fichier va devenir le document le plus important de votre projet.

Maintenant, relancez Claude Code :

```bash
claude
```

Et demandez-lui :

> J'ai construit un site pour un club de lecture qui a les fonctionnalités suivantes : comptes utilisateurs, propositions et votes de livres, critiques, catégories, administration, notifications, calendrier de réunions, prêts de livres, statistiques, chapitres locaux multi-villes, mode mobile et hors-ligne. Le projet est devenu chaotique. Aide-moi à écrire un plan simple dans le fichier plan.md qui découpe le projet en "parties" distinctes. Chaque partie doit avoir :
> - Un nom simple
> - Ce qu'elle fait (en une phrase)
> - Ce qu'elle ne fait PAS (c'est très important)
> - De quelles autres parties elle a besoin
>
> Écris ça en français courant, pas en jargon technique. Comme si tu expliquais l'organisation d'une entreprise avec ses départements.
>
> Note également en tête du fichier la stack technique utilisée : le framework et le type de base de données.

### Pourquoi "ce qu'elle ne fait PAS" ?

C'est la clé de tout ce module. C'est contre-intuitif, mais dans n'importe quelle organisation, **ce qui crée le bazar, c'est quand tout le monde fait un peu de tout.**

Pensez à un restaurant :
- Le serveur prend les commandes. **Il ne cuisine PAS.**
- Le cuisinier prépare les plats. **Il ne fait PAS le service.**
- Le caissier encaisse. **Il ne prend PAS les commandes.**

Si le serveur se met à cuisiner "pour aider", il y a des plats qui sortent deux fois, d'autres jamais. C'est exactement ce qui est arrivé à votre application : Claude a laissé chaque nouvelle fonctionnalité faire un peu le travail des autres, et tout est devenu un plat de nouilles.

### Ce que Claude va vous donner

Claude Code va écrire dans `plan.md` quelque chose qui ressemble à ça (mais adapté à votre projet) :

```
STACK TECHNIQUE
→ Serveur : Node.js + Express
→ Base de données : SQLite
→ Style : Pico.css (CDN)

PARTIE : Comptes
→ Fait : gérer l'inscription, la connexion, savoir qui est qui
→ Ne fait PAS : décider ce que chaque personne a le droit de faire (c'est Droits d'accès)
→ A besoin de : rien, c'est la base

PARTIE : Droits d'accès
→ Fait : définir qui est admin, qui est membre, qui peut faire quoi
→ Ne fait PAS : gérer les mots de passe ou les emails (c'est Comptes)
→ A besoin de : Comptes

PARTIE : Livres
→ Fait : la liste des livres, les propositions, les catégories, les votes
→ Ne fait PAS : les critiques (c'est Critiques), les prêts (c'est Prêts)
→ A besoin de : Comptes (pour savoir qui propose)

PARTIE : Critiques
→ Fait : les avis écrits par les membres après lecture
→ Ne fait PAS : gérer la liste des livres (c'est Livres)
→ A besoin de : Comptes, Livres

...et ainsi de suite.
```

Relisez le plan dans VSCode. Modifiez-le si quelque chose ne vous semble pas logique — c'est **votre** plan, pas celui de Claude. Puis quittez Claude Code.

---

## Repartir de zéro

Le code actuel est un chaos. On ne va pas essayer de le réparer — on va le jeter et reconstruire proprement avec le plan.

Mais attention : vous venez d'écrire `plan.md`, et vous ne voulez pas le perdre. La solution : **committer uniquement le plan**, puis jeter le reste.

```bash
git add plan.md
git commit -m "Module 1 : ajout du plan"
```

Remarquez qu'on n'utilise pas `git add .` cette fois. On ajoute **un seul fichier**. Le code chaotique n'est pas inclus dans le commit.

Maintenant, jetez tout le code cassé :

```bash
git checkout .
```

Cette commande veut dire : "jette tous les changements en cours et reviens au dernier commit". C'est le `Ctrl+Z` de git. Elle ne supprime que les modifications — vos commits sont en sécurité.

Vérifiez dans VSCode : le code chaotique a disparu, mais `plan.md` est toujours là parce qu'il a été commité juste avant.

### Donner une mémoire permanente à Claude Code

C'est le bon moment pour introduire une commande importante : `/init`.

Relancez Claude Code :

```bash
claude
```

Puis tapez cette commande directement dans Claude Code (pas dans le terminal) :

```
/init
```

Claude Code analyse votre dossier et crée un fichier `CLAUDE.md`. Ce fichier est spécial : **Claude le relit automatiquement au début de chaque nouvelle conversation.** Là où `plan.md` décrit l'organisation de votre projet, `CLAUDE.md` donne le contexte permanent — ce qu'est ce projet, comment il est structuré.

Pour l'instant votre dossier ne contient que `plan.md`, donc le `CLAUDE.md` sera court. C'est normal. Il servira surtout à ancrer le contexte pour les prochaines sessions : Claude saura dès le départ qu'il travaille sur un club de lecture et que le plan de référence est dans `plan.md`.

Quittez Claude Code (`/exit`), puis sauvegardez :

```bash
git add CLAUDE.md
git commit -m "Module 1 : ajout CLAUDE.md"
```

---

## Étape 5 — Reconstruire, cette fois avec le plan (60-90 min)

### Ce que vous allez faire

Relancez Claude Code :

```bash
claude
```

Cette fois, vous allez demander à Claude de **reconstruire de zéro** en suivant le plan. La stack technique est notée dans `plan.md`, donc Claude la connaît — plus besoin de la lui répéter. Demandez-lui :

> Lis le fichier plan.md. C'est le plan de mon application. Supprime tout le code existant et reconstruis l'application de zéro en suivant ce plan. Utilise la stack technique indiquée dans plan.md. Commence par la partie "Comptes" : cette partie gère UNIQUEMENT l'inscription et la connexion.

Puis, pour chaque partie suivante :

> Relis plan.md. Maintenant, crée la partie "Livres". Rappel : les votes sont dans cette partie, mais les critiques sont séparées.

Et ainsi de suite pour chaque partie. À chaque étape, lancez le site pour vérifier que ça marche avant de passer à la suivante.

### 🟢 Ce que vous allez remarquer

**C'est un monde de différence.** Parce que Claude a le plan sous les yeux :

- Il ne recrée pas des choses qui existent déjà
- Il respecte les limites ("ah oui, les critiques c'est une autre partie, je ne les mets pas ici")
- Quand une partie a besoin d'une autre, il fait la connexion proprement
- Vous pouvez travailler partie par partie sans que tout s'écroule

### Ce que vous devez noter dans votre carnet

> ✍️ Est-ce que c'était plus facile cette fois ?
> ✍️ Est-ce que Claude s'est contredit ? (Normalement : beaucoup moins, voire pas du tout)
> ✍️ Est-ce que le site se lance toujours après chaque partie ajoutée ?
> ✍️ Est-ce que vous comprenez mieux votre propre projet maintenant ?

---

## Étape 6 — Le test final (15 min)

### Ce que vous allez faire

Demandez à Claude Code :

> Relis plan.md. Les membres veulent pouvoir créer des quiz sur les livres qu'ils ont lus. Où est-ce que ça devrait aller dans le plan ? Est-ce que c'est une nouvelle partie ou ça rentre dans une partie existante ? Mets à jour plan.md avec ta recommandation.

### Le déclic

Si vous arrivez à répondre à cette question — même partiellement, même avant Claude — alors vous avez compris le principe. Vous n'avez pas besoin de savoir coder pour savoir que les quiz sont probablement **une nouvelle partie** qui a besoin de "Livres" et de "Comptes", et qui ne fait PAS partie de "Critiques" même si les deux concernent les livres.

Vous pensez en termes de **responsabilités** et de **limites**. Et c'est la compétence la plus importante quand on travaille avec l'IA.

---

## Ce que vous avez appris

### En une phrase

**L'IA sait construire. Mais c'est vous qui devez décider comment organiser ce qu'elle construit.** Sans plan, même l'IA la plus intelligente du monde produit du chaos.

### Les trois réflexes à retenir

1. **Écrivez le plan avant de construire.** Pas après. Pas pendant. Avant.

2. **Donnez le plan à l'IA à chaque fois.** L'IA oublie. Votre plan est sa mémoire.

3. **Définissez ce que chaque partie NE fait PAS.** C'est ça qui empêche le bazar.

### Ce qu'on n'a PAS fait dans ce module

Remarquez qu'on n'a jamais eu besoin de :
- Comprendre le code que Claude a écrit
- Apprendre un langage de programmation

On a juste eu besoin de **réfléchir à l'organisation**. Le reste, c'est le travail de l'IA.

---

## Avant de partir — sauvegardez

Vous avez un projet reconstruit avec un plan. Sauvegardez-le :

```bash
git add .
git commit -m "Module 1 terminé : reconstruction avec plan"
```

---

## La suite

Dans le Module 2, on va découvrir un nouveau problème : même avec un bon plan, les choses se compliquent quand les parties doivent **se parler entre elles**. Que se passe-t-il quand quelqu'un s'inscrit à une réunion qui est annulée pendant qu'il paie ? On va apprendre à penser à ce qui se passe *dans le temps*, pas seulement *dans l'espace*.
