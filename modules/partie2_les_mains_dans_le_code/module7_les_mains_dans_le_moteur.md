# Module 7 : Les mains dans le moteur

## *Apprendre à lire et toucher le code — sans devenir développeur*

---

## Ce qui change à partir de maintenant

Pendant les cinq premiers modules, vous n'avez jamais eu besoin de comprendre le code. Claude construisait, vous organisiez.

Ça a marché. Mais vous avez atteint une limite : vous ne pouvez pas vérifier ce que vous ne comprenez pas, et vous ne pouvez pas guider ce que vous ne voyez pas. C'est comme diriger un orchestre sans savoir lire une partition — vous entendez si ça sonne bien, mais vous ne pouvez pas dire au violoniste de jouer un Si bémol au lieu d'un Si.

Ce module va vous apprendre à **lire une partition**. Pas à jouer de tous les instruments — juste assez pour comprendre ce qui se passe et dire à Claude ce que vous voulez avec précision.

**Durée :** Une semaine (1-2 heures par jour)
**Ce qu'il vous faut :** Un ordinateur, un compte Claude, votre carnet
**Ce que vous allez installer :** Elixir, Phoenix (Claude va vous guider)

---

## Jour 1 — Installer et découvrir

### Pourquoi Elixir ?

Il existe des centaines de langages de programmation. On va utiliser Elixir, et voici pourquoi :

**Ça se lit comme de l'anglais.** Regardez :

```elixir
def inscrire(membre, reunion) do
  if reunion.places_restantes > 0 do
    {:ok, "Inscription réussie"}
  else
    {:error, "Plus de places"}
  end
end
```

Même sans connaître Elixir, vous comprenez ce que ça fait. C'est une fonction qui inscrit un membre à une réunion. S'il reste des places, ça marche. Sinon, erreur.

**Ça vous force à penser clairement.** En Elixir, les données ne changent jamais une fois créées. Si vous voulez modifier quelque chose, vous créez une nouvelle version. Ça a l'air contraignant, mais ça élimine une catégorie entière de bugs — ceux où une partie du code modifie des données qu'une autre partie était en train d'utiliser.

**Ça montre le résultat immédiatement.** Avec Phoenix LiveView, ce que vous construisez s'affiche dans votre navigateur et se met à jour en temps réel. Pas besoin de recharger la page. Vous changez le code, vous voyez le résultat.

**Il y a peu d'outils, mais ils sont excellents.** Au lieu de choisir parmi 400 bibliothèques pour faire la même chose, Elixir a un petit nombre d'outils bien faits et qui fonctionnent ensemble. Moins de choix = moins de confusion.

### Ce que vous allez faire

Ouvrez Claude et demandez-lui de vous guider pas à pas :

> Je suis débutant absolu en programmation. Je veux installer Elixir et Phoenix LiveView sur mon ordinateur. Guide-moi étape par étape, en m'expliquant ce que fait chaque commande avant que je la tape. Mon système d'exploitation est [Windows/Mac/Linux].

Suivez les instructions. Quand quelque chose ne marche pas — et ça arrivera — dites à Claude exactement ce que vous voyez à l'écran. Copiez-collez les messages d'erreur.

À la fin de la journée, vous devriez avoir :
- Elixir installé
- Un projet Phoenix créé
- Une page qui s'affiche dans votre navigateur quand vous lancez le serveur

### Ce que vous devez noter dans votre carnet

> ✍️ Est-ce que l'installation s'est bien passée ? Combien de problèmes avez-vous rencontrés ?
> ✍️ Qu'est-ce que vous voyez dans votre navigateur ?
> ✍️ Combien de fichiers le projet contient-il ? (Regardez, ne vous inquiétez pas de les comprendre tous.)

---

## Jour 2 — Lire le code

### Ce que vous allez apprendre

Aujourd'hui, pas de construction. Juste de la lecture. Vous allez apprendre à lire du code Elixir comme on apprend à lire une langue étrangère — en commençant par les mots courants.

### Les 10 choses à reconnaître

Demandez à Claude :

> Je viens d'installer un projet Phoenix. Avant de construire quoi que ce soit, je veux apprendre à LIRE le code Elixir. Montre-moi les 10 structures les plus courantes dans un projet Phoenix, avec un exemple de chaque et une explication en français simple. Pas de théorie — juste "quand tu vois ÇA, ça veut dire ÇA".

Claude va vous montrer des choses comme :

**1. La fonction**
```elixir
def dire_bonjour(nom) do
  "Bonjour #{nom} !"
end
```
Quand vous voyez `def`, c'est une fonction. Elle a un nom, elle reçoit quelque chose, elle renvoie quelque chose.

**2. Le pipe**
```elixir
"  bonjour  "
|> String.trim()
|> String.capitalize()
```
Le `|>` (pipe) se lit "puis". Prends le texte "  bonjour  ", **puis** enlève les espaces, **puis** mets une majuscule. C'est comme une chaîne de montage — chaque étape prend le résultat de la précédente.

**3. Le pattern matching**
```elixir
case inscrire(marie, reunion) do
  {:ok, message} -> afficher_succes(message)
  {:error, raison} -> afficher_erreur(raison)
end
```
Le `case` regarde le résultat et fait quelque chose de différent selon la forme. Si c'est `{:ok, ...}`, on fait une chose. Si c'est `{:error, ...}`, on fait autre chose. Vous reconnaissez vos parcours du Module 2 ? Chemin normal, chemin d'erreur.

**4. Le module**
```elixir
defmodule MonClub.Reunions do
  def creer(params) do
    # ...
  end

  def annuler(reunion_id) do
    # ...
  end
end
```
Un `defmodule`, c'est exactement une **partie** de votre plan du Module 1. Elle a un nom, elle contient des fonctions (les actions qu'elle sait faire). `MonClub.Reunions` → c'est le module Réunions de votre club.

### L'exercice de lecture

Ouvrez les fichiers de votre projet Phoenix. Demandez à Claude :

> Voici le contenu du fichier [nom du fichier]. Explique-moi ce qu'il fait ligne par ligne, en français. Ne me dis pas comment le modifier — juste ce qu'il fait.

Faites ça avec 3 ou 4 fichiers. L'objectif n'est pas de tout comprendre — c'est de commencer à **reconnaître des formes**. Comme quand vous arrivez dans un pays étranger : après deux jours vous ne parlez pas la langue, mais vous reconnaissez les panneaux de sortie et le mot "toilettes".

### Ce que vous devez noter dans votre carnet

> ✍️ Quelles structures reconnaissez-vous déjà ? (def, pipe, case, defmodule)
> ✍️ Qu'est-ce qui reste mystérieux ?
> ✍️ Est-ce que vous voyez le lien entre la structure du code et votre plan du Module 1 ?

---

## Jour 3 — Construire naïvement

### Ce que vous allez faire

On reprend le club de lecture. Mais cette fois, vous allez le construire en Elixir/Phoenix, **de la manière la plus simple et la plus naïve possible**. Tout dans le même endroit. Pas de plan sophistiqué. On fait exactement ce qu'on avait fait au Module 1 — sauf que cette fois vous pouvez lire ce que Claude produit.

Demandez à Claude :

> Je veux construire un club de lecture avec Phoenix LiveView. Pour l'instant, je veux juste :
> - Une page qui liste les livres
> - Un formulaire pour ajouter un livre
> - La possibilité de voter pour un livre
>
> Fais ça de la manière la plus simple possible. Tout peut être dans le même fichier ou le même contexte. Ne t'occupe pas de l'architecture — je veux que ça marche, c'est tout.
>
> Montre-moi le code et explique chaque partie.

### Ce que vous allez observer

Claude va probablement tout mettre dans un seul "contexte" Phoenix. Tous les livres, les votes, les membres — tout au même endroit. Et ça va marcher parfaitement.

Vous allez aussi remarquer quelque chose de nouveau : **vous comprenez une partie du code**. Pas tout. Mais les `def`, les `case`, les pipes — vous les reconnaissez. Vous n'êtes plus aveugle.

### L'exercice important

Après que Claude a écrit le code, demandez-lui :

> Montre-moi la liste de toutes les fonctions que tu as créées, avec pour chacune : son nom, ce qu'elle reçoit, et ce qu'elle renvoie. Comme un sommaire.

Ce "sommaire", c'est l'**interface** de votre code. Vous reconnaissez ? C'est exactement la "porte d'entrée" du Module 3. Sauf que cette fois, c'est dans le code.

### Ce que vous devez noter dans votre carnet

> ✍️ Combien de fonctions Claude a-t-il créées ?
> ✍️ Est-ce que vous comprenez ce que chacune fait juste en lisant son nom et ses paramètres ?
> ✍️ Est-ce que tout est dans le même fichier/contexte ?

---

## Jour 4 — Lire les résultats dans le code

### Ce que vous allez apprendre

Hier vous avez construit. Aujourd'hui vous allez apprendre à **lire ce que le code fait réellement** — pas ce que Claude dit qu'il fait.

### Le {:ok, ...} et {:error, ...}

En Elixir, quand une fonction fait quelque chose, elle le dit clairement :

```elixir
# Ça a marché
{:ok, livre}

# Ça n'a pas marché
{:error, raison}
```

Ce sont vos ✅ et ❌ du Module 4, directement dans le code. Chaque fonction qui peut échouer le dit explicitement.

### Ce que vous allez faire

Demandez à Claude :

> Dans le code de mon club de lecture, montre-moi toutes les fonctions qui peuvent échouer. Pour chacune, montre-moi :
> 1. Quand est-ce qu'elle renvoie {:ok, ...} ?
> 2. Quand est-ce qu'elle renvoie {:error, ...} ?
> 3. Est-ce que l'appelant (le code qui utilise cette fonction) gère les deux cas ?

### Ce que vous allez découvrir

Probablement que plusieurs fonctions **ne gèrent pas le cas d'erreur**. Claude a écrit le chemin normal, mais le `{:error, ...}` n'est traité nulle part. Vous allez retrouver exactement le problème du Module 4 — sauf que cette fois vous pouvez le **voir** dans le code, pas juste le deviner.

### La correction

Pour chaque cas d'erreur non géré, demandez à Claude de le corriger :

> La fonction `voter(membre_id, livre_id)` peut renvoyer `{:error, "Déjà voté"}` mais le LiveView qui l'appelle ne gère pas ce cas. Le membre ne voit rien quand il essaie de voter deux fois. Corrige ça pour afficher un message d'erreur.

Vous êtes en train de faire exactement ce que vous faisiez au Module 4 — mais cette fois dans le code lui-même, pas dans un rapport.

---

## Jour 5 — Ajouter des fonctionnalités (la friction commence)

### Ce que vous allez faire

Votre club de lecture a des livres et des votes. Maintenant, ajoutez ces fonctionnalités, une par une. **Tout reste dans le même contexte** — ne réorganisez rien.

> "Ajoute un système de comptes. Les membres ont un nom et un email."

> "Ajoute des critiques : un membre peut écrire un avis sur un livre."

> "Ajoute des réunions avec une date, un lieu, et un nombre de places."

> "Ajoute l'inscription aux réunions."

> "Ajoute des catégories de livres."

### 🔴 Ce que vous devez surveiller

Vous connaissez cette sensation. Vous l'avez vécue au Module 1. Mais cette fois, vous pouvez la **voir dans le code** :

**🚩 Le contexte unique grossit de manière incontrôlable.**
Le fichier qui contenait 5 fonctions en contient maintenant 25 ou 30. Trouver quelque chose dedans prend du temps.

**🚩 Les fonctions commencent à faire trop de choses.**
La fonction `inscrire_reunion` gère à la fois la vérification du membre, la vérification des places, l'inscription, et l'envoi de notification. Elle fait le travail de quatre parties de votre ancien plan.

**🚩 Les données s'entremêlent.**
Les tables de la base de données commencent à se référencer dans tous les sens. Un livre connaît ses votes, ses critiques, ses catégories, ses emprunts. Tout est lié à tout.

**🚩 Vous reconnaissez les symptômes du Module 1.**
Mais cette fois, ce n'est pas Claude qui oublie — c'est le code lui-même qui est mal organisé. Le problème n'est plus dans la conversation. Il est dans la structure du code.

### L'exercice clé

Demandez à Claude :

> Montre-moi le "sommaire" de toutes les fonctions du contexte, groupées par thème. Combien de thèmes différents cohabitent dans le même contexte ?

La réponse va vous sauter aux yeux : des fonctions sur les livres, les votes, les membres, les réunions, les inscriptions, les critiques — tout dans le même sac. C'est le plat de nouilles du Module 1, mais en vrai.

### Ce que vous devez noter dans votre carnet

> ✍️ Combien de fonctions dans votre contexte unique ?
> ✍️ Combien de "thèmes" différents y cohabitent ?
> ✍️ Quelle fonction vous semble la plus confuse (celle qui fait trop de choses) ?
> ✍️ Si vous deviez expliquer ce code à quelqu'un, par où commenceriez-vous ? (Si la réponse est "je ne sais pas", c'est un signal.)

---

## Jour 6 — Découper (le Module 1, en vrai)

### Ce que vous allez faire

Vous allez refaire le Module 1 — mais dans le code cette fois. Découper le contexte unique en plusieurs contextes Phoenix, chacun avec une responsabilité claire.

D'abord, relisez votre plan du Module 1. Puis demandez à Claude :

> Voici mon plan d'architecture :
> [collez la vue d'ensemble avec les modules et interfaces]
>
> Voici le code actuel de mon application, qui est entièrement dans un seul contexte :
> [collez le code]
>
> Je veux séparer ce code en contextes Phoenix qui correspondent à mon plan. Chaque contexte doit correspondre à un module de mon plan. Les interfaces de mon plan doivent devenir les fonctions publiques de chaque contexte.
>
> Fais la séparation et montre-moi le résultat.

### Ce que vous allez voir

Le code va se réorganiser en quelque chose comme :

```
lib/mon_club/
  comptes/          ← le module Comptes
    comptes.ex      ← l'interface (fonctions publiques)
  livres/           ← le module Livres
    livres.ex
  reunions/         ← le module Réunions
    reunions.ex
  critiques/        ← le module Critiques
    critiques.ex
```

Chaque fichier est un **module** au sens d'Elixir ET au sens de votre plan. Les fonctions publiques de chaque fichier sont les **interfaces**. Le code interne est l'**implémentation**.

**Votre plan et votre code disent la même chose.** C'est le moment déclic de ce module.

### La vérification

Demandez à Claude :

> Montre-moi les fonctions publiques de chaque contexte. Est-ce que ça correspond aux interfaces de mon plan ?

S'il y a des différences, c'est soit que le plan a besoin d'être mis à jour, soit que le code n'a pas bien été découpé. Les deux sources de vérité — le plan et le code — doivent être alignées.

---

## Jour 7 — Le bilan

### Ce que vous avez fait cette semaine

Vous avez traversé un seuil. Vous n'êtes plus uniquement un architecte qui donne des plans à l'IA — vous êtes quelqu'un qui peut **lire le code, identifier les problèmes, et guider les corrections avec précision**.

### Les compétences acquises

| Compétence | Ce que ça signifie |
|---|---|
| **Lire une fonction** | Vous savez ce que `def`, les paramètres, et la valeur de retour signifient |
| **Suivre un pipe** | Vous comprenez `\|>` comme une chaîne d'étapes |
| **Lire un pattern match** | Vous savez que `{:ok, ...}` et `{:error, ...}` sont les deux chemins |
| **Reconnaître un module** | Vous voyez `defmodule` et vous pensez "partie de mon plan" |
| **Lire un sommaire** | Vous pouvez regarder les fonctions publiques d'un module et comprendre son interface |
| **Voir le monolithe** | Vous savez reconnaître quand tout est entassé au même endroit |

### Ce que vous ne savez PAS encore faire (et c'est normal)

- Écrire du code Elixir de zéro (vous modifiez avec Claude)
- Comprendre tout ce que fait Phoenix en coulisses (les migrations, le routeur, les sockets)
- Optimiser les performances
- Gérer le déploiement

Rien de ça n'est nécessaire pour la suite. Ce qui est nécessaire, c'est ce que vous savez faire : **lire, comprendre la structure, et guider Claude avec précision**.

### La structure de votre projet

```
INVARIANTS
VUE D'ENSEMBLE (modules + interfaces)
FICHES DÉTAILLÉES
FLUX
TESTS

CODE                               ← nouveau
├── lib/mon_club/
│   ├── comptes/comptes.ex         ← module = partie du plan
│   ├── livres/livres.ex           ← fonctions publiques = interface
│   ├── reunions/reunions.ex       ← code interne = implémentation
│   └── ...
```

---

## La suite

Votre code est bien découpé. Ça marche. Mais la semaine prochaine, on va faire grossir le projet sérieusement — et vous allez découvrir que des contextes bien découpés ne suffisent pas. Quand le contexte "Réunions" a besoin de savoir des choses sur les "Comptes" et les "Paiements" et les "Notifications" en même temps, les dépendances se multiplient et le code redevient un plat de nouilles — mais cette fois entre les contextes, pas à l'intérieur. Le Module 8 vous apprendra à gérer ça.
