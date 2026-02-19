# Module 7 : La bascule

## *Ce que vous pouvez faire sans code — et ce que vous ne pouvez pas*

---

## Faisons le point

Vous avez parcouru six modules. Voici ce que vous savez faire :

- **Découper** un projet en modules avec des responsabilités claires (Module 1)
- **Décrire** comment ces modules travaillent ensemble et gèrent les erreurs (Module 2)
- **Structurer** l'information en niveaux pour communiquer efficacement avec l'IA (Module 3)
- **Vérifier** que ce qui a été construit fonctionne réellement (Modules 4-5)
- **Nommer** les concepts avec le vocabulaire professionnel (Module 6)

Ce sont des compétences d'architecte logiciel. De vraies compétences, utiles, que beaucoup de développeurs professionnels n'ont pas.

**Durée :** 1 heure (lecture et réflexion)
**Ce qu'il vous faut :** Votre carnet, votre plan du club de lecture

---

## Ce qu'on vous a dit, et ce qu'on aurait dû dire

Dans les six premiers modules, on vous a dit : "Vous n'avez pas besoin de comprendre le code." C'était vrai. Et ça le reste pour beaucoup de situations.

Mais on aurait dû ajouter : "... pour l'instant."

Voici la réalité. Sans toucher au code, vous pouvez :

✅ Concevoir l'architecture d'un projet
✅ Communiquer clairement avec l'IA (ou avec un développeur)
✅ Détecter les problèmes d'organisation
✅ Écrire des scénarios de vérification
✅ Décider quand un plan doit évoluer

Mais sans toucher au code, vous ne pouvez pas :

❌ Vérifier *vous-même* que le code fait ce qu'il prétend faire
❌ Identifier précisément où est un bug
❌ Guider Claude avec la précision nécessaire pour les cas complexes
❌ Comprendre pourquoi Claude a fait un choix plutôt qu'un autre
❌ Savoir si une réponse de Claude est excellente ou catastrophique quand elle *a l'air* bonne dans les deux cas

Aux Modules 4-5, vous avez utilisé "un autre Claude" pour vérifier le travail du premier. C'est mieux que rien. Mais c'est comme demander à un jumeau de corriger les devoirs de son frère — ils ont les mêmes angles morts. La seule façon de vraiment vérifier, c'est de pouvoir *lire* ce qui a été écrit.

---

## L'analogie

Vous avez appris à être chef de chantier. Vous savez lire un plan, organiser les équipes, vérifier que les délais sont tenus.

Mais un bon chef de chantier sait aussi reconnaître la qualité d'un mur. Pas le construire — il a des maçons pour ça. Mais quand le maçon dit "c'est terminé", le chef de chantier sait regarder le mur et voir si les joints sont droits, si le mortier est bon, si l'aplomb est correct.

C'est ça qu'on va apprendre dans la deuxième partie : **lire un mur**. Pas le construire. Juste assez pour voir si le travail est bien fait.

---

## Ce qui vous attend

La deuxième partie est différente de la première à plusieurs égards. Soyons transparents.

**Le rythme change.** Les six premiers modules prenaient 2-3 heures chacun. Les modules suivants prennent une semaine chacun, à raison de 1-2 heures par jour. C'est normal — on passe de la réflexion pure à la manipulation d'outils concrets, ce qui prend plus de temps.

**Vous allez installer des choses.** Un langage de programmation (Elixir), un framework web (Phoenix), un éditeur de code. L'installation va mal se passer. Il y aura des messages d'erreur. C'est normal et attendu — chaque développeur professionnel a vécu exactement la même frustration.

**Vous allez être frustré.** Le code ne fait pas toujours ce qu'on veut. Les messages d'erreur sont cryptiques. Les outils ont leurs manies. Cette frustration est le signe que vous apprenez, pas le signe que vous êtes mauvais.

**Vous n'allez pas devenir développeur.** L'objectif n'est pas d'écrire du code de zéro. C'est de *lire* le code que Claude écrit, de *comprendre* sa structure, et de *guider* Claude avec la précision d'un mot juste plutôt qu'un geste vague.

---

## Pourquoi Elixir ?

Dans les modules suivants, on utilisera le langage Elixir et le framework Phoenix. C'est un choix assumé, pas un choix neutre. Voici pourquoi, en toute honnêteté.

**Les avantages pour ce cours :**

- Le code Elixir est relativement lisible, même pour un débutant
- Le langage force des habitudes saines (les données ne changent pas une fois créées, ce qui élimine une catégorie entière de bugs)
- Les concepts d'architecture qu'on a vus dans la Partie 1 — modules, interfaces, événements, supervision — sont des constructions natives du langage, pas des ajouts
- Phoenix LiveView permet de voir le résultat immédiatement dans le navigateur

**Ce qu'on aurait aussi pu choisir :**

- **Python** : plus simple à installer, plus de ressources en ligne, meilleur support par les IA. Si votre objectif est d'aller vite et de construire un prototype, Python est probablement plus adapté.
- **JavaScript/TypeScript** : omniprésent sur le web, énorme communauté, plus de perspectives professionnelles.

**Pourquoi on a quand même choisi Elixir :**

Parce que ce cours enseigne l'architecture, pas la programmation. Et Elixir est le langage où les concepts d'architecture (modules, processus isolés, supervision, événements) sont les plus *visibles*. En Python, ces concepts existent mais sont cachés derrière des bibliothèques. En Elixir, ils font partie de la syntaxe. Vous les voyez. Et comme l'objectif est de *lire* le code, pas de l'*écrire*, la visibilité compte plus que la simplicité.

Si vous préférez un autre langage, les concepts de la Partie 1 sont universels. Vous pouvez demander à Claude de vous montrer les mêmes architectures en Python ou JavaScript.

---

## Si vous voulez vous arrêter ici

C'est une option tout à fait valide.

Avec les compétences de la Partie 1, vous pouvez :

- Piloter un développeur humain ou une IA pour construire un projet
- Rédiger des spécifications claires et structurées
- Participer à des décisions d'architecture
- Détecter les signaux d'alarme (couplage, dette technique, invariants violés)

Beaucoup de chefs de produit, de product managers, et de fondateurs non-techniques fonctionnent exactement comme ça. Si votre objectif est de communiquer efficacement avec une équipe technique sans coder vous-même, la Partie 1 suffit.

La Partie 2 est pour ceux qui veulent aller plus loin — qui veulent non seulement piloter, mais aussi *comprendre* ce qui se passe sous le capot.

---

## Ce que vous devez noter dans votre carnet

> ✍️ Pourquoi voulez-vous continuer ? (Curiosité ? Besoin professionnel ? Envie de comprendre ?)
> ✍️ Avez-vous accès à un ordinateur où vous pouvez installer des logiciels ?
> ✍️ Êtes-vous prêt à être frustré pendant une semaine avant que ça devienne plus fluide ?

Si la réponse à ces trois questions vous convient, tournez la page.

---

## La suite

Le Module 8 va vous mettre les mains dans le moteur. Vous allez installer Elixir, lire vos premières lignes de code, et découvrir que la structure du code ressemble étrangement à la structure de votre plan. Ce n'est pas un hasard.
