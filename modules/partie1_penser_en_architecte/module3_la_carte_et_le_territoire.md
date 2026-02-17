# Module 3 : La carte et le territoire

## *Quand votre plan devient trop gros pour tenir dans la conversation*

---

## Ce que vous savez déjà

Vous savez découper un projet en parties (Module 1). Vous savez décrire comment ces parties travaillent ensemble et ce qui se passe quand ça rate (Module 2). Votre `plan.md` ressemble maintenant à un vrai document de plusieurs pages — parties, parcours, cas d'erreur.

Et c'est là le problème.

**Durée :** 3-4 heures (en une ou deux sessions)
**Ce qu'il vous faut :** Votre projet du Module 2 (avec `plan.md`), Claude Code, votre carnet

---

## Avant de commencer : une analogie

Vous êtes perdu dans une ville que vous ne connaissez pas. Vous avez besoin d'un plan. Lequel préférez-vous ?

**Option A :** Une carte du monde entier, avec chaque rue de chaque ville, imprimée sur une feuille A4. Techniquement, l'information y est. Mais vous ne voyez rien — tout est minuscule et illisible.

**Option B :** Votre téléphone, avec Google Maps. Quand vous êtes dézoomé, vous voyez les quartiers. Quand vous zoomez, vous voyez les rues. Vous ne voyez jamais tout en même temps, mais vous voyez toujours **ce dont vous avez besoin au bon moment**.

En ce moment, votre `plan.md` c'est l'Option A. Tout est dedans — parties, parcours, détails — et Claude Code le lit en entier à chaque nouvelle conversation. Plus le projet grandit, plus le plan grandit, et plus Claude a du mal à s'y retrouver. Exactement comme vous avec la carte du monde imprimée en A4.

Ce module va vous apprendre à transformer votre plan en Option B : un système à **niveaux de zoom** qui montre à Claude exactement ce dont il a besoin, ni plus, ni moins.

---

## Étape 1 — Provoquer le problème (45 min)

### Ce que vous allez faire

Ouvrez le terminal intégré de VSCode et lancez Claude Code :

```bash
claude
```

Commencez par demander à Claude de lire tout le plan, puis de travailler sur une seule partie :

> Lis plan.md en entier. Je veux que tu améliores la partie "Prêts". Quand un membre demande à emprunter un livre, le propriétaire doit pouvoir accepter ou refuser. Si le propriétaire ne répond pas en 3 jours, la demande est automatiquement annulée. Implémente ça.

Lancez le site et vérifiez. Puis continuez avec d'autres demandes, en lui faisant relire le plan à chaque fois :

> Relis plan.md. Maintenant améliore la partie "Réunions" : ajoute la possibilité de mettre une réunion en liste d'attente quand elle est pleine.

> Relis plan.md. Maintenant améliore la partie "Statistiques" : ajoute un classement des membres les plus actifs par chapitre.

> Relis plan.md. Maintenant améliore la partie "Livres" : quand un livre est proposé, vérifie automatiquement s'il existe déjà dans un autre chapitre et propose de le récupérer au lieu de créer un doublon.

### 🔴 Ce que vous devez surveiller

**🚩 Claude résume ou ignore des morceaux du plan.**
Le plan est trop long. Claude ne vous le dit pas, mais il commence à "survoler" certaines parties. Vous le voyez quand il fait quelque chose qui contredit un parcours que vous aviez défini, ou quand il oublie une règle d'une partie qui n'est pas celle sur laquelle vous travaillez.

**🚩 Claude modifie des parties que vous n'avez pas demandé de toucher.**
Vous lui demandez de travailler sur "Prêts", mais il change quelque chose dans "Comptes" ou "Notifications" sans prévenir, parce qu'il a lu tout le plan et s'est dit que c'était lié.

**🚩 Claude vous donne des réponses de plus en plus longues et vagues.**
Quand il reçoit beaucoup d'information, Claude essaie de tout prendre en compte. Résultat : des réponses diluées qui parlent de tout sans rien faire de précis.

### Ce que vous devez noter dans votre carnet

> ✍️ Est-ce que Claude a respecté le plan ou est-ce qu'il a pris des libertés ?
> ✍️ Avez-vous eu l'impression qu'il lisait vraiment tout le plan ou qu'il survolait ?
> ✍️ Est-ce que Claude a modifié des fichiers qui n'avaient rien à voir avec votre demande ?

---

## Étape 2 — Comprendre le problème (15 min)

### Lisez ceci APRÈS avoir fait l'étape 1

Le Module 1 a résolu le problème de l'amnésie de Claude (en lui donnant un plan). Le Module 2 a résolu le problème de l'ordre des opérations (en décrivant des parcours). Maintenant, le problème c'est **le bruit**.

Quand Claude lit `plan.md` en entier pour travailler sur la partie "Prêts", il avale une tonne d'information sur les Comptes, les Réunions, les Statistiques, les Notifications... dont il n'a pas besoin. C'est comme si vous demandiez à un plombier de réparer un robinet et que vous lui donniez les plans de toute la maison, y compris le circuit électrique du grenier et la disposition des meubles du salon.

Le plombier va peut-être quand même trouver le robinet. Mais il va perdre du temps à comprendre ce qui est pertinent. Et il risque de se dire "tiens, tant que j'y suis, je vais déplacer ce tuyau dans la salle de bain" — alors que vous ne lui avez rien demandé.

**Ce dont le plombier a besoin, c'est :**
1. Le plan de la cuisine (la pièce où il travaille)
2. Un schéma montrant où arrive l'eau et où elle repart (ses connexions avec le reste de la maison)
3. C'est tout.

Il n'a pas besoin de savoir combien de prises il y a dans le salon. Il a besoin de savoir d'où vient l'eau et où elle va. Le reste ne le concerne pas.

---

## Étape 3 — Créer les fiches (60 min)

### L'idée clé

Vous allez transformer votre `plan.md` en **plusieurs fichiers** organisés sur deux niveaux :

**Niveau 1 — La vue d'ensemble** (`plan.md`). Une version courte qui tient en une vingtaine de lignes. Pour chaque partie, juste le nom, une phrase sur ce qu'elle fait, et surtout : **ce qu'on peut lui demander et ce qu'elle répond**. Pas les détails internes.

**Niveau 2 — Les fiches détaillées** (un fichier par partie, dans un dossier `fiches/`). Chaque fiche contient tous les détails internes d'une partie, les parcours qui la concernent, ses règles. Claude ne lira qu'une fiche à la fois — celle de la partie sur laquelle vous travaillez.

### Préparer les dossiers

Créez le dossier pour les fiches :

```bash
mkdir fiches
```

Vous devriez le voir apparaître dans le panneau gauche de VSCode.

### Demander à Claude de restructurer

Quittez Claude Code (`/exit`) et relancez-le pour repartir frais :

```bash
claude
```

Demandez-lui :

> Lis plan.md. Il contient le plan complet de mon application : les parties et les parcours. J'ai besoin de le transformer en deux niveaux.
>
> NIVEAU 1 — Réécris plan.md pour n'y garder que la vue d'ensemble. Pour chaque partie, écris seulement :
> - Son nom
> - Ce qu'elle fait (une phrase)
> - Sa "porte d'entrée" : la liste des demandes qu'on peut lui faire, et ce qu'elle répond. Comme un guichet : "vous pouvez me demander X, je vous répondrai Y."
>
> NIVEAU 2 — Crée une fiche par partie dans le dossier fiches/. Chaque fiche est un fichier séparé (par exemple fiches/prets.md, fiches/comptes.md, etc.). Chaque fiche contient :
> - Tout le détail interne de la partie
> - Les parcours dans lesquels elle intervient
> - Ses règles spécifiques
>
> Écris tout ça en français simple.

### Ce que Claude va créer

**`plan.md`** (la vue d'ensemble) ressemblera à ça :

```
VUE D'ENSEMBLE — Club de lecture

PARTIE : Comptes
Fait : gère qui est qui (inscription, connexion)
Porte d'entrée :
  - "Ce membre existe ?" → oui/non
  - "Créer un compte" → compte créé ou erreur
  - "Qui est ce membre ?" → nom, email, date d'inscription

PARTIE : Droits d'accès
Fait : gère qui a le droit de faire quoi
Porte d'entrée :
  - "Ce membre peut-il faire cette action ?" → oui/non
  - "Donner le rôle admin à ce membre" → fait ou erreur

PARTIE : Livres
Fait : gère le catalogue de livres, les propositions, les votes
Porte d'entrée :
  - "Ajouter un livre" → livre ajouté ou erreur (doublon)
  - "Voter pour ce livre" → vote enregistré
  - "Quels livres dans cette catégorie ?" → liste de livres

PARTIE : Prêts
Fait : gère les emprunts de livres entre membres
Porte d'entrée :
  - "Demander à emprunter ce livre" → demande envoyée au propriétaire
  - "Accepter/refuser une demande" → prêt confirmé ou refusé
  - "Signaler un retour" → prêt terminé

...etc.
```

**`fiches/prets.md`** (une fiche détaillée) ressemblera à ça :

```
FICHE DÉTAILLÉE : Prêts

Ce que cette partie fait :
  Gère les emprunts de livres entre membres du club.

Ce qu'elle ne fait PAS :
  - Ne gère pas le catalogue de livres (c'est Livres)
  - Ne gère pas les notifications (c'est Notifications)
  - Ne vérifie pas les droits d'accès elle-même (c'est Droits d'accès)

Porte d'entrée :
  - "Demander à emprunter" → vérifie que le livre est disponible,
    crée une demande en attente, demande à Notifications de prévenir
    le propriétaire. Répond : demande créée (avec un numéro).
  - "Accepter une demande" → marque le livre comme emprunté,
    demande à Notifications de prévenir l'emprunteur.
    Répond : prêt confirmé.
  - "Refuser une demande" → annule la demande, demande à Notifications
    de prévenir l'emprunteur. Répond : demande refusée.
  - "Signaler un retour" → marque le livre comme disponible,
    demande à Notifications de prévenir le propriétaire.
    Répond : retour enregistré.

Règles internes :
  - Une demande non répondue expire après 3 jours
  - Un membre ne peut pas emprunter plus de 3 livres en même temps
  - Un membre banni : tous ses prêts en cours déclenchent un retour forcé

Parcours liés :
  - "Emprunt de livre" (voir parcours complet)
  - "Bannissement d'un membre" (étape : retour forcé des prêts)
```

### Vérifiez le résultat

Regardez dans VSCode : vous devriez voir `plan.md` (devenu plus court) et un dossier `fiches/` avec un fichier par partie. Ouvrez-en quelques-uns, relisez-les, corrigez ce qui ne vous semble pas logique.

### Pourquoi les "portes d'entrée" changent tout

Regardez bien la vue d'ensemble. Chaque partie a une liste de choses qu'on peut lui demander et ce qu'elle répond. C'est exactement comme un guichet administratif :

- Vous allez au guichet "État civil" pour un acte de naissance. Vous ne lui demandez pas un permis de conduire.
- Vous n'avez pas besoin de savoir comment le guichet fonctionne en interne. Vous avez juste besoin de savoir **ce que vous pouvez lui demander et ce qu'il vous rend**.

C'est ça, une "porte d'entrée" : la liste de ce qu'on peut demander à une partie, vue de l'extérieur. L'intérieur de la partie (comment elle stocke les données, comment elle calcule les choses, dans quel ordre elle fait ses opérations) n'intéresse que celui qui travaille dessus.

**C'est la séparation la plus importante de ce cours : l'extérieur (ce qu'on peut demander) vs l'intérieur (comment ça marche).**

---

## Étape 4 — Travailler avec les niveaux de zoom (45 min)

### Ce que vous allez faire

Quittez Claude Code (`/exit`) et relancez-le :

```bash
claude
```

Maintenant, quand vous voulez travailler sur une partie, vous demandez à Claude de lire **deux fichiers** :
1. `plan.md` (la vue d'ensemble) — pour qu'il sache ce qui existe
2. La fiche de la partie concernée — pour qu'il ait les détails

Essayez :

> Lis plan.md et fiches/prets.md. Je veux améliorer les Prêts : quand un livre est en retard depuis plus de 2 semaines, le propriétaire doit pouvoir envoyer un rappel. Après 4 semaines, le prêt est signalé à l'admin. Implémente ça.

Lancez le site et vérifiez que ça fonctionne.

### 🟢 Ce que vous allez remarquer

**Claude est plus précis.** Il ne se perd plus dans des détails sur les Réunions ou les Statistiques. Il se concentre sur les Prêts.

**Claude respecte les frontières.** Quand il a besoin de Notifications pour envoyer le rappel, il ne réécrit pas le système de notifications. Il utilise la porte d'entrée — il sait ce qu'il peut demander à Notifications, mais pas comment ça marche en interne.

**Claude ne touche pas aux autres parties.** Parce qu'il ne connaît que leur porte d'entrée (dans `plan.md`), pas leur fonctionnement interne. Il ne peut pas les modifier même s'il le voulait.

**Comparez avec l'étape 1.** Même demande, mais Claude a moins d'information à digérer. Le résultat est plus ciblé.

### Mettez à jour la fiche

Après que Claude a implémenté la fonctionnalité, demandez-lui :

> Mets à jour fiches/prets.md avec les nouvelles règles que tu viens d'implémenter (rappel à 2 semaines, signalement à 4 semaines).

Les fiches doivent rester synchronisées avec le code. C'est comme mettre à jour un dossier après un changement de procédure.

### Ce que vous devez noter dans votre carnet

> ✍️ Est-ce que les réponses de Claude sont plus courtes et plus précises qu'à l'étape 1 ?
> ✍️ Est-ce que Claude a essayé de modifier une partie autre que les Prêts ?
> ✍️ Quand Claude a eu besoin d'une autre partie, est-ce qu'il a utilisé la porte d'entrée ou est-ce qu'il a inventé sa propre solution ?

---

## Étape 5 — Écrire une fiche vous-même (30 min)

### Ce que vous allez faire

Jusqu'ici, c'est Claude qui a écrit toutes les fiches. Il est temps que vous en écriviez une vous-même.

Imaginez que votre club de lecture veut ajouter une nouvelle partie : **Événements spéciaux** — des soirées thématiques, des rencontres avec des auteurs, des ateliers d'écriture. Ce n'est pas la même chose que les réunions régulières.

Ouvrez VSCode et créez un nouveau fichier `fiches/evenements.md`. Écrivez la fiche vous-même, en suivant le même format que les autres fiches :

- Ce que cette partie fait
- Ce qu'elle ne fait PAS
- Porte d'entrée (les demandes qu'on peut lui faire et ce qu'elle répond)
- Règles internes
- Parcours liés

Pas besoin que ce soit parfait. Écrivez ce qui vous semble logique.

### Faites critiquer par Claude

Quand c'est fait, lancez Claude Code et demandez-lui :

> Lis plan.md et fiches/evenements.md. J'ai écrit cette fiche moi-même pour une nouvelle partie "Événements spéciaux". Critique-la sans la réécrire. Dis-moi :
> 1. Est-ce que la porte d'entrée est complète ?
> 2. Est-ce qu'il y a des chevauchements avec les Réunions ?
> 3. Est-ce qu'il manque des règles internes ?
> 4. Est-ce qu'il faut mettre à jour plan.md pour ajouter cette nouvelle partie ?

Corrigez votre fiche vous-même en fonction des retours, puis demandez à Claude de mettre à jour `plan.md` avec la nouvelle partie.

### Ce que vous devez noter dans votre carnet

> ✍️ Qu'est-ce que Claude a trouvé que vous aviez oublié ?
> ✍️ Quelle a été la partie la plus difficile à écrire ? (Probablement le "Ne fait PAS" — savoir où finit votre partie et où commence une autre)

---

## Étape 6 — Le test des deux conversations (30 min)

### Ce que vous allez faire

Avant de commencer, sauvegardez votre état actuel — vous allez faire travailler deux conversations en parallèle sur les mêmes fichiers, et il vaut mieux avoir un point de retour :

```bash
git add .
git commit -m "Module 3 : avant travail parallèle"
```

Si une des deux conversations fait n'importe quoi, `git checkout .` vous ramènera ici.

Ouvrez **deux terminaux** dans VSCode. Pour en ouvrir un deuxième, cliquez sur le `+` dans le panneau du terminal. Lancez `claude` dans chacun. Vous avez maintenant deux Claude Code côte à côte.

**Terminal A :**
> Lis plan.md et fiches/prets.md. Améliore les Prêts pour gérer les livres abîmés : quand un livre est rendu abîmé, le propriétaire peut signaler le dégât et demander un remplacement.

**Terminal B :**
> Lis plan.md et fiches/reunions.md. Améliore les Réunions pour ajouter un système de covoiturage : les membres peuvent proposer ou chercher un trajet pour se rendre à la réunion.

### Ce que vous allez observer

Les deux conversations avancent **sans se gêner**. La conversation A ne touche qu'aux Prêts. La conversation B ne touche qu'aux Réunions. Et quand l'une a besoin de l'autre (par exemple, Réunions a besoin de Notifications pour prévenir les covoitureurs), elle utilise la porte d'entrée — pas le détail interne.

C'est comme si vous aviez deux artisans qui travaillent chacun dans une pièce différente de l'appartement. Ils ne se marchent pas dessus parce que chacun ne voit que sa pièce et les portes qui mènent aux autres.

### Le déclic

Vous venez de faire quelque chose de puissant : vous avez **parallélisé le travail**. Deux conversations, deux parties, en même temps, sans conflit. C'est possible uniquement parce que vous avez séparé ce que chaque partie montre aux autres (la porte d'entrée) de ce qu'elle fait en interne (la fiche détaillée).

Si tout était dans un seul gros `plan.md`, ça serait impossible. Les deux conversations modifieraient le même document et créeraient des contradictions.

---

## Étape 7 — Mettre à jour la vue d'ensemble (15 min)

### Ce que vous allez faire

Après avoir amélioré les Prêts et les Réunions, vos fiches détaillées ont changé. Est-ce que `plan.md` doit changer aussi ?

Vérifiez :

- Est-ce que les Prêts ont une nouvelle porte d'entrée ? (Oui : "Signaler un livre abîmé" → demande de remplacement créée). Il faut l'ajouter à `plan.md`.
- Est-ce que les Réunions ont une nouvelle porte d'entrée ? (Oui : "Proposer un covoiturage", "Chercher un covoiturage"). Il faut l'ajouter.
- Est-ce que le fonctionnement interne des Prêts a changé ? (Oui : nouvelle règle sur les livres abîmés). Ça va dans la fiche, PAS dans `plan.md`.

Demandez à Claude Code de faire les mises à jour :

> Lis plan.md, fiches/prets.md et fiches/reunions.md. Les fiches ont été mises à jour avec de nouvelles fonctionnalités. Mets à jour plan.md pour refléter les nouvelles portes d'entrée, sans ajouter de détails internes.

### La règle d'or

**`plan.md` ne change que quand une porte d'entrée change.** Si vous modifiez comment une partie fonctionne en interne sans changer ce qu'on peut lui demander, `plan.md` reste identique.

C'est exactement comme un distributeur automatique. Si le mécanicien change les rouages à l'intérieur, vous ne le voyez pas — vous appuyez sur les mêmes boutons et vous recevez les mêmes produits. Mais si le distributeur ajoute une nouvelle boisson, il y a un nouveau bouton. C'est CE changement qui apparaît dans la vue d'ensemble.

---

## Ce que vous avez appris

### En une phrase

**Quand un projet grandit, il faut montrer à l'IA la bonne quantité d'information : assez pour qu'elle comprenne le contexte, pas trop pour qu'elle se noie.**

### Les trois nouveaux réflexes

7. **Séparez la vue d'ensemble des fiches détaillées.** `plan.md` montre toutes les parties et leurs portes d'entrée. Les fiches dans `fiches/` contiennent le détail interne d'une seule partie.

8. **Travaillez une partie à la fois.** Demandez à Claude de lire `plan.md` + la fiche de la partie concernée. Pas tout le dossier `fiches/`.

9. **Distinguez l'extérieur de l'intérieur.** Ce qu'on peut demander à une partie (sa porte d'entrée) et comment elle fonctionne en interne sont deux choses différentes. L'un est public, l'autre est privé.

### Votre dossier de projet

```
formation-ia/
├── plan.md                  ← vue d'ensemble (toujours lu)
├── fiches/
│   ├── comptes.md           ← détails internes + parcours
│   ├── droits-acces.md
│   ├── livres.md
│   ├── prets.md
│   ├── reunions.md
│   ├── notifications.md
│   ├── statistiques.md
│   └── evenements.md        ← votre fiche !
└── (code de l'application)
```

### Ce qu'on n'a toujours pas fait

On n'a toujours pas :
- Appris un langage de programmation
- Compris le code que Claude écrit

Mais remarquez ce qu'on SAIT faire maintenant. On sait :
- Découper un projet en parties avec des responsabilités claires (Module 1)
- Décrire comment elles travaillent ensemble et gèrent les erreurs (Module 2)
- Contrôler l'information qu'on donne à l'IA pour rester efficace (Module 3)

Ce sont les mêmes compétences qu'un architecte logiciel professionnel. Juste sans le jargon.

---

## Avant de partir — sauvegardez

```bash
git add .
git commit -m "Module 3 terminé : vue d'ensemble et fiches détaillées"
```

---

## La suite

Dans le Module 4, on va affronter la question la plus difficile : **comment savoir si ce que Claude a construit marche vraiment ?** Vous lui faites confiance depuis le début — mais comment vérifier qu'un paiement qui "marche" marche vraiment ? Qu'une annulation annule vraiment tout ? On va apprendre à écrire des **scénarios de vérification** — sans savoir lire le code.
