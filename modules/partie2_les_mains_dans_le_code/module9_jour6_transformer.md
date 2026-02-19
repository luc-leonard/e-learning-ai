# Jour 6 : Transformer le code

## *Module 9 — Le monolithe qui enfle*

---

### Avant de commencer

Au Jour 8 du Module 8, vous aviez vécu le moment déclic : votre plan devenait du code. Aujourd'hui, c'est un moment similaire — vos événements en français deviennent de vrais événements dans le code. Vous allez transformer les appels directs qui sont des **annonces** en événements PubSub.

**Durée :** 1h30-2h
**Ce qu'il vous faut :** Votre dossier `mon_club` ouvert dans VSCode, Claude Code, votre carnet

---

### Ce que vous allez faire

Quittez Claude Code (`/exit`) et relancez une nouvelle session :

```bash
claude
```

Vous allez donner à Claude Code une mission précise, basée sur le travail des jours précédents :

> Lis plan.md et le code du projet.
>
> Voici les événements que je veux ajouter dans le projet :
> - Quand un membre s'inscrit à une réunion → publier un événement {:membre_inscrit_reunion, ...}
> - Quand un vote est enregistré pour un livre → publier un événement {:vote_enregistre, ...}
>
> Pour chaque contexte, ajoute les publications PubSub après les actions réussies. Crée les listeners nécessaires. Garde les appels directs qui sont des questions (vérifier qu'un membre existe, etc.).
>
> Mets à jour plan.md pour documenter les événements.

Adaptez les événements à ce que vous avez écrit dans votre carnet au Jour 4. Les noms exacts dépendent de votre projet.

### Après la transformation

Une fois que Claude a fini, vérifiez que le site fonctionne toujours :

```bash
mix phx.server
```

Testez dans le navigateur. Les fonctionnalités doivent marcher exactement comme avant — la différence est invisible pour l'utilisateur, elle est dans la façon dont le code est organisé.

### Le nouveau schéma de flèches

Demandez à Claude Code :

> Montre-moi à nouveau le schéma de flèches entre les contextes, comme au Jour 2. Sépare les appels directs (questions) et les événements (annonces).

Vous devriez voir quelque chose comme :

```
Appels directs (questions) :
  Livres → Comptes       (vérifier le membre)
  Réunions → Comptes     (vérifier le membre)

Événements (annonces) :
  Réunions publie : {:membre_inscrit_reunion, ...}
    ← Notifications écoute (si créé)
  Livres publie : {:vote_enregistre, ...}
    ← (personne n'écoute encore, et c'est OK)
```

### Ce que vous devez noter dans votre carnet

> ✍️ Combien de flèches directes avant la transformation ? Et après ?
> ✍️ Est-ce que Réunions mentionne encore Notifications dans son code ? (Normalement non.)

Même si le nombre de flèches n'a pas diminué de façon spectaculaire (vous n'avez que 3 contextes), le **type** de flèches a changé. Les appels directs qui restent sont des questions légitimes. Les annonces passent par le tableau d'affichage. C'est le principe qui compte — sur un projet avec 10 contextes, la différence serait énorme.

### Avant de partir — sauvegardez

```bash
git add .
git commit -m "Jour 6 M9 : appels directs transformés en événements PubSub"
```
