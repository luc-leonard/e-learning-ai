# Jour 2 : Reconnaître une fonction

## *Module 8 — Les mains dans le moteur*

---

### Avant de commencer : une analogie

Au Module 1, vous avez découpé votre club de lecture en **parties**, et chaque partie avait des **actions** qu'elle savait faire. Par exemple, la partie "Livres" savait ajouter un livre, lister les livres, supprimer un livre.

En Elixir, une action s'appelle une **fonction**. C'est un mot que vous connaissez déjà — dans les modules précédents, quand Claude vous montrait un "sommaire" de ce qu'il avait construit, il listait des fonctions. Vous n'aviez pas besoin de comprendre comment elles fonctionnaient. Aujourd'hui, vous allez apprendre à les **reconnaître** dans le code.

**Durée :** 1h-1h30
**Ce qu'il vous faut :** Votre dossier `mon_club` ouvert dans VSCode, Claude Code, votre carnet

---

### Ce que vous allez faire

Ouvrez le terminal dans VSCode, vérifiez que vous êtes dans le dossier `mon_club` (`pwd`), puis lancez Claude Code :

```bash
claude
```

Envoyez ce message :

> Montre-moi 3 fonctions simples en Elixir qui pourraient exister dans un club de lecture. Par exemple : une pour ajouter un livre, une pour compter les votes, une pour vérifier si un membre existe. Pour chacune, ne me montre QUE la fonction (avec `def`), pas le module autour.
>
> Ne m'explique rien encore. Je veux d'abord essayer de deviner ce que chaque fonction fait.

### L'exercice — deviner

Regardez chaque fonction. Essayez de deviner ce qu'elle fait **avant** de lire l'explication. Vous allez voir quelque chose comme :

```elixir
def ajouter_livre(titre, auteur) do
  %{titre: titre, auteur: auteur, votes: 0}
end
```

Même sans connaître Elixir, vous pouvez deviner : cette fonction prend un titre et un auteur, et crée un livre avec 0 votes. Le mot `def` signifie simplement "voici une fonction". C'est tout.

Après avoir deviné, demandez à Claude Code :

> Maintenant explique-moi chacune des 3 fonctions. Dis-moi si j'avais raison dans mes devinettes.

### L'exercice — écrire avant de lire

Maintenant, l'inverse. Dans votre carnet, décrivez en français une fonction qui pourrait exister dans un club de lecture. Par exemple : "une fonction qui prend un titre de livre et vérifie s'il existe déjà dans la liste". Écrivez son nom, ce qu'elle reçoit, ce qu'elle renvoie.

Puis demandez à Claude Code :

> Écris en Elixir une fonction qui [votre description]. Montre-moi juste la fonction avec `def`.

Comparez. Est-ce que Claude a choisi le même nom que vous ? Les mêmes paramètres ? C'est un exercice de traduction — vous écrivez en français, Elixir écrit la même chose dans sa langue.

### Ce que vous devez noter dans votre carnet

> ✍️ Combien de fonctions avez-vous deviné correctement ?
> ✍️ La structure `def nom(paramètres) do ... end` vous semble-t-elle lisible ?
> ✍️ Votre fonction décrite en français et la version Elixir de Claude se ressemblent-elles ?
