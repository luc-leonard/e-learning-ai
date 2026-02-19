# Jour 4 : Le module, son interface, et le pipe

## *Module 8 — Les mains dans le moteur*

---

### Avant de commencer : une analogie

Au Module 1, vous aviez découpé votre club de lecture en **parties** : Livres, Membres, Réunions... Chaque partie avait une liste d'actions qu'elle savait faire — c'était son **interface**.

Au Module 3, vous avez appris que chaque partie a une **porte d'entrée** : les fonctions qu'on peut appeler depuis l'extérieur. Et derrière cette porte, il y a l'**implémentation** — le détail de comment ça fonctionne.

En Elixir, une "partie" s'appelle un **module** et s'écrit avec `defmodule`. Ses fonctions publiques sont sa porte d'entrée.

**Durée :** 1h-1h30
**Ce qu'il vous faut :** Votre dossier `mon_club` ouvert dans VSCode, Claude Code, votre carnet

---

### Le module : votre plan en Elixir

Lancez Claude Code dans `mon_club` et envoyez :

> Montre-moi un module Elixir pour les Réunions d'un club de lecture. Utilise `defmodule` avec 3 fonctions simples : créer une réunion, lister les réunions, et inscrire un membre. Juste la structure — pas besoin d'implémentation détaillée.

### Ce que vous allez voir

Quelque chose comme :

```elixir
defmodule MonClub.Reunions do
  def creer(titre, date, lieu) do
    # ...
  end

  def lister() do
    # ...
  end

  def inscrire(membre_id, reunion_id) do
    # ...
  end
end
```

`defmodule MonClub.Reunions do ... end` — c'est une **partie** de votre plan. Le point dans `MonClub.Reunions` est juste une façon d'organiser : `MonClub` c'est le projet, `Reunions` c'est la partie. À l'intérieur, les fonctions `def` sont les **actions** que cette partie sait faire.

**C'est votre plan du Module 1, écrit en Elixir.**

### L'exercice — prédire le contenu d'un module

Prenez votre carnet. Choisissez une partie de votre plan du Module 1 — par exemple "Livres". Écrivez la liste des fonctions que ce module devrait contenir. Par exemple : ajouter un livre, lister tous les livres, trouver un livre par son titre, supprimer un livre.

Puis demandez à Claude Code :

> Montre-moi un `defmodule MonClub.Livres` qui correspond à cette liste de fonctions : [votre liste]. Juste les signatures `def` avec les paramètres — pas besoin du code à l'intérieur.

Comparez ce que Claude produit avec ce que vous aviez écrit. Les noms sont-ils les mêmes ? Les paramètres sont-ils ceux que vous imaginiez ?

---

### Le pipe — lire une chaîne de montage

Il y a un dernier symbole que vous verrez partout en Elixir : `|>`, qu'on prononce "pipe" (comme un tuyau). C'est un des concepts les plus importants du langage, et la bonne nouvelle c'est qu'il est très intuitif.

Imaginez une chaîne de montage dans une usine. Une pièce arrive, passe par un premier poste qui la découpe, puis un deuxième qui la ponce, puis un troisième qui la peint. Chaque poste fait **une seule chose** et passe le résultat au suivant. Personne ne fait tout en même temps.

En Elixir, `|>` c'est le tapis roulant entre les postes. Il se lit "**puis**" :

```elixir
"  bonjour  "
|> String.trim()
|> String.capitalize()
```

Prends le texte "  bonjour  ", **puis** enlève les espaces, **puis** mets une majuscule. Résultat : "Bonjour".

Voici un deuxième exemple, plus proche du club de lecture :

```elixir
livres
|> Enum.filter(fn livre -> livre.votes > 3 end)
|> Enum.sort_by(fn livre -> livre.votes end)
|> Enum.take(5)
```

Même sans connaître Elixir, essayez de lire : prends la liste de livres, **puis** garde seulement ceux qui ont plus de 3 votes, **puis** trie-les par nombre de votes, **puis** prends les 5 premiers. C'est le "top 5 des livres les plus votés".

Vous allez voir des pipes partout dans le code Phoenix. À chaque fois, le réflexe est le même : lisez de haut en bas, remplacez chaque `|>` par "puis".

### L'exercice — lire un pipe

Demandez à Claude Code :

> Montre-moi un `|>` (pipe) de 3-4 étapes, en rapport avec un club de lecture. Ne me dis PAS ce que le résultat final est — je vais essayer de le deviner en lisant étape par étape.

Lisez la chaîne de haut en bas. Remplacez chaque `|>` par "puis". Écrivez en français dans votre carnet ce que chaque étape fait et quel est le résultat final. Puis demandez à Claude si vous aviez raison.

### L'exercice — écrire un pipe en français

Cette fois, c'est vous qui écrivez. Dans votre carnet, décrivez une chaîne d'opérations pour le club de lecture, en utilisant "puis". Par exemple :

> Prends tous les membres, **puis** garde ceux qui sont inscrits à au moins une réunion, **puis** trie-les par nombre de réunions, **puis** prends les 3 premiers.

Demandez à Claude Code :

> Traduis cette chaîne d'opérations en un pipe Elixir : [votre description en français]

Comparez. Vous venez d'écrire du code — en français — et Claude l'a traduit. C'est exactement ce que vous ferez quand vous guiderez Claude pour construire votre projet.

### Ce que vous devez noter dans votre carnet

> ✍️ Votre liste de fonctions pour le module Livres correspondait-elle à ce que Claude a produit ?
> ✍️ Voyez-vous le lien entre `defmodule` et les "parties" de votre plan du Module 1 ?
> ✍️ Avez-vous réussi à deviner le résultat du pipe ? L'avez-vous lu de haut en bas avec "puis" ?
