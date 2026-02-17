# Module 10 : Les frontières qui tiennent

## *Quand vos agrégats deviennent des êtres vivants qui protègent leurs propres règles*

---

## Ce que vous savez déjà

Vos agrégats ont des invariants. Vos tests vérifient que ces invariants sont respectés. Mais les tests ne vérifient qu'**après coup** — ils vous disent "ça a cassé", pas "ça ne peut pas casser".

C'est la différence entre un garde-fou sur une falaise et un panneau "attention falaise" posé 100 mètres plus loin. Les deux sont utiles. Mais un seul empêche vraiment de tomber.

Ce module va transformer vos agrégats en garde-fous.

**Durée :** Une semaine (1-2 heures par jour)
**Ce qu'il vous faut :** Votre projet du Module 9, un compte Claude, votre carnet

---

## Avant de commencer : une analogie

Vous allez dans un bureau de poste. Vous prenez un ticket numéroté. Un écran affiche "Numéro 47, guichet 3". Le 47 va au guichet 3. Le 48 attend. Le 49 attend. Personne ne double.

Pourquoi est-ce que ça marche ? Pas parce qu'il y a un règlement affiché au mur qui dit "ne doublez pas". Ça marche parce que **le système rend le doublage impossible**. Vous ne pouvez pas aller au guichet sans votre numéro. Le guichet n'accepte qu'un client à la fois. L'invariant "chaque client est servi dans l'ordre" n'est pas une règle à respecter — c'est un fait structurel.

Maintenant, repensez à votre application. Votre invariant "le nombre d'inscrits ne dépasse pas le nombre de places" — est-il un panneau ou un garde-fou ? En ce moment, c'est un panneau. Le code vérifie, mais rien n'empêche **structurellement** de le violer. Si deux requêtes arrivent au même moment, si un bug saute la vérification, si quelqu'un modifie directement la base de données — l'invariant tombe.

Et si votre agrégat était comme le bureau de poste ? Un système qui **ne peut pas** violer ses propres règles, par construction ?

En Elixir, c'est possible. Et c'est même naturel.

---

## Jour 1 — Le problème de la base de données (90 min)

### Ce que vous allez faire

Vous allez provoquer une violation d'invariant pour de vrai.

Demandez à Claude :

> Voici le code de mon agrégat Séance :
> [collez le code]
>
> L'invariant dit : "le nombre d'inscrits ne dépasse jamais le nombre de places."
>
> Écris-moi un test qui simule deux inscriptions simultanées à une séance avec une seule place restante. Les deux requêtes arrivent en même temps, vérifient qu'il reste une place (oui pour les deux), et inscrivent toutes les deux.
>
> Est-ce que mon code actuel empêche ça ?

### 🔴 Ce que vous allez découvrir

Probablement que non. Voici pourquoi :

```
Moment 1 : Requête A vérifie → il reste 1 place ✓
Moment 2 : Requête B vérifie → il reste 1 place ✓ (A n'a pas encore inscrit)
Moment 3 : Requête A inscrit → 0 places restantes
Moment 4 : Requête B inscrit → -1 places restantes ← INVARIANT VIOLÉ
```

C'est le problème du croissant du Module 2, mais en vrai dans le code. Vous l'aviez résolu conceptuellement avec la notion de réservation. Mais est-ce que le code l'implémente vraiment ?

### Pourquoi ça arrive

Votre agrégat est stocké dans une base de données. Quand deux requêtes arrivent :

1. Chacune **lit** l'état de la séance (nombre de places)
2. Chacune **vérifie** l'invariant dans son coin
3. Chacune **écrit** son inscription

Entre la lecture et l'écriture, l'autre requête a le temps de passer. La base de données ne sait pas que ces deux opérations font partie du même tout. Elle voit deux écritures indépendantes.

C'est comme si deux boulangères servaient le même croissant à deux clients parce qu'elles regardent la vitrine chacune de leur côté sans se parler.

### La solution classique (et ses limites)

La solution habituelle, c'est le **verrouillage en base de données** : on bloque la ligne "séance" pendant qu'on inscrit, pour que personne d'autre ne puisse la lire en même temps. Ça marche. Mais c'est fragile — il faut penser à verrouiller à chaque endroit, et si on oublie une seule fois, l'invariant peut être violé.

C'est un panneau. Pas un garde-fou.

---

## Jour 2 — Un agrégat qui vit en mémoire (2h)

### L'idée clé

Et si votre agrégat n'était pas juste des données dans une base ? Et s'il était un **programme en cours d'exécution** — un processus vivant qui tourne en permanence, qui contient l'état de la séance, et qui est le **seul** à pouvoir la modifier ?

Plus de lecture-vérification-écriture en trois temps. Un seul interlocuteur qui reçoit les demandes une par une, dans l'ordre, et qui dit oui ou non.

C'est exactement le bureau de poste. Le guichet (le processus) traite un client à la fois. Personne ne double. L'invariant est garanti par construction.

En Elixir, ce concept existe nativement. Ça s'appelle un **GenServer** — un processus qui :
- Vit en mémoire tant qu'on en a besoin
- Contient un état (les données de la séance)
- Reçoit des messages un par un (les demandes d'inscription)
- Traite chaque message avant de passer au suivant

### Ce que vous allez faire

Demandez à Claude :

> Explique-moi GenServer avec l'analogie du guichet de bureau de poste. Puis montre-moi comment transformer mon agrégat Séance en GenServer. Je veux :
>
> 1. Quand une séance est créée, un processus GenServer démarre
> 2. Le processus contient l'état complet de la séance (inscriptions incluses)
> 3. Pour inscrire quelqu'un, on envoie un message au processus
> 4. Le processus vérifie l'invariant et accepte ou refuse
> 5. Comme le processus traite les messages un par un, deux inscriptions simultanées sont traitées l'une après l'autre — jamais en même temps
>
> Montre-moi le code et explique chaque partie.

### Ce que Claude va vous montrer

```elixir
defmodule MonClub.Reunions.SeanceProcess do
  use GenServer

  # --- Démarrage ---

  def start_link(seance) do
    GenServer.start_link(__MODULE__, seance, name: via(seance.id))
  end

  def init(seance) do
    # L'état initial : la séance avec ses données
    {:ok, seance}
  end

  # --- Interface publique (ce qu'on peut demander au guichet) ---

  def inscrire(seance_id, membre_id) do
    GenServer.call(via(seance_id), {:inscrire, membre_id})
  end

  def places_restantes(seance_id) do
    GenServer.call(via(seance_id), :places_restantes)
  end

  # --- Traitement des messages (ce que fait le guichet) ---

  def handle_call({:inscrire, membre_id}, _from, seance) do
    cond do
      seance.places_restantes <= 0 ->
        {:reply, {:error, :seance_complete}, seance}

      membre_deja_inscrit?(seance, membre_id) ->
        {:reply, {:error, :deja_inscrit}, seance}

      true ->
        seance_mise_a_jour = ajouter_inscription(seance, membre_id)
        {:reply, {:ok, :inscrit}, seance_mise_a_jour}
    end
  end

  def handle_call(:places_restantes, _from, seance) do
    {:reply, seance.places_restantes, seance}
  end
end
```

### Ce que vous devez comprendre

Lisez le `handle_call({:inscrire, ...})`. C'est le cœur du système.

Ce code ne vérifie pas la base de données. Il vérifie **son propre état en mémoire**. Et parce que GenServer traite les messages **un par un**, il est impossible que deux inscriptions soient traitées en même temps.

Rejouez le scénario du Jour 1 :

```
Moment 1 : Requête A envoie {:inscrire, marie} au processus
Moment 2 : Requête B envoie {:inscrire, jean} au processus
Moment 3 : Le processus traite A → il reste 1 place → OK, Marie inscrite
Moment 4 : Le processus traite B → il reste 0 places → REFUSÉ
```

B ne peut pas passer avant que A soit terminée. Le processus est le guichet. Un client à la fois. L'invariant est garanti **par construction**, pas par vérification.

---

## Jour 3 — Que se passe-t-il quand le guichet plante ? (90 min)

### La question qui tue

Votre séance est un processus vivant. Et les processus vivants peuvent mourir — un bug, une erreur inattendue, un manque de mémoire.

Que se passe-t-il si le processus de la Soirée Polar plante ? Toutes les données en mémoire disparaissent. Les inscriptions, les places restantes — tout est perdu.

Ça a l'air catastrophique. Mais Elixir a une réponse élégante.

### L'analogie

Vous êtes dans un restaurant. Un serveur trébuche et laisse tomber un plateau. Que se passe-t-il ?

**Option A (le monde fragile) :** Le restaurant entier ferme. Tous les clients partent. Catastrophe.

**Option B (le monde Elixir) :** Le gérant donne un nouveau plateau au serveur. Le serveur retourne en cuisine, recharge les plats, et reprend le service. Les autres serveurs n'ont même pas remarqué.

C'est exactement ce que fait Elixir. Un processus plante ? Pas de problème — un **superviseur** le redémarre automatiquement. Le nouveau processus recharge son état depuis la base de données et reprend là où l'autre s'est arrêté.

### Ce que vous allez faire

Demandez à Claude :

> Mon agrégat Séance est un GenServer. Que se passe-t-il s'il plante ? 
>
> Montre-moi :
> 1. Comment créer un Supervisor qui surveille les processus de séances
> 2. Quand un processus plante, comment il est redémarré automatiquement
> 3. Comment le processus redémarré récupère son état depuis la base de données
> 4. Ce qui se passe pour le client qui avait envoyé un message au moment du crash

### Ce que Claude va vous montrer

```elixir
defmodule MonClub.Reunions.Supervisor do
  use DynamicSupervisor

  def start_link(_) do
    DynamicSupervisor.start_link(__MODULE__, :ok, name: __MODULE__)
  end

  def init(:ok) do
    DynamicSupervisor.init(strategy: :one_for_one)
  end

  def demarrer_seance(seance_id) do
    # Charge la séance depuis la base de données
    seance = Repo.get!(Seance, seance_id) |> charger_inscriptions()

    # Démarre un processus pour cette séance
    DynamicSupervisor.start_child(__MODULE__, {SeanceProcess, seance})
  end
end
```

### Ce que `:one_for_one` signifie

La stratégie `:one_for_one` veut dire : "si un enfant plante, redémarre **seulement celui-là**". La Soirée Polar plante ? On redémarre la Soirée Polar. Le Club Manga continue de tourner comme si de rien n'était.

C'est comme dans le restaurant : un serveur trébuche, les autres continuent. On ne ferme pas le restaurant.

### Le double filet

Votre agrégat a maintenant deux niveaux de protection :

1. **En fonctionnement normal** : le processus protège les invariants en traitant les messages un par un
2. **En cas de crash** : le superviseur redémarre le processus, qui recharge son état depuis la base de données

La base de données est le **backup**. Le processus est le **gardien**. Les deux travaillent ensemble.

### Ce que vous devez noter dans votre carnet

> ✍️ Comprenez-vous la différence entre "les données sont dans la base de données" et "les données sont dans un processus vivant" ?
> ✍️ Pourquoi est-ce que traiter les messages un par un résout le problème des inscriptions simultanées ?
> ✍️ Que se passe-t-il si le serveur entier plante (pas juste un processus) ? (Réponse : la base de données est toujours là. Au redémarrage, les processus rechargent depuis la base.)

---

## Jour 4 — Synchroniser le processus et la base (2h)

### Le problème

Le processus vit en mémoire. La base de données est sur le disque. Les deux contiennent les données de la séance. Et ils peuvent se désynchroniser.

Exemple :
1. Le processus inscrit Marie (en mémoire : 2 places restantes)
2. Le processus écrit dans la base de données... mais la base est lente
3. Le processus plante avant que l'écriture soit terminée
4. Le superviseur redémarre le processus
5. Le processus recharge depuis la base → Marie n'est pas inscrite, 3 places restantes
6. Marie est perdue.

### Ce que vous allez faire

Demandez à Claude :

> Mon agrégat Séance est un GenServer qui écrit dans la base de données. Comment garantir que l'état en mémoire et l'état en base sont toujours synchronisés ? Quelles sont les stratégies possibles et laquelle est la plus simple pour commencer ?

### Les stratégies

Claude va vous en proposer plusieurs. Voici les principales :

**Stratégie 1 : Écrire d'abord, mettre à jour en mémoire ensuite.**
Le processus écrit dans la base, et seulement si l'écriture réussit, il met à jour son état en mémoire. Si la base refuse (contrainte violée), l'état en mémoire ne change pas.

```elixir
def handle_call({:inscrire, membre_id}, _from, seance) do
  # Vérifier les invariants en mémoire (rapide)
  if seance.places_restantes <= 0 do
    {:reply, {:error, :seance_complete}, seance}
  else
    # Écrire dans la base (source de vérité)
    case Repo.insert(inscription) do
      {:ok, _} ->
        # L'écriture a réussi → mettre à jour la mémoire
        seance = %{seance | places_restantes: seance.places_restantes - 1}
        {:reply, {:ok, :inscrit}, seance}
      {:error, _} ->
        # L'écriture a échoué → ne rien changer en mémoire
        {:reply, {:error, :erreur_base}, seance}
    end
  end
end
```

**Stratégie 2 : L'état en mémoire fait foi, on synchronise en arrière-plan.**
Plus performant mais plus complexe. On y reviendra.

Pour l'instant, la stratégie 1 est la bonne. Elle est simple et fiable.

### La règle

**La base de données est la source de vérité. Le processus est le gardien rapide.**

Le processus vérifie les invariants en mémoire (rapide, pas de réseau). Puis il écrit dans la base (lent, mais durable). Si l'écriture échoue, il ne modifie pas sa mémoire.

Au redémarrage, le processus recharge depuis la base. Comme la base est toujours à jour, rien n'est perdu.

---

## Jour 5 — L'arbre de supervision complet (90 min)

### Ce que vous allez faire

Vous avez un superviseur pour les séances. Mais votre application a d'autres agrégats — les prêts, par exemple. Chaque agrégat mérite son propre processus et son propre superviseur.

Demandez à Claude :

> Voici la liste de mes agrégats :
> - Séance (gère les inscriptions, la liste d'attente)
> - Prêt (gère l'emprunt, le retour, les relances)
>
> Montre-moi l'arbre de supervision complet de mon application. Quel superviseur gère quoi ? Comment les processus sont-ils organisés ?

### Ce que Claude va vous montrer

```
MonClub.Application (superviseur racine)
├── MonClub.Repo (la base de données)
├── MonClub.PubSub (le tableau d'affichage)
├── MonClub.Reunions.Supervisor (supervise les séances)
│   ├── SeanceProcess "Soirée Polar"
│   ├── SeanceProcess "Club Manga"
│   └── SeanceProcess "Atelier Écriture"
├── MonClub.Prets.Supervisor (supervise les prêts)
│   ├── PretProcess "Le Nom de la Rose → Marie"
│   └── PretProcess "Dune → Jean"
├── MonClub.Paiements.Listener (écoute les événements)
├── MonClub.Notifications.Listener
└── MonClub.Web.Endpoint (le serveur web)
```

### Ce que vous devez remarquer

C'est un **arbre**. Pas un plat de nouilles, pas un schéma avec des flèches partout. Un arbre hiérarchique où chaque branche est indépendante.

Si toute la branche Réunions plante ? Les Prêts continuent. Les Notifications continuent. Le site web continue. Le superviseur racine redémarre la branche Réunions, qui redémarre ses séances depuis la base.

Si une seule séance plante ? Les autres séances continuent. Même les réunions ne sont pas affectées — juste cette séance-là.

C'est le principe du restaurant poussé à l'extrême. Un serveur trébuche → on le relève. Toute la cuisine prend feu → on ferme la cuisine mais la terrasse reste ouverte. Le bâtiment s'effondre → OK, là on a un problème. Mais chaque niveau de l'arbre isole les problèmes du reste.

### Le vocabulaire

| Ce que vous voyez | Le vrai nom |
|---|---|
| L'arbre entier | **Arbre de supervision** (Supervision Tree) |
| Un nœud qui surveille | **Superviseur** (Supervisor) |
| Un nœud qui travaille | **Worker** (le GenServer) |
| "Si un enfant plante, on le redémarre" | Stratégie **one_for_one** |
| "Si un enfant plante, on redémarre tous les enfants" | Stratégie **one_for_all** |
| "L'application continue malgré le crash" | **Tolérance aux pannes** (Fault Tolerance) |

---

## Jour 6 — Relier les processus et les événements (90 min)

### Ce que vous allez faire

Au Module 8, vous avez mis en place PubSub pour que les modules communiquent par événements. Maintenant, les agrégats sont des processus vivants. Les deux doivent travailler ensemble.

Quand le processus de la Soirée Polar inscrit Marie, il doit publier un événement. Quand le Listener de Paiements reçoit l'événement, il doit créer le paiement.

Demandez à Claude :

> Mon agrégat Séance est un GenServer. Quand une inscription réussit, il doit publier un événement via PubSub. Montre-moi comment intégrer les deux :
>
> 1. Le GenServer inscrit le membre et met à jour la base
> 2. SEULEMENT si l'écriture en base réussit, il publie l'événement
> 3. Le Listener de Paiements reçoit l'événement et crée le paiement
>
> Montre-moi aussi : que se passe-t-il si le processus plante ENTRE l'écriture en base et la publication de l'événement ?

### Le code intégré

```elixir
def handle_call({:inscrire, membre_id}, _from, seance) do
  if seance.places_restantes <= 0 do
    {:reply, {:error, :seance_complete}, seance}
  else
    case Repo.insert(inscription) do
      {:ok, inscription} ->
        # Base OK → mettre à jour la mémoire
        seance = mettre_a_jour_places(seance)

        # Mémoire OK → publier l'événement
        Phoenix.PubSub.broadcast(MonClub.PubSub, "reunions",
          {:membre_inscrit, %{
            membre_id: membre_id,
            seance_id: seance.id,
            places_restantes: seance.places_restantes
          }}
        )

        {:reply, {:ok, :inscrit}, seance}

      {:error, changeset} ->
        {:reply, {:error, :erreur_inscription}, seance}
    end
  end
end
```

### La question difficile

Que se passe-t-il si le processus plante **après** l'écriture en base mais **avant** la publication de l'événement ? L'inscription est enregistrée, mais Paiements n'est jamais prévenu. Marie est inscrite mais n'a pas payé.

C'est un vrai problème, et il n'a pas de solution magique. Les stratégies courantes :

1. **Accepter le risque et rattraper.** Un job périodique vérifie les inscriptions sans paiement et publie les événements manquants.
2. **Outbox pattern.** On écrit l'événement dans la base de données en même temps que l'inscription (dans la même transaction), et un processus séparé lit les événements en base et les publie.

Pour l'instant, la stratégie 1 suffit. Mais notez l'existence du problème — c'est un des problèmes les plus fondamentaux de l'informatique distribuée, et il n'existe nulle part de solution parfaite. Juste des stratégies avec des compromis différents.

---

## Jour 7 — Le bilan

### Ce que vous avez fait cette semaine

Vous avez transformé vos agrégats de **données passives** (stockées dans une base, vérifiées par des tests) en **processus vivants** (qui tournent en mémoire, qui protègent leurs invariants par construction, qui redémarrent automatiquement en cas de crash).

### Le changement de paradigme

| Avant (Modules 7-9) | Maintenant (Module 10) |
|---|---|
| L'agrégat est un schéma de base de données | L'agrégat est un **processus vivant** |
| Les invariants sont vérifiés dans le code | Les invariants sont **garantis par construction** |
| Deux requêtes simultanées = risque | Deux requêtes simultanées = file d'attente |
| Un bug = état incohérent | Un crash = redémarrage automatique |
| La base de données est tout | La base de données est le **backup** |

### Les mots de la semaine

| Ce que vous dites | Le vrai nom |
|---|---|
| "Le guichet qui traite un client à la fois" | **GenServer** |
| "Le gérant qui redémarre les serveurs" | **Superviseur** (Supervisor) |
| "L'arbre du restaurant" | **Arbre de supervision** (Supervision Tree) |
| "La base est le backup, le processus est le gardien" | **Sourcing hybride** |
| "L'invariant ne peut pas être violé" | **Invariant structurel** (vs invariant vérifié) |
| "Crash et redémarrage, c'est normal" | **Let it crash** (philosophie Erlang/Elixir) |

### La structure de votre application

```
MonClub.Application
├── Repo (base de données = source de vérité durable)
├── PubSub (événements de domaine)
│
├── Reunions.Supervisor
│   └── SeanceProcess (GenServer)
│       ├── État en mémoire : séance + inscriptions
│       ├── Invariants : protégés par traitement séquentiel
│       ├── Écrit dans la base à chaque modification
│       └── Publie les événements après écriture réussie
│
├── Prets.Supervisor
│   └── PretProcess (GenServer)
│       ├── État en mémoire : prêt + relances
│       └── ...
│
├── Paiements.Listener (réagit aux événements)
├── Notifications.Listener
└── Web.Endpoint
```

---

## La suite

Votre application a des agrégats vivants, des événements de domaine, des superviseurs. Elle est solide. Mais elle a une limitation : tout est dans un seul serveur. Un seul ordinateur qui fait tout.

Le Module 11 va vous amener au dernier niveau : que se passe-t-il quand vous avez besoin de plusieurs serveurs ? Comment les processus communiquent entre machines ? Comment les événements traversent le réseau ? Elixir a été conçu pour ça depuis le début — c'est le moment de le découvrir.
