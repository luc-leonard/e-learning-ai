# Jour 5 : Le tableau d'affichage en Elixir

## *Module 9 — Le monolithe qui enfle*

---

### Avant de commencer

Hier, vous avez compris le concept : certaines communications entre contextes sont des **annonces**, pas des **questions**. Vous avez écrit des événements en français. Aujourd'hui, vous allez voir à quoi ça ressemble dans le code.

**Durée :** 1h30-2h
**Ce qu'il vous faut :** Votre dossier `mon_club` ouvert dans VSCode, Claude Code, votre carnet

---

### Ce que vous allez faire

Quittez Claude Code (`/exit`) et relancez une nouvelle session :

```bash
claude
```

Demandez à Claude Code de vous montrer un exemple :

> Lis le code de mon projet.
>
> Montre-moi un exemple simple de Phoenix.PubSub appliqué au club de lecture. Je veux voir :
> 1. Un contexte qui publie un événement (par exemple, Réunions annonce qu'un membre s'est inscrit)
> 2. Un module qui écoute cet événement et réagit (par exemple, il affiche un log ou met à jour quelque chose)
>
> Montre-moi le code mais ne modifie pas encore le projet. Je veux d'abord comprendre.

### Ce que vous allez voir

Claude va vous montrer deux morceaux de code. Prenez le temps de les lire.

**Le premier** — la publication (dans le contexte Réunions) :

Quelque part dans la fonction d'inscription, vous verrez une ligne comme :

```elixir
Phoenix.PubSub.broadcast(MonClub.PubSub, "reunions", {:membre_inscrit, %{membre_id: membre_id, reunion_id: reunion_id}})
```

C'est **l'affichage sur le tableau**. Réunions dit : "quelqu'un s'est inscrit" et donne les détails. Il ne sait pas qui va lire cette note. Il s'en fiche.

**Le deuxième** — l'écoute (un module Listener) :

```elixir
defmodule MonClub.Notifications.Listener do
  use GenServer

  def start_link(_) do
    GenServer.start_link(__MODULE__, [])
  end

  def init(_) do
    Phoenix.PubSub.subscribe(MonClub.PubSub, "reunions")
    {:ok, %{}}
  end

  def handle_info({:membre_inscrit, %{membre_id: id, reunion_id: rid}}, state) do
    # Réagir à l'événement — par exemple, envoyer une notification
    IO.puts("Notification : le membre #{id} s'est inscrit à la réunion #{rid}")
    {:noreply, state}
  end
end
```

C'est **le département qui regarde le tableau**. Il s'est abonné aux annonces de Réunions, et quand il en voit une qui l'intéresse, il réagit.

### Ce qu'il faut comprendre (et ce qu'on peut ignorer)

Vous voyez `use GenServer`, `init`, `handle_info`, `{:noreply, state}`. Ça fait beaucoup de mots nouveaux. Voici ce que vous devez retenir :

**Ce qui compte :**
- `Phoenix.PubSub.broadcast(...)` → c'est l'annonce sur le tableau
- `Phoenix.PubSub.subscribe(...)` → c'est "je regarde le tableau"
- `{:membre_inscrit, ...}` → c'est le nom de l'événement (celui que vous avez écrit en français hier)

**Ce qu'on peut ignorer :**
- `use GenServer`, `start_link`, `init`, `{:noreply, state}` → c'est de la <dfn title="Du code technique nécessaire au fonctionnement mais qu'on n'a pas besoin de comprendre en détail">plomberie</dfn>. Claude a créé un module qui tourne en arrière-plan et réagit aux événements. Vous n'avez pas besoin de comprendre la mécanique interne — retenez juste qu'il écoute et réagit.

C'est comme au Jour 1 du M8 quand vous voyiez `use`, `import`, `alias` dans le code : de la plomberie nécessaire, pas le sujet du jour.

---

### L'exercice : retrouver vos événements

Reprenez les événements que vous avez écrits en français au Jour 4. Retrouvez-les dans le code que Claude vous a montré.

Par exemple :
- Votre phrase : "Marie s'est inscrite à la Soirée Polar"
- Dans le code : `{:membre_inscrit, %{membre_id: ..., reunion_id: ...}}`

> ✍️ Pour chaque événement français du Jour 4, écrivez à côté le nom Elixir correspondant. La traduction devrait être naturelle — si le nom en code ne ressemble pas à la phrase en français, c'est un signal d'alerte.

### Ce que vous devez noter dans votre carnet

> ✍️ Quelle ligne publie l'événement ? (Recopiez-la.)
> ✍️ Quelle ligne écoute l'événement ? (Recopiez-la.)
> ✍️ Est-ce que le contexte qui publie mentionne le module qui écoute ? (Non — et c'est le point crucial.)
