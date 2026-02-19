# Module 9 : Le monolithe qui enfle

## *Quand vos modules bien découpés recommencent à s'étouffer entre eux*

---

## Ce que vous savez déjà

Votre club de lecture est découpé en contextes Phoenix propres. Comptes, Livres, Réunions, Critiques — chacun chez soi, chacun avec son interface. Les tests passent. Le plan et le code sont alignés.

Et pourtant, quelque chose commence à gratter.

**Durée :** Une semaine (1-2 heures par jour)
**Ce qu'il vous faut :** Votre projet du Module 8, un compte Claude, votre carnet

---

## Avant de commencer : une analogie

Votre application, c'est un immeuble de bureaux. Chaque étage est un département (un contexte). Comptabilité au 2ème, Événements au 3ème, Communication au 4ème.

Bien séparé. Propre. Chaque étage a sa porte.

Sauf que dans la pratique, les employés passent leur temps dans l'ascenseur. Quelqu'un des Événements descend à la Comptabilité pour demander un paiement. La Comptabilité remonte aux Événements pour vérifier le prix. Les Événements montent à la Communication pour demander l'envoi d'un email. Aller-retour, aller-retour. Les étages sont séparés, mais les gens sont emmêlés.

Un jour, la Comptabilité déménage ses bureaux et change sa porte d'entrée. Panique dans tout l'immeuble — tous les autres étages qui venaient frapper à l'ancienne porte sont perdus.

Maintenant, imaginez un autre système : chaque département a un **tableau d'affichage** dans le hall. Quand les Événements inscrivent quelqu'un, ils n'appellent personne — ils affichent une note : "Marie s'est inscrite à la Soirée Polar". La Comptabilité voit la note et traite le paiement. La Communication voit la note et envoie l'email. Chaque département regarde le tableau et fait son travail. Personne n'appelle personne.

Si la Comptabilité déménage ? Aucun impact. Elle regarde toujours le même tableau d'affichage, juste depuis un autre étage.

---

## Jour 1 — Voir les fils emmêlés (90 min)

### Ce que vous allez faire

Ouvrez votre projet et demandez à Claude de vous montrer la réalité :

> Voici le code de mon application :
> [collez le code, ou indiquez le chemin du projet]
>
> Pour chaque contexte (Comptes, Livres, Réunions, etc.), montre-moi :
> 1. Quels autres contextes il appelle directement dans son code
> 2. Quels autres contextes l'appellent directement
>
> Dessine ça comme un schéma simple avec des flèches : A → B signifie "A appelle B".

### Ce que vous allez voir

Quelque chose comme :

```
Réunions → Comptes       (pour vérifier le membre)
Réunions → Paiements     (pour prendre le paiement)
Réunions → Notifications (pour envoyer l'email)
Prêts → Comptes          (pour vérifier le membre)
Prêts → Livres           (pour vérifier la disponibilité)
Prêts → Notifications    (pour prévenir le propriétaire)
Critiques → Comptes      (pour identifier l'auteur)
Critiques → Livres       (pour lier au bon livre)
Statistiques → Réunions  (pour compter les inscrits)
Statistiques → Livres    (pour compter les votes)
Statistiques → Comptes   (pour le classement des membres)
```

Comptez les flèches. Probablement entre 10 et 20. Maintenant posez-vous la question : si vous changez l'interface de Comptes, combien de contextes cassent ?

Réponse : presque tous.

### Le mot pour ça

Vous connaissez déjà le mot : c'est du **couplage**. Mais un couplage d'un nouveau type. Au Module 1, le couplage était à l'intérieur du code — tout dans le même fichier. Au Module 8, vous l'avez résolu en découpant. Maintenant, le couplage est **entre** les modules. Vous avez des boîtes bien rangées, mais elles sont toutes liées par des fils.

### Ce que vous devez noter dans votre carnet

> ✍️ Combien de flèches dans votre schéma ?
> ✍️ Quel contexte est le plus appelé par les autres ? (Probablement Comptes)
> ✍️ Quel contexte appelle le plus d'autres contextes ? (Probablement Réunions)
> ✍️ Si vous changiez l'interface de Comptes, combien de contextes seraient affectés ?

---

## Jour 2 — Provoquer la douleur (90 min)

### Ce que vous allez faire

Vous allez modifier l'interface d'un contexte central et observer le carnage.

Demandez à Claude :

> Je veux changer le contexte Comptes. Jusqu'ici, un membre était identifié par son `id` (un nombre). Je veux passer à un identifiant unique de type UUID (un texte comme "550e8400-e29b-41d4-a716-446655440000"). C'est plus robuste et plus sûr.
>
> Fais ce changement dans le contexte Comptes et montre-moi tout ce qui casse dans les autres contextes.

### 🔴 Ce qui va se passer

L'apocalypse. Ou du moins, une mini-apocalypse très instructive.

**Tous les contextes qui appellent Comptes directement vont casser.** Réunions passe un `id` numérique à Comptes — ça ne marche plus. Prêts vérifie un membre par son `id` — ça ne marche plus. Critiques, Statistiques, tout le monde tombe.

Et ce n'est pas fini. Les **tests** vont devenir rouges. Pas juste les tests de Comptes — les tests de Réunions, de Prêts, de tout ce qui touche à un membre. Un changement dans un contexte, des tests rouges partout.

### La question

> ✍️ Pourquoi un changement dans Comptes casse-t-il les Réunions ? Les Réunions ne gèrent pas les comptes — c'est le principe du Module 1.

La réponse : parce que les Réunions **appellent directement** les Comptes. Elles connaissent le détail de comment les Comptes fonctionnent (les membres ont un `id` numérique). Ce détail est une **implémentation** — il n'aurait jamais dû franchir la frontière.

C'est la leçon la plus subtile du cours : **découper ne suffit pas si les modules se connaissent trop**. La séparation physique (des fichiers différents) n'est pas une séparation réelle si les modules dépendent des détails internes des autres.

---

## Jour 3 — Penser en événements (90 min)

### L'idée clé

Jusqu'ici, vos modules communiquent par des **ordres** :
- Réunions **dit à** Paiements : "Prends un paiement de 5€"
- Réunions **dit à** Notifications : "Envoie un email à Marie"
- Prêts **dit à** Livres : "Marque ce livre comme emprunté"

C'est une communication par **commandes**. Le module qui parle doit connaître le module qui écoute. Il doit savoir quoi lui demander, comment, dans quel format.

Il y a une autre façon de faire. Au lieu d'envoyer des ordres, un module **annonce ce qui s'est passé** :

- Réunions annonce : *"Marie s'est inscrite à la Soirée Polar"*
- Qui veut réagir à ça ? C'est leur problème, pas celui des Réunions.
- Paiements entend l'annonce et prend le paiement.
- Notifications entend l'annonce et envoie l'email.
- Statistiques entend l'annonce et met à jour ses compteurs.

Réunions ne sait pas que Paiements existe. Réunions ne sait pas que Notifications existe. Réunions fait son travail, annonce le résultat, et se tait.

**C'est la différence entre "fais ça" et "ça s'est passé".** Et cette différence change tout.

### En Elixir

Phoenix a un outil intégré pour ça : **PubSub**. C'est le tableau d'affichage de l'analogie du début. Un module publie un message, les autres s'y abonnent.

Demandez à Claude :

> Explique-moi Phoenix.PubSub avec un exemple simple. Montre-moi :
> 1. Comment un module publie un événement ("quelque chose s'est passé")
> 2. Comment un autre module s'abonne pour réagir
> 3. Pourquoi le module qui publie n'a pas besoin de savoir qui écoute
>
> Utilise l'exemple de l'inscription à une réunion dans mon club de lecture.

### Ce que Claude va vous montrer

Quelque chose comme :

```elixir
# Dans le contexte Réunions — quand une inscription réussit :
defmodule MonClub.Reunions do
  def inscrire(membre_id, reunion_id) do
    # ... fait l'inscription ...

    # Annonce ce qui s'est passé
    Phoenix.PubSub.broadcast(MonClub.PubSub, "reunions", 
      {:membre_inscrit, %{membre_id: membre_id, reunion_id: reunion_id}}
    )

    {:ok, inscription}
  end
end
```

```elixir
# Dans le contexte Paiements — écoute les inscriptions :
defmodule MonClub.Paiements.Listener do
  use GenServer

  def init(_) do
    Phoenix.PubSub.subscribe(MonClub.PubSub, "reunions")
    {:ok, %{}}
  end

  def handle_info({:membre_inscrit, %{membre_id: id, reunion_id: rid}}, state) do
    # Réagit à l'événement
    MonClub.Paiements.creer_paiement(id, rid)
    {:noreply, state}
  end
end
```

### Ce que vous devez remarquer

Regardez bien le code de Réunions. Il ne contient **aucune mention** de Paiements. Aucune. Il ne sait pas que Paiements existe. Il dit juste "une inscription a eu lieu" et passe à autre chose.

Maintenant regardez Paiements. Il écoute les événements de Réunions, mais Réunions ne le sait pas.

**C'est le découplage total.** Si demain vous ajoutez un module Statistiques qui veut aussi réagir aux inscriptions, vous n'avez qu'à l'abonner. Réunions ne change pas. Pas une ligne.

Et le changement d'ID du Jour 2 ? Si Réunions annonce `{:membre_inscrit, %{membre_id: uuid}}` au lieu d'un nombre, seuls les modules qui écoutent cet événement doivent s'adapter — et ils s'adaptent chacun chez eux, pas dans le code de Réunions.

---

## Jour 4 — Transformer les appels en événements (2h)

### Ce que vous allez faire

Reprenez votre schéma de flèches du Jour 1. Vous allez transformer les appels directs en événements, un par un.

D'abord, identifiez les événements. Demandez à Claude :

> Voici la liste des appels directs entre mes contextes :
> [collez le schéma de flèches]
>
> Pour chaque flèche, propose un événement qui pourrait la remplacer. Un événement décrit ce qui S'EST PASSÉ, pas ce qu'il faut faire. Format :
> - Appel direct : Réunions → Paiements ("prends un paiement")
> - Événement : {:membre_inscrit, %{membre_id: ..., reunion_id: ..., montant: ...}}
>
> Tous les appels ne doivent pas forcément devenir des événements. Dis-moi lesquels doivent rester des appels directs et pourquoi.

### Le point subtil

Claude va (normalement) vous dire que **certains appels doivent rester directs**. Par exemple :

- Réunions doit **vérifier** que le membre existe avant de l'inscrire. C'est une question ("ce membre existe-t-il ?"), pas une annonce. Ça reste un appel direct à Comptes.
- Mais après l'inscription, **annoncer** que ça s'est passé → c'est un événement.

La règle :
- **Question (j'ai besoin d'une réponse pour continuer)** → appel direct
- **Annonce (quelque chose s'est passé, qui veut réagir ?)** → événement

### La transformation

Demandez à Claude de transformer votre code :

> Voici le code de mon contexte Réunions :
> [collez le code]
>
> Voici la liste des événements à publier :
> [collez la liste d'événements]
>
> Transforme les appels directs de notification, paiement, et statistiques en événements PubSub. Garde les appels directs pour les vérifications (est-ce que le membre existe, est-ce qu'il reste des places).

### Le nouveau schéma

Après la transformation, redemandez le schéma de flèches. Il devrait ressembler à :

```
Appels directs (questions) :
  Réunions → Comptes       (vérifier le membre)
  Prêts → Comptes           (vérifier le membre)
  Prêts → Livres            (vérifier la disponibilité)

Événements (annonces) :
  Réunions publie : {:membre_inscrit, ...}
    ← Paiements écoute
    ← Notifications écoute
    ← Statistiques écoute

  Réunions publie : {:reunion_annulee, ...}
    ← Paiements écoute (pour rembourser)
    ← Notifications écoute

  Prêts publie : {:livre_emprunte, ...}
    ← Notifications écoute
    ← Statistiques écoute
```

Comptez les flèches directes. Beaucoup moins qu'avant. Et surtout : les contextes qui **font des choses** (Paiements, Notifications, Statistiques) ne sont plus appelés par personne. Ils écoutent. C'est eux qui décident de réagir, pas les autres qui leur donnent des ordres.

---

## Jour 5 — Les tests cassent (et c'est normal) (90 min)

### Ce qui va se passer

Vos tests des Modules 4-5/8 vont casser. Pas parce que le code est faux, mais parce que le **timing** a changé.

Avant (appel direct) :
```
1. Réunions.inscrire(marie, soiree)
2. → Paiements.creer_paiement(marie, soiree)    # immédiat
3. → vérifier que le paiement existe              # ✅ il existe
```

Après (événement) :
```
1. Réunions.inscrire(marie, soiree)
2. → publie {:membre_inscrit, ...}                # l'événement part
3. → vérifier que le paiement existe              # ❌ pas encore !
4. ... quelques millisecondes plus tard ...
5. → Paiements reçoit l'événement et crée le paiement
```

Le test vérifie trop vite. Le paiement n'a pas encore été créé quand le test le cherche. C'est le problème du **temps** — quand les choses ne sont plus instantanées, il faut apprendre à attendre.

### Ce que vous allez faire

Demandez à Claude :

> Mes tests cassent depuis que j'utilise PubSub. Le problème c'est que les événements sont traités de manière asynchrone — le test vérifie avant que le listener ait réagi. Comment gérer ça en Elixir ? Montre-moi comment adapter mes tests.

### Ce que vous allez apprendre

Claude va vous montrer des techniques pour attendre que les événements soient traités avant de vérifier. En Elixir, c'est naturel — le langage est conçu pour gérer les processus asynchrones.

Mais la leçon importante est ailleurs : **quand vous changez la façon dont les modules communiquent, vous devez aussi changer la façon dont vous vérifiez.** Les tests ne sont pas éternels. Ils évoluent avec l'architecture.

### Repensez vos vérifications

Certaines de vos vérifications du Module 4 doivent être reformulées :

Avant :
```
Après une inscription réussie :
  ✓ Un paiement de 5€ est enregistré
```

Après :
```
Après une inscription réussie :
  ✓ L'événement {:membre_inscrit, ...} a été publié
  ✓ Dans les secondes qui suivent, un paiement de 5€ est enregistré
```

La vérification est en deux temps maintenant : est-ce que l'annonce a été faite ? Et ensuite, est-ce que quelqu'un a réagi correctement ?

---

## Jour 6 — Le vocabulaire du jour (60 min)

### Les nouveaux mots

Vous avez pratiqué de nouveaux concepts cette semaine. Voici leurs noms :

| Ce que vous dites | Le vrai nom | Ce que ça signifie |
|---|---|---|
| "Annonce ce qui s'est passé" | **Événement de domaine** (Domain Event) | Un fait qui s'est produit dans le système, exprimé au passé |
| "Le tableau d'affichage" | **PubSub** (Publish/Subscribe) | Un mécanisme où quelqu'un publie et d'autres s'abonnent |
| "Écouter et réagir" | **Listener** (ou Handler) | Un morceau de code qui attend un événement et réagit |
| "Je pose une question" | **Requête** (Query) | Un appel qui demande une information sans rien modifier |
| "Je donne un ordre" | **Commande** (Command) | Un appel qui demande de faire quelque chose |
| "Je n'ai pas besoin de savoir qui écoute" | **Découplage par événements** | Les modules communiquent sans se connaître |
| "Le test vérifie trop vite" | **Asynchrone** | Les choses ne se passent pas dans l'ordre immédiat |

### Un mot particulièrement important : Événement de domaine

"Événement de domaine" est un terme qui vient d'une approche appelée **Domain-Driven Design** (DDD) — la conception pilotée par le métier. Vous n'avez pas besoin de connaître tout le DDD pour l'instant, mais sachez ceci : ce que vous faites depuis le Module 1 — découper par responsabilité métier, définir des interfaces, communiquer par événements — c'est du DDD. Vous le pratiquez sans le savoir depuis le début.

Les événements de domaine sont au cœur de cette approche. Un événement de domaine dit **ce qui a changé dans le monde réel**, pas ce qui a changé dans le code :

- ❌ `{:database_row_inserted, ...}` — ça parle du code
- ✅ `{:membre_inscrit, ...}` — ça parle du club de lecture

La nuance est cruciale. Vos événements doivent avoir du sens pour **quelqu'un qui ne connaît pas le code** — le gérant du club de lecture comprendrait "Marie s'est inscrite à la Soirée Polar". Il ne comprendrait pas "une ligne a été insérée dans la table inscriptions avec le foreign key 42".

### L'exercice

Relisez vos événements. Est-ce qu'ils parlent du club de lecture ou du code ?

Demandez à Claude :

> Voici la liste de mes événements PubSub :
> [collez la liste]
>
> Pour chaque événement, dis-moi s'il est nommé en termes de "ce qui se passe dans le club de lecture" (bon) ou en termes de "ce qui se passe dans le code" (à renommer). Propose des meilleurs noms si nécessaire.

---

## Jour 7 — Le bilan

### Ce que vous avez fait cette semaine

Vous avez résolu le **deuxième niveau de couplage**. Le premier (tout dans un fichier) a été résolu au Module 8 en découpant. Le deuxième (les modules qui s'appellent trop) a été résolu cette semaine en passant des appels directs aux événements.

### Le nouveau schéma de votre application

```
Comptes ←── (questions directes)
  ↑
  Réunions ──→ publie des événements ──→ [tableau d'affichage]
  Prêts ──→ publie des événements ──→    [tableau d'affichage]
                                              ↓
                                         Paiements écoute
                                         Notifications écoute
                                         Statistiques écoute
```

Les questions restent directes (j'ai besoin d'une réponse). Les annonces passent par le tableau d'affichage (je dis ce qui s'est passé, réagissez si ça vous concerne).

### Les règles apprises

| Règle | Explication |
|---|---|
| **Question → appel direct** | "Ce membre existe-t-il ?" nécessite une réponse immédiate |
| **Annonce → événement** | "Un membre s'est inscrit" ne nécessite pas de réponse |
| **Nommez les événements en langage métier** | `{:membre_inscrit}`, pas `{:row_inserted}` |
| **Les tests s'adaptent à l'architecture** | Asynchrone = il faut savoir attendre |
| **Moins de flèches = moins de casse** | Chaque flèche directe est un risque de propagation de changement |

### La structure de votre projet

```
INVARIANTS
VUE D'ENSEMBLE (modules + interfaces)
FICHES DÉTAILLÉES
FLUX

ÉVÉNEMENTS                           ← nouveau
├── {:membre_inscrit, ...}
├── {:reunion_annulee, ...}
├── {:livre_emprunte, ...}
├── {:livre_rendu, ...}
└── ...

TESTS (adaptés pour l'asynchrone)

CODE
├── lib/mon_club/
│   ├── comptes/
│   ├── reunions/
│   ├── paiements/
│   │   ├── paiements.ex
│   │   └── listener.ex            ← écoute les événements
│   ├── notifications/
│   │   └── listener.ex
│   └── ...
```

---

## La suite

Vos modules sont découpés et communiquent par événements. Mais les modules eux-mêmes — comment sont-ils organisés en interne ? Pour l'instant, chaque contexte est un sac de fonctions et de tables de base de données. Quand le contexte Réunions grossit (événements récurrents, sous-événements, listes d'attente, covoiturage...), l'intérieur du contexte redevient un bazar.

Le Module 10 va vous apprendre à structurer l'intérieur d'un module en s'appuyant sur **les mots que vos utilisateurs emploient** — pas les mots de la technique. C'est la porte d'entrée du Domain-Driven Design.
