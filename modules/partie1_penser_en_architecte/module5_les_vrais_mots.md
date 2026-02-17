# Module 5 : Les vrais mots, les vraies décisions

## *Donner un nom à ce que vous savez déjà — et apprendre à casser votre propre plan*

---

## Ce que vous savez déjà

Vous savez beaucoup plus que vous ne le croyez. Depuis quatre modules, vous pratiquez des techniques que les développeurs professionnels mettent des années à maîtriser. Vous ne connaissiez juste pas les mots.

Ce module va changer ça. Et puis il va vous mettre face à un problème nouveau : **que faire quand votre plan, celui que vous avez soigneusement construit, ne suffit plus ?**

**Durée :** 2-3 heures
**Ce qu'il vous faut :** Votre projet complet (plan + code + tests), un compte Claude, votre carnet

---

## Étape 1 — Apprendre les vrais noms (30 min)

### Pourquoi c'est important

Imaginez que vous jouez de la guitare depuis un an. Vous savez placer vos doigts pour obtenir un son qui va bien après un autre. Mais vous ne connaissez pas le nom des accords. Le jour où quelqu'un vous dit "ça, c'est un La mineur", tout change. Pas parce que vous jouez mieux — mais parce que vous pouvez maintenant :

- Chercher "progressions avec La mineur" sur internet
- Lire une partition
- Parler avec d'autres musiciens
- Comprendre des tutoriels avancés

C'est exactement pareil ici. Vous avez les compétences. Il vous manque le vocabulaire pour accéder au reste du monde.

### Le glossaire

Lisez ce tableau lentement. Pour chaque ligne, repensez au moment où vous avez découvert le concept dans les modules précédents.

| Ce que vous dites | Le vrai nom | Où vous l'avez appris |
|---|---|---|
| "Partie" | **Module** | Module 1 — quand vous avez découpé le club de lecture en morceaux |
| "Ce qu'elle ne fait PAS" | **Responsabilité unique** (ou "Single Responsibility") | Module 1 — quand vous avez défini les limites de chaque partie |
| "A besoin de" | **Dépendance** | Module 1 — quand une partie avait besoin d'une autre pour fonctionner |
| "Trop entremêlé" | **Couplage** | Module 1 — le plat de nouilles, quand tout dépend de tout |
| "Parcours" | **Flux** (ou "Flow") | Module 2 — les chaînes d'actions qui traversent plusieurs modules |
| "Retour en arrière quand ça rate" | **Rollback** | Module 2 — défaire ce qui a été fait quand une étape échoue |
| "Deux personnes, une place" | **Concurrence** | Module 2 — le problème du croissant à la boulangerie |
| "Réserver avant de confirmer" | **Verrouillage** (ou "Lock") | Module 2 — mettre le croissant de côté pendant qu'on paie |
| "Porte d'entrée" | **Interface** | Module 3 — ce qu'on peut demander à un module, vu de l'extérieur |
| "L'intérieur qu'on ne montre pas" | **Implémentation** | Module 3 — le fonctionnement interne, caché derrière l'interface |
| "Vue d'ensemble vs fiche détaillée" | **Abstraction** | Module 3 — montrer le bon niveau de détail au bon moment |
| "Deux conversations en parallèle" | **Découplage** | Module 3 — des modules assez indépendants pour être travaillés séparément |
| "Le nombre de places DOIT diminuer" | **Invariant** | Module 4 — une chose qui doit TOUJOURS être vraie, quoi qu'il arrive |
| "Si je fais X, alors Y doit être vrai" | **Test** (ou "Assertion") | Module 4 — une vérification précise avec un résultat oui/non |
| "Cas bizarre" | **Cas limite** (ou "Edge case") | Module 4 — les situations auxquelles personne ne pense |
| "La conversation qui construit ≠ celle qui vérifie" | **Séparation des préoccupations** (ou "Separation of Concerns") | Module 4 — ne pas être juge et partie |

### Ce que vous allez faire

Prenez votre plan (vue d'ensemble + fiches). Relisez-le et **remplacez les mots simples par les vrais noms**, là où c'est naturel. Pas partout — seulement là où ça rend les choses plus claires.

Par exemple :

Avant :
```
PARTIE : Prêts
→ Fait : ...
→ Ne fait PAS : ...
→ Porte d'entrée : ...
```

Après :
```
MODULE : Prêts
→ Responsabilité : ...
→ Hors responsabilité : ...
→ Interface : ...
```

Puis faites la même chose avec vos vérifications :

Avant :
```
Après une inscription réussie :
  ✓ Il reste 2 places (pas 3)
```

Après :
```
Invariant — inscription :
  ✓ places_restantes == places_avant - 1
```

Vous n'êtes pas obligé de tout réécrire. Mais là où le vrai mot est plus précis, utilisez-le. Vous parlez maintenant le même langage que les développeurs professionnels.

---

## Étape 2 — Comprendre les invariants (20 min)

### Pourquoi les invariants méritent qu'on s'y attarde

De tous les mots que vous venez d'apprendre, **invariant** est le plus puissant. Voici pourquoi.

Un invariant, c'est une règle qui ne doit **jamais** être violée, quoi qu'il arrive dans votre application. Pas "devrait être vraie". Pas "est vraie en général". **Toujours vraie, dans tous les cas, sans exception.**

Exemples d'invariants dans votre club de lecture :

```
INVARIANTS GLOBAUX

1. Le nombre d'inscrits à une réunion ne dépasse jamais le nombre de places.
   (Toujours. Même si 200 personnes cliquent en même temps.)

2. Si un paiement est enregistré, une inscription correspondante existe.
   (Pas d'argent pris sans inscription. Jamais.)

3. Un livre emprunté a exactement un emprunteur.
   (Pas zéro, pas deux. Un.)

4. Un membre banni ne peut effectuer aucune action.
   (Aucune. Pas "la plupart". Aucune.)

5. La somme des remboursements ne dépasse jamais la somme des paiements.
   (L'application ne crée pas d'argent à partir de rien.)
```

### Pourquoi c'est si puissant

Quand quelqu'un vous demande un changement — un nouveau feature, une modification — vous pouvez le passer au filtre des invariants :

- "Est-ce que ce changement pourrait violer un invariant ?"
- Si oui → danger. Il faut soit refuser le changement, soit repenser l'architecture.
- Si non → on peut y aller sereinement.

Les invariants sont votre **alarme incendie**. Ils ne vous disent pas comment construire. Ils vous disent quand quelque chose de fondamental est menacé.

### Ce que vous allez faire

Écrivez les invariants de votre club de lecture. Pas les vérifications détaillées (ça, c'est les tests du Module 4). Les règles fondamentales qui ne doivent **jamais** être violées. Il y en a probablement entre 5 et 10. Pas plus — si vous en avez 30, vous confondez invariants et tests.

Puis ajoutez-les à votre plan, tout en haut, avant même la vue d'ensemble :

```
INVARIANTS
(ces règles ne sont JAMAIS violées, quoi qu'il arrive)
1. ...
2. ...

VUE D'ENSEMBLE
├── Module : Comptes — interface : ...
├── ...
```

---

## Étape 3 — Le changement qui casse tout (60 min)

### Ce que vous allez faire

Collez votre plan mis à jour (invariants + vue d'ensemble) dans une nouvelle conversation et demandez :

> Voici le plan de mon application avec ses invariants :
> [collez le plan]
>
> Nouvelle demande du club : les membres veulent pouvoir former des **équipes inter-chapitres** pour des défis de lecture. Une équipe regroupe des membres de différentes villes. L'équipe a un classement, des objectifs communs (lire 10 livres en 3 mois), et un chat d'équipe. Les membres d'une équipe peuvent s'emprunter des livres entre chapitres.
>
> Dis-moi :
> 1. Dans quel module existant est-ce que ça rentre ?
> 2. Est-ce que ça viole un de mes invariants ?
> 3. Qu'est-ce que ça casse dans mon plan actuel ?

### 🔴 Ce qui va se passer

Claude va vous dire la vérité, et elle n'est pas agréable :

**Ça ne rentre nulle part proprement.** Les équipes touchent à Comptes (les membres), à Chapitres (inter-villes), à Livres (objectifs de lecture), à Prêts (emprunts entre chapitres), et à un système de chat qui n'existait pas. C'est transversal — ça traverse toutes vos frontières soigneusement définies.

**Ça menace vos invariants.** "Un livre emprunté a exactement un emprunteur" — oui, mais si les prêts inter-chapitres ont des règles différentes des prêts locaux ? "Un membre banni ne peut effectuer aucune action" — banni de son chapitre, mais quid de l'équipe inter-chapitres ?

**Votre plan craque.** Pas parce qu'il est mauvais — il est excellent pour ce qu'il était conçu de faire. Mais la demande d'équipes inter-chapitres n'existait pas quand vous l'avez conçu. C'est une demande qui change les **hypothèses de base** du projet.

### Le choix fondamental

Vous êtes face à une décision que les architectes professionnels prennent régulièrement. Il y a deux options :

**Option A — Le scotch.** Vous ajoutez un module "Équipes" et vous faites des exceptions partout. Le module Prêts accepte maintenant les prêts locaux ET les prêts inter-chapitres, avec des `if` partout. Le module Chapitres a des règles spéciales pour les membres qui sont dans une équipe. Ça marche. Mais chaque futur changement sera plus difficile, parce que chaque module a maintenant deux modes de fonctionnement.

**Option B — La refonte.** Vous repensez votre plan. Peut-être que la notion de "chapitre" n'est plus la bonne frontière. Peut-être qu'il faut séparer "groupe de personnes" (qui peut être un chapitre OU une équipe) de "zone géographique". C'est plus de travail maintenant, mais le plan sera solide pour les prochains changements.

### Comment décider ?

C'est ici que les invariants vous aident. Posez-vous la question :

**Est-ce que l'Option A oblige à modifier un invariant ?**

Si oui → Option B. On ne touche pas aux invariants. Ils sont la constitution de votre projet. Si un changement exige de les réécrire, c'est que le plan doit changer, pas les invariants.

Si non → Option A est acceptable. Vous pouvez ajouter du scotch si ça ne compromet pas les règles fondamentales.

### Ce que vous allez faire

Demandez à Claude d'explorer les deux options :

> Explore les deux options.
>
> Option A : on ajoute un module Équipes sans toucher au reste. Montre-moi ce que ça donne dans le plan et quelles exceptions il faudra ajouter dans les modules existants.
>
> Option B : on repense le plan pour intégrer naturellement la notion d'équipes. Montre-moi le nouveau plan, les nouveaux modules, et comment les invariants sont préservés.
>
> Pour chaque option, dis-moi quels invariants sont menacés.

### Ce que vous devez noter dans votre carnet

> ✍️ Quelle option avez-vous choisie ? Pourquoi ?
> ✍️ Combien de modules sont affectés par chaque option ?
> ✍️ Vos invariants ont-ils survécu ? Si non, lesquels ont changé ?

---

## Étape 4 — Faire la refonte (45 min)

### Si vous avez choisi l'Option B

C'est le moment le plus formateur du cours entier. Vous allez **jeter une partie de votre plan** et en réécrire un nouveau. Pas depuis zéro — vous gardez les leçons apprises — mais avec une structure différente.

Demandez à Claude :

> Voici mon ancien plan :
> [l'ancien plan]
>
> Voici le nouveau plan qu'on a esquissé :
> [le plan de l'option B]
>
> Je veux :
> 1. La nouvelle vue d'ensemble avec les interfaces de chaque module
> 2. Les fiches détaillées des modules qui ont changé
> 3. La liste des invariants — lesquels sont inchangés, lesquels sont nouveaux
> 4. Les tests existants : lesquels sont encore valides, lesquels doivent être réécrits

### Le moment important

Regardez le point 4. Vos tests du Module 4 sont votre **filet de sécurité**. Certains vont encore passer — ce sont les parties du projet qui n'ont pas changé. D'autres vont échouer — ce sont les parties que vous devez reconstruire.

Sans ces tests, une refonte est terrifiante. Avec eux, c'est gérable. Vous savez exactement ce qui marche encore et ce qui est cassé.

**Les tests ne protègent pas que le code. Ils protègent la refonte.**

### Si vous avez choisi l'Option A

C'est un choix valide. Parfois le scotch est la bonne réponse — quand la deadline est serrée, quand le changement est petit, quand le risque est faible.

Mais notez dans votre carnet : quels compromis avez-vous fait ? Quels modules sont devenus plus complexes ? Où avez-vous ajouté des exceptions ?

Ce sont des **signaux d'alerte** pour l'avenir. La prochaine fois qu'un changement demande encore des exceptions aux mêmes endroits, il sera temps de passer à l'Option B.

---

## Étape 5 — Le vocabulaire en action (20 min)

### Ce que vous allez faire

Ouvrez une nouvelle conversation avec Claude et ayez une conversation technique — en utilisant les vrais mots :

> Mon application a un problème de couplage entre le module Prêts et le module Chapitres. L'interface de Prêts suppose que tous les emprunts sont locaux, mais le nouveau flux d'équipes inter-chapitres viole cette hypothèse. J'ai deux options : ajouter un cas particulier dans l'implémentation de Prêts (plus de couplage) ou refactorer en séparant la notion de "groupe" de la notion de "localisation" (nouveau module, nouvelles interfaces). L'invariant "un livre emprunté a exactement un emprunteur" doit être préservé. Que recommandes-tu ?

### Ce qui va se passer

Claude va vous répondre **comme à un professionnel**. Parce que vous parlez comme un professionnel. Les réponses seront plus précises, plus nuancées, plus utiles. Vous avez accès à un niveau de conversation que vous n'aviez pas avant — pas parce que Claude a changé, mais parce que vous avez les mots pour poser les bonnes questions.

### Le cercle vertueux

Meilleur vocabulaire → meilleures questions → meilleures réponses → meilleur projet → meilleur vocabulaire.

C'est le même cercle que pour n'importe quelle compétence. Un musicien qui connaît la théorie entend des choses qu'il n'entendait pas avant. Un architecte logiciel qui connaît le vocabulaire voit des structures qu'il ne voyait pas avant.

---

## Ce que vous avez appris

### En une phrase

**Les concepts que vous pratiquez depuis quatre modules ont des noms. Ces noms vous donnent accès à une communauté entière de connaissances. Et le plus puissant de ces concepts — l'invariant — est votre outil pour décider quand un plan doit évoluer ou être repensé.**

### Les trois derniers réflexes

14. **Nommez les choses.** Le vocabulaire technique n'est pas du jargon pour impressionner — c'est un outil de précision. "Couplage" dit plus que "trop lié". "Invariant" dit plus que "truc qui doit être vrai".

15. **Écrivez vos invariants en premier.** Avant la vue d'ensemble, avant les interfaces, avant le code. Ce sont les fondations. Tout le reste peut changer. Les invariants ne changent que quand le projet change de nature.

16. **Sachez casser votre plan.** Un bon architecte ne s'accroche pas à son plan quand il ne convient plus. Il sait reconnaître les signes (invariants menacés, exceptions qui s'accumulent, modules qui enflent) et il sait reconstruire en s'appuyant sur ses tests.

### La structure finale de votre projet

```
INVARIANTS                          ← la constitution
(règles qui ne sont JAMAIS violées)

VUE D'ENSEMBLE                      ← la carte
(modules + interfaces)

FICHES DÉTAILLÉES                    ← le zoom
(implémentation interne, une par module)

FLUX                                 ← les parcours
(actions multi-modules avec rollback)

VÉRIFICATIONS                        ← les spécifications
(en français : ce qui doit être vrai)

TESTS AUTOMATIQUES                   ← le filet de sécurité
(générés par Claude, lançables en une commande)
```

---

## Le vocabulaire complet

Gardez ce glossaire. C'est votre passerelle vers le monde du développement logiciel.

| Terme | Définition | Analogie |
|---|---|---|
| **Module** | Un morceau du système avec une responsabilité claire | Un département dans une entreprise |
| **Interface** | Ce qu'on peut demander à un module, vu de l'extérieur | Le guichet d'un service administratif |
| **Implémentation** | Comment un module fonctionne en interne | Ce qui se passe derrière le guichet |
| **Abstraction** | Montrer le bon niveau de détail au bon moment | Le zoom sur Google Maps |
| **Dépendance** | Quand un module a besoin d'un autre | Un département qui sous-traite à un autre |
| **Couplage** | Quand des modules sont trop liés entre eux | Des départements qui ne peuvent rien faire l'un sans l'autre |
| **Découplage** | Rendre des modules indépendants | Des départements autonomes avec des contrats clairs |
| **Responsabilité unique** | Chaque module fait une seule chose bien | "Je suis comptable, pas juriste" |
| **Flux** | Une action complète qui traverse plusieurs modules | Le parcours d'un colis de l'achat à la livraison |
| **Rollback** | Défaire ce qui a été fait quand une étape échoue | Rembourser quand la livraison échoue |
| **Concurrence** | Plusieurs choses qui arrivent en même temps | Deux clients, un croissant |
| **Verrouillage** | Réserver une ressource le temps d'une opération | Mettre le croissant de côté pendant qu'on paie |
| **Invariant** | Une règle toujours vraie, sans exception | Les fondations d'une maison |
| **Test** | Une vérification précise avec un résultat oui/non | Le contrôleur qui ouvre tous les robinets |
| **Cas limite** | Une situation à laquelle personne ne pense | "Que se passe-t-il si quelqu'un s'emprunte son propre livre ?" |
| **Refactoring** | Réorganiser sans changer le comportement | Rénover l'intérieur d'un mur sans toucher à la façade |
| **Dette technique** | Les compromis accumulés qui rendent le projet fragile | Le scotch qui tient le meuble — ça marche, pour l'instant |
| **Séparation des préoccupations** | Chaque activité (construire, vérifier, planifier) est faite séparément | Le juge n'est pas l'avocat |

---

## La suite

Vous avez terminé la Partie 1. Voici ce que vous savez faire :

1. **Découper** un projet en modules avec des responsabilités claires
2. **Décrire** comment les modules travaillent ensemble et gèrent les erreurs
3. **Structurer** l'information en niveaux pour communiquer efficacement avec l'IA
4. **Vérifier** que ce qui a été construit fonctionne réellement
5. **Faire évoluer** le plan quand les besoins changent, en s'appuyant sur les invariants et les tests

Ce sont les compétences d'un architecte logiciel. Vous ne savez pas coder — et pour beaucoup de ce que vous ferez, vous n'en aurez pas besoin. Vous savez quelque chose de plus rare : **penser en systèmes**.

Dans le Module 6, on va faire le point. Qu'est-ce que ces compétences vous permettent de faire — et où se situent leurs limites ? Faut-il aller plus loin et apprendre à lire le code, ou est-ce que ce que vous savez suffit ? C'est une vraie question, et la réponse dépend de vos objectifs.
