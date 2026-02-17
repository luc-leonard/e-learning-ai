# Module 3 : La carte et le territoire

## *Quand votre plan devient trop gros pour tenir dans la conversation*

---

## Ce que vous savez déjà

Vous savez découper un projet en parties (Module 1). Vous savez décrire comment ces parties travaillent ensemble et ce qui se passe quand ça rate (Module 2). Votre plan ressemble maintenant à un vrai document de plusieurs pages.

Et c'est là le problème.

**Durée :** 2-3 heures
**Ce qu'il vous faut :** Votre plan des Modules 1 et 2, un compte Claude, votre carnet

---

## Avant de commencer : une analogie

Vous êtes perdu dans une ville que vous ne connaissez pas. Vous avez besoin d'un plan. Lequel préférez-vous ?

**Option A :** Une carte du monde entier, avec chaque rue de chaque ville, imprimée sur une feuille A4. Techniquement, l'information y est. Mais vous ne voyez rien — tout est minuscule et illisible.

**Option B :** Votre téléphone, avec Google Maps. Quand vous êtes dézoomé, vous voyez les quartiers. Quand vous zoomez, vous voyez les rues. Vous ne voyez jamais tout en même temps, mais vous voyez toujours **ce dont vous avez besoin au bon moment**.

En ce moment, votre plan c'est l'Option A. Tout est dedans — parties, parcours, détails — et vous collez le tout au début de chaque message. Plus le projet grandit, plus le plan grandit, et plus Claude a du mal à s'y retrouver. Exactement comme vous avec la carte du monde imprimée en A4.

Ce module va vous apprendre à transformer votre plan en Option B : un système à **niveaux de zoom** qui montre à Claude exactement ce dont il a besoin, ni plus, ni moins.

---

## Étape 1 — Provoquer le problème (45 min)

### Ce que vous allez faire

Reprenez votre plan complet (parties + parcours). Ouvrez une **nouvelle conversation** avec Claude et collez TOUT — le plan entier — suivi d'une demande précise sur une seule partie :

> Voici le plan complet de mon application :
>
> [collez TOUT : les parties, les parcours, tout]
>
> Je veux que tu améliores la partie "Prêts". Quand un membre demande à emprunter un livre, le propriétaire doit pouvoir accepter ou refuser. Si le propriétaire ne répond pas en 3 jours, la demande est automatiquement annulée. Implémente ça.

Ensuite, demandez des améliorations à d'autres parties, toujours en collant le plan entier à chaque fois :

> [plan entier]
> Maintenant améliore la partie "Réunions" : ajoute la possibilité de mettre une réunion en liste d'attente quand elle est pleine.

> [plan entier]
> Maintenant améliore la partie "Statistiques" : ajoute un classement des membres les plus actifs par chapitre.

> [plan entier]
> Maintenant améliore la partie "Livres" : quand un livre est proposé, vérifie automatiquement s'il existe déjà dans un autre chapitre et propose de le récupérer au lieu de créer un doublon.

### 🔴 Ce que vous devez surveiller

**🚩 Claude résume ou ignore des morceaux du plan.**
Le plan est trop long. Claude ne vous le dit pas, mais il commence à "survoler" certaines parties. Vous le voyez quand il fait quelque chose qui contredit un parcours que vous aviez défini, ou quand il oublie une règle d'une partie qui n'est pas celle sur laquelle vous travaillez.

**🚩 Claude modifie des parties que vous n'avez pas demandé de toucher.**
Vous lui demandez de travailler sur "Prêts", mais il change quelque chose dans "Comptes" ou "Notifications" sans prévenir, parce qu'il a lu tout le plan et s'est dit que c'était lié.

**🚩 Vous passez plus de temps à gérer le plan qu'à avancer.**
Coller le plan entier prend de la place. Relire les réponses de Claude pour vérifier qu'il n'a rien cassé ailleurs prend du temps. Vous commencez à sentir que le plan, censé vous aider, devient un poids.

**🚩 Claude vous donne des réponses de plus en plus longues et vagues.**
Quand il reçoit beaucoup d'information, Claude essaie de tout prendre en compte. Résultat : des réponses diluées qui parlent de tout sans rien faire de précis.

### Ce que vous devez noter dans votre carnet

> ✍️ Est-ce que Claude a respecté le plan ou est-ce qu'il a pris des libertés ?
> ✍️ Avez-vous eu l'impression qu'il lisait vraiment tout le plan ou qu'il survolait ?
> ✍️ Combien de temps passez-vous à coller le plan et vérifier les réponses par rapport au temps que Claude passe à coder ?

---

## Étape 2 — Comprendre le problème (20 min)

### Lisez ceci APRÈS avoir fait l'étape 1

Le Module 1 a résolu le problème de l'amnésie de Claude (en lui donnant un plan). Le Module 2 a résolu le problème de l'ordre des opérations (en décrivant des parcours). Maintenant, le problème c'est **le bruit**.

Quand vous collez votre plan entier pour travailler sur la partie "Prêts", vous donnez à Claude une tonne d'information sur les Comptes, les Réunions, les Statistiques, les Notifications... dont il n'a pas besoin. C'est comme si vous demandiez à un plombier de réparer un robinet et que vous lui donniez les plans de toute la maison, y compris le circuit électrique du grenier et la disposition des meubles du salon.

Le plombier va peut-être quand même trouver le robinet. Mais il va perdre du temps à comprendre ce qui est pertinent. Et il risque de se dire "tiens, tant que j'y suis, je vais déplacer ce tuyau dans la salle de bain" — alors que vous ne lui avez rien demandé.

**Ce dont le plombier a besoin, c'est :**
1. Le plan de la cuisine (la pièce où il travaille)
2. Un schéma montrant où arrive l'eau et où elle repart (ses connexions avec le reste de la maison)
3. C'est tout.

Il n'a pas besoin de savoir combien de prises il y a dans le salon. Il a besoin de savoir d'où vient l'eau et où elle va. Le reste ne le concerne pas.

---

## Étape 3 — Créer les fiches (45 min)

### L'idée clé

Vous allez transformer votre plan en **deux niveaux** :

**Niveau 1 — La vue d'ensemble.** Une version courte du plan qui tient en une vingtaine de lignes. Pour chaque partie, juste le nom, une phrase sur ce qu'elle fait, et surtout : **ce qu'on peut lui demander et ce qu'elle répond**. Pas les détails internes.

**Niveau 2 — Les fiches détaillées.** Une fiche par partie, avec tous les détails internes, les parcours qui la concernent, ses règles. Vous ne collez qu'une fiche à la fois — celle de la partie sur laquelle vous travaillez.

### Ce que vous allez faire

Ouvrez une **nouvelle conversation** avec Claude :

> Voici le plan complet de mon application :
> [collez le plan entier une dernière fois]
>
> J'ai besoin de transformer ce plan en deux niveaux.
>
> NIVEAU 1 — La vue d'ensemble : un résumé court de toute l'application. Pour chaque partie, écris seulement :
> - Son nom
> - Ce qu'elle fait (une phrase)
> - Sa "porte d'entrée" : la liste des demandes qu'on peut lui faire, et ce qu'elle répond. Comme un guichet : "vous pouvez me demander X, je vous répondrai Y."
>
> NIVEAU 2 — Une fiche par partie. Chaque fiche contient :
> - Tout le détail interne de la partie
> - Les parcours dans lesquels elle intervient
> - Ses règles spécifiques
>
> Écris tout ça en français simple.

### Ce que Claude va vous donner

**Le niveau 1** ressemblera à ça :

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

**Chaque fiche de niveau 2** ressemblera à ça :

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

### Pourquoi les "portes d'entrée" changent tout

Regardez bien la vue d'ensemble. Chaque partie a une liste de choses qu'on peut lui demander et ce qu'elle répond. C'est exactement comme un guichet administratif :

- Vous allez au guichet "État civil" pour un acte de naissance. Vous ne lui demandez pas un permis de conduire.
- Vous n'avez pas besoin de savoir comment le guichet fonctionne en interne. Vous avez juste besoin de savoir **ce que vous pouvez lui demander et ce qu'il vous rend**.

C'est ça, une "porte d'entrée" : la liste de ce qu'on peut demander à une partie, vue de l'extérieur. L'intérieur de la partie (comment elle stocke les données, comment elle calcule les choses, dans quel ordre elle fait ses opérations) n'intéresse que celui qui travaille dessus.

**C'est la séparation la plus importante de ce cours : l'extérieur (ce qu'on peut demander) vs l'intérieur (comment ça marche).**

---

## Étape 4 — Travailler avec les niveaux de zoom (45 min)

### Ce que vous allez faire

Maintenant, quand vous voulez travailler sur une partie, vous collez **deux choses** :
1. La vue d'ensemble (niveau 1) — pour que Claude sache ce qui existe
2. La fiche détaillée de la partie concernée (niveau 2) — pour qu'il ait les détails

Essayez :

> Voici la vue d'ensemble de mon application :
> [collez le niveau 1]
>
> Et voici la fiche détaillée de la partie sur laquelle je travaille :
> [collez la fiche "Prêts"]
>
> Je veux améliorer les Prêts : quand un livre est en retard depuis plus de 2 semaines, le propriétaire doit pouvoir envoyer un rappel. Après 4 semaines, le prêt est signalé à l'admin.

### 🟢 Ce que vous allez remarquer

**Claude est plus précis.** Il ne se perd plus dans des détails sur les Réunions ou les Statistiques. Il se concentre sur les Prêts.

**Claude respecte les frontières.** Quand il a besoin de Notifications pour envoyer le rappel, il ne réécrit pas le système de notifications. Il écrit quelque chose comme "demander à Notifications d'envoyer un rappel au propriétaire". Il utilise la porte d'entrée.

**Claude ne touche pas aux autres parties.** Parce qu'il ne connaît que leur porte d'entrée, pas leur fonctionnement interne. Il ne peut pas les modifier même s'il le voulait.

**Vos messages sont plus courts.** La vue d'ensemble + une fiche, c'est beaucoup moins long que le plan entier. Claude a moins à lire, vous avez moins à coller, et les réponses sont plus ciblées.

### Ce que vous devez noter dans votre carnet

> ✍️ Est-ce que les réponses de Claude sont plus courtes et plus précises qu'à l'étape 1 ?
> ✍️ Est-ce que Claude a essayé de modifier une partie autre que celle sur laquelle vous travailliez ?
> ✍️ Quand Claude a eu besoin d'une autre partie, est-ce qu'il a utilisé la porte d'entrée ou est-ce qu'il a inventé sa propre solution ?

---

## Étape 5 — Le test des deux conversations (30 min)

### Ce que vous allez faire

Avant de commencer, sauvegardez votre état actuel — vous allez faire travailler deux conversations en parallèle sur les mêmes fichiers, et il vaut mieux avoir un point de retour :

```bash
git add .
git commit -m "Module 3 : avant travail parallèle"
```

Si une des deux conversations fait n'importe quoi, `git checkout .` vous ramènera ici.

Ouvrez **deux conversations** avec Claude en même temps. Dans chacune, collez la même vue d'ensemble, mais une fiche différente.

**Conversation A :**
> [vue d'ensemble]
> [fiche détaillée : Prêts]
> Améliore les Prêts pour gérer les livres abîmés : quand un livre est rendu abîmé, le propriétaire peut signaler le dégât et demander un remplacement.

**Conversation B :**
> [vue d'ensemble]
> [fiche détaillée : Réunions]
> Améliore les Réunions pour ajouter un système de covoiturage : les membres peuvent proposer ou chercher un trajet pour se rendre à la réunion.

### Ce que vous allez observer

Les deux conversations avancent **sans se gêner**. La conversation A ne touche qu'aux Prêts. La conversation B ne touche qu'aux Réunions. Et quand l'une a besoin de l'autre (par exemple, Réunions a besoin de Notifications pour prévenir les covoitureurs), elle utilise la porte d'entrée — pas le détail interne.

C'est comme si vous aviez deux artisans qui travaillent chacun dans une pièce différente de l'appartement. Ils ne se marchent pas dessus parce que chacun ne voit que sa pièce et les portes qui mènent aux autres.

### Le déclic

Vous venez de faire quelque chose de puissant : vous avez **parallélisé le travail**. Deux conversations, deux parties, en même temps, sans conflit. C'est possible uniquement parce que vous avez séparé ce que chaque partie montre aux autres (la porte d'entrée) de ce qu'elle fait en interne (la fiche détaillée).

Si tout était dans un seul gros plan, ça serait impossible. Les deux conversations modifieraient le même document et créeraient des contradictions.

---

## Étape 6 — Mettre à jour la vue d'ensemble (15 min)

### Ce que vous allez faire

Après avoir amélioré les Prêts et les Réunions, vos fiches détaillées ont changé. Est-ce que la vue d'ensemble doit changer aussi ?

Vérifiez :

- Est-ce que les Prêts ont une nouvelle porte d'entrée ? (Oui : "Signaler un livre abîmé" → demande de remplacement créée). Il faut l'ajouter à la vue d'ensemble.
- Est-ce que les Réunions ont une nouvelle porte d'entrée ? (Oui : "Proposer un covoiturage", "Chercher un covoiturage"). Il faut l'ajouter.
- Est-ce que le fonctionnement interne des Prêts a changé ? (Oui : nouvelle règle sur les livres abîmés). Ça va dans la fiche, PAS dans la vue d'ensemble.

### La règle d'or

**La vue d'ensemble ne change que quand une porte d'entrée change.** Si vous modifiez comment une partie fonctionne en interne sans changer ce qu'on peut lui demander, la vue d'ensemble reste identique.

C'est exactement comme un distributeur automatique. Si le mécanicien change les rouages à l'intérieur, vous ne le voyez pas — vous appuyez sur les mêmes boutons et vous recevez les mêmes produits. Mais si le distributeur ajoute une nouvelle boisson, il y a un nouveau bouton. C'est CE changement qui apparaît dans la vue d'ensemble.

---

## Ce que vous avez appris

### En une phrase

**Quand un projet grandit, il faut montrer à l'IA la bonne quantité d'information : assez pour qu'elle comprenne le contexte, pas trop pour qu'elle se noie.**

### Les trois nouveaux réflexes

7. **Séparez la vue d'ensemble des fiches détaillées.** La vue d'ensemble montre toutes les parties et leurs portes d'entrée. Les fiches contiennent le détail interne d'une seule partie.

8. **Travaillez une partie à la fois.** Collez la vue d'ensemble + la fiche de la partie concernée. Pas le plan entier.

9. **Distinguez l'extérieur de l'intérieur.** Ce qu'on peut demander à une partie (sa porte d'entrée) et comment elle fonctionne en interne sont deux choses différentes. L'un est public, l'autre est privé.

### La structure de votre plan

```
VUE D'ENSEMBLE (toujours collée)
├── Comptes — porte d'entrée : ...
├── Droits d'accès — porte d'entrée : ...
├── Livres — porte d'entrée : ...
├── Prêts — porte d'entrée : ...
├── ...
│
FICHES DÉTAILLÉES (une seule collée à la fois)
├── Fiche : Comptes (détails internes + parcours)
├── Fiche : Prêts (détails internes + parcours)
├── ...
```

### Ce qu'on n'a toujours pas fait

On n'a toujours pas :
- Appris un langage de programmation
- Compris le code que Claude écrit
- Installé d'outils complexes

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
