# Jour 5 : Construire naïvement

## *Module 8 — Les mains dans le moteur*

---

### Avant de commencer : une analogie

Vous vous souvenez du Module 1, Étape 1 ? Vous aviez demandé à Claude de construire un club de lecture simple, et ça avait très bien marché. Puis à l'Étape 2, vous aviez ajouté des choses, et ça avait commencé à partir en vrille.

On va refaire exactement la même chose. Mais cette fois, vous avez trois jours de lecture d'Elixir derrière vous — vous n'êtes plus aveugle. Vous allez pouvoir **lire** ce que Claude produit.

**Durée :** 1h30-2h
**Ce qu'il vous faut :** Votre dossier `mon_club` ouvert dans VSCode, Claude Code, votre carnet

---

### Ce que vous allez faire

Quittez Claude Code si vous y êtes (`/exit`), puis relancez une nouvelle session :

```bash
claude
```

Envoyez ce message :

> Je veux construire un club de lecture avec Phoenix LiveView. Pour l'instant, je veux juste :
> - Une page qui liste les livres
> - Un formulaire pour ajouter un livre
> - La possibilité de voter pour un livre
>
> Fais ça de la manière la plus simple possible. Tout peut être dans le même contexte. Ne t'occupe pas de l'architecture — je veux que ça marche, c'est tout.

### Lancer le site

Une fois que Claude a fini, lancez le site :

```bash
mix phx.server
```

Ouvrez votre navigateur à `http://localhost:4000`. Vous devriez voir votre club de lecture — des livres, un formulaire, des votes. Si ça ne marche pas, dites à Claude Code ce que vous voyez et laissez-le corriger.

### L'exercice de lecture

Maintenant, le moment important. Demandez à Claude Code :

> Montre-moi la liste de toutes les fonctions que tu as créées, avec pour chacune : son nom, ce qu'elle reçoit, et ce qu'elle renvoie. Comme un sommaire.

Lisez ce sommaire. **Vous reconnaissez des choses.** Les `def`, les `defmodule`, les `{:ok, ...}`, peut-être des `|>` et des `case`. Vous n'êtes plus aveugle — vous êtes quelqu'un qui commence à lire une langue étrangère. Pas couramment, mais suffisamment pour reconnaître les panneaux de sortie.

### Ce que vous devez noter dans votre carnet

> ✍️ Combien de fonctions Claude a-t-il créées ?
> ✍️ Combien de structures reconnaissez-vous ? (`def`, `defmodule`, `case`, `|>`, `{:ok}`, `{:error}`)
> ✍️ Est-ce que tout est dans le même fichier/contexte ?

### Avant de partir — sauvegardez

```bash
git add .
git commit -m "Jour 5 : club de lecture naïf"
```
