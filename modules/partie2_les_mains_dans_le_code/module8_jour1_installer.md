# Module 8 : Les mains dans le moteur

## *Apprendre à lire et toucher le code — sans devenir développeur*

---

## Ce qui change à partir de maintenant

Pendant les six premiers modules, vous n'avez jamais eu besoin de comprendre le code. Claude construisait, vous organisiez.

Ça a marché. Mais vous avez atteint une limite : vous ne pouvez pas vérifier ce que vous ne comprenez pas, et vous ne pouvez pas guider ce que vous ne voyez pas. C'est comme diriger un orchestre sans savoir lire une partition — vous entendez si ça sonne bien, mais vous ne pouvez pas dire au violoniste de jouer un Si bémol au lieu d'un Si.

Ce module va vous apprendre à **lire une partition**. Pas à jouer de tous les instruments — juste assez pour comprendre ce qui se passe et dire à Claude ce que vous voulez avec précision.

**Durée :** 10 jours (1h-2h par jour)
**Ce qu'il vous faut :** Un ordinateur, Claude Code, votre carnet

---

## Jour 1 — Installer votre nouvel atelier (1h30-2h)

### Avant de commencer : une analogie

Vous vous souvenez du Module 0 ? Vous aviez installé un terminal, VSCode, git, et Claude Code. C'était votre atelier de menuiserie de base — un établi, des outils, un système de rangement.

Aujourd'hui, c'est la même chose. Vous ajoutez un **nouvel outil spécialisé** dans votre atelier : un langage de programmation (Elixir) et un <dfn title="Un ensemble d'outils pré-construits qui fournit une structure pour développer des applications web">framework</dfn> web (Phoenix). C'est comme ajouter un tour à bois dans votre atelier de menuiserie — un outil puissant dont vous allez apprendre le fonctionnement progressivement.

### Ce que vous allez faire

Ouvrez le terminal intégré de VSCode (`` Ctrl + ` ``). Lancez Claude Code :

```bash
claude
```

Envoyez-lui ce message :

> Je suis débutant absolu en programmation. Je veux installer Elixir et Phoenix LiveView sur mon ordinateur pour un projet de club de lecture.
>
> Mon système d'exploitation est [Windows/Mac/Linux].
>
> Guide-moi étape par étape. Installe d'abord asdf (un gestionnaire de versions), puis Erlang, puis Elixir, puis Phoenix. Explique-moi ce que fait chaque commande avant que je la tape.

Suivez les instructions. Quand quelque chose ne marche pas — et ça arrivera — dites à Claude Code exactement ce que vous voyez à l'écran. Copiez-collez les messages d'erreur.

### Créer le projet

Une fois tout installé, demandez à Claude Code :

> Crée un nouveau projet Phoenix appelé "mon_club" avec SQLite comme base de données. Puis lance le serveur pour que je voie la page d'accueil dans mon navigateur.

Claude va exécuter quelque chose comme `mix phx.new mon_club --database sqlite3` puis `mix phx.server`. À la fin, vous devriez voir une page dans votre navigateur à l'adresse `http://localhost:4000`.

SQLite est la <dfn title="Un logiciel qui stocke et organise vos données — les livres, les membres, les réunions de votre club">base de données</dfn> de votre projet — c'est là que seront stockés vos livres, vos membres, vos réunions. On a choisi SQLite parce qu'il n'y a rien à installer séparément : tout est dans un seul fichier. Vous n'avez pas besoin d'en savoir plus pour l'instant.

**C'est le même moment qu'au Module 1** — vous lancez une commande, et vous voyez votre projet dans le navigateur. Ça veut dire que tout est bien installé.

### Sauvegarder

Quittez Claude Code (`/exit`), puis dans le terminal :

```bash
cd mon_club
git init
git add .
git commit -m "Projet Phoenix initial"
```

### Ce que vous devez noter dans votre carnet

> ✍️ Est-ce que l'installation s'est bien passée ? Combien de problèmes avez-vous rencontrés ?
> ✍️ Qu'est-ce que vous voyez dans votre navigateur ?
> ✍️ Combien de fichiers le projet contient-il ? (Regardez dans le panneau gauche de VSCode, ne vous inquiétez pas de les comprendre tous.)
