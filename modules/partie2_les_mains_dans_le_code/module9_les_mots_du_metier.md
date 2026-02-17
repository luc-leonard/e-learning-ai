# Module 9 : Les mots du métier

## *Quand le code parle comme un développeur alors qu'il devrait parler comme vos utilisateurs*

---

## Ce que vous savez déjà

Vos modules sont découpés. Ils communiquent par événements. L'extérieur est propre. Mais ouvrez le capot d'un contexte — disons Réunions — et regardez à l'intérieur. C'est un sac de fonctions, de tables de base de données, et de champs aux noms techniques. Le bazar a juste déménagé.

Ce module va changer votre façon de penser. Pas votre code — votre façon de penser.

**Durée :** Une semaine (1-2 heures par jour)
**Ce qu'il vous faut :** Votre projet du Module 8, un compte Claude, votre carnet

---

## Avant de commencer : une analogie

Vous êtes le nouveau gérant d'un club de lecture. Le gérant précédent vous a laissé un classeur pour tout gérer. Vous l'ouvrez et vous trouvez :

```
Table 1 : entités
  id | type   | nom              | parent_id | status | data
  1  | event  | Soirée Polar     | null      | active | {"max":20}
  2  | user   | Marie Dupont     | null      | active | {"role":"member"}
  3  | reg    | null             | null      | done   | {"event":1,"user":2}
  4  | review | null             | null      | pub    | {"event":1,"user":2,"text":"..."}
```

Vous comprenez quelque chose ? Tout est une "entité" avec un "type", un "status", et un blob de "data". C'est techniquement exact — mais c'est incompréhensible pour quelqu'un qui gère un club de lecture.

Maintenant imaginez que l'ancien gérant vous avait plutôt laissé ça :

```
Réunions à venir :
  "Soirée Polar" — 15 mars, 20h, Café du Commerce
    Places : 17/20
    Inscrits : Marie Dupont, Jean Martin, ...

Membres :
  Marie Dupont — membre depuis janvier 2025
    A lu : 12 livres
    Prochain emprunt possible : oui (2/3 emprunts utilisés)

Livres en cours :
  "Le Nom de la Rose" — proposé par Jean, 8 votes
    Catégorie : polar historique
    Exemplaires disponibles au prêt : 2
```

C'est le même club. Les mêmes informations. Mais la deuxième version **parle comme le gérant du club**, pas comme un technicien. Vous savez immédiatement ce qu'est une "réunion à venir", un "membre", un "exemplaire disponible au prêt".

Votre code, en ce moment, ressemble au premier classeur. Ce module va le transformer en deuxième classeur.

---

## Jour 1 — Écouter les utilisateurs (90 min)

### Ce que vous allez faire

Pas de code aujourd'hui. Aujourd'hui, vous allez **écouter**.

Imaginez que vous êtes dans le vrai club de lecture. Le gérant, les membres, l'admin — comment parlent-ils de ce qui se passe ? Pas en termes de code. En termes de leur quotidien.

Demandez à Claude :

> Je construis une application pour un club de lecture. Je veux lister tous les mots et expressions qu'utiliserait un vrai gérant de club de lecture pour parler de son activité. Pas des mots techniques — les mots de tous les jours.
>
> Organise-les par thème. Par exemple :
> - Comment parle-t-il des réunions ? (pas des "events" ou des "entities")
> - Comment parle-t-il des membres ? (pas des "users" ou des "accounts")
> - Comment parle-t-il des livres qu'on se prête ?
>
> Pour chaque mot, donne une phrase d'exemple comme un gérant la dirait dans la vraie vie.

### Ce que Claude va vous donner

Quelque chose comme :

```
COMMENT LE GÉRANT PARLE DES RÉUNIONS :

"La prochaine séance est mardi."
→ séance (pas "event", pas "meeting entity")

"Il reste 3 places pour la séance polar."
→ places restantes (pas "available_slots", pas "capacity minus count")

"Marie s'est inscrite mais elle est sur liste d'attente."
→ liste d'attente (pas "waitlist_queue", pas "status: pending")

"On a dû annuler la séance, j'ai prévenu tout le monde."
→ annuler, prévenir (pas "soft delete", pas "trigger notification pipeline")

COMMENT IL PARLE DES LIVRES :

"Jean a proposé 'Le Nom de la Rose' pour le mois prochain."
→ proposer un livre (pas "create book entry")

"On a voté, c'est le polar qui l'a emporté."
→ voter, l'emporter (pas "increment vote count", pas "select max")

"Marie a un exemplaire, elle le prête à Jean."
→ exemplaire, prêter (pas "book instance", pas "create loan record")

"Jean devait rendre le livre il y a deux semaines, je vais le relancer."
→ rendre, relancer (pas "update loan status", pas "send overdue notification")

COMMENT IL PARLE DES MEMBRES :

"Marie est une habituée, elle vient depuis le début."
→ habituée (pas "user with created_at < threshold")

"Jean est nouveau, c'est sa deuxième séance."
→ nouveau membre (pas "user where session_count <= 2")

"Paul a été un peu pénible, on l'a exclu du club."
→ exclure (pas "ban", pas "set status: banned")
```

### Pourquoi c'est important

Regardez la différence entre les deux colonnes. À gauche, des mots que tout le monde comprend. À droite, des mots de développeur que seul le code comprend.

Votre code est rempli de mots de droite. Et c'est un problème, parce que :

1. **Vous ne comprenez pas votre propre code.** Quand vous lisez `update_entity_status`, vous devez réfléchir pour savoir si c'est "annuler une séance" ou "exclure un membre" ou autre chose.

2. **Claude ne comprend pas votre intention.** Quand vous dites "gère l'annulation", Claude ne sait pas si vous parlez de l'annulation d'une séance, d'une inscription, d'un prêt, ou d'un paiement — parce que dans le code, tout s'appelle `cancel`.

3. **Les bugs se cachent dans le flou.** Si une fonction s'appelle `process_event`, elle peut faire n'importe quoi. Si elle s'appelle `annuler_seance_et_rembourser_inscrits`, il est beaucoup plus facile de vérifier qu'elle fait bien ce qu'elle dit.

### L'exercice

Prenez la liste de mots du gérant et collez-la dans votre carnet. C'est votre **dictionnaire du domaine**. À partir de maintenant, votre code doit utiliser CES mots, pas des mots techniques.

---

## Jour 2 — Regarder le code avec les yeux du gérant (90 min)

### Ce que vous allez faire

Ouvrez votre contexte Réunions et demandez à Claude :

> Voici le code de mon contexte Réunions :
> [collez le code]
>
> Et voici le dictionnaire des mots qu'utilise un vrai gérant de club de lecture :
> [collez le dictionnaire du Jour 1]
>
> Compare les deux. Pour chaque fonction et chaque champ de données, dis-moi :
> - Le nom actuel dans le code
> - Ce que le gérant appellerait ça
> - Si c'est différent (et ça le sera souvent)

### 🔴 Ce que vous allez découvrir

Le décalage est brutal. Exemples typiques :

| Dans le code | Le gérant dit |
|---|---|
| `Event` | **Séance** |
| `create_event` | **Programmer une séance** |
| `Registration` | **Inscription** |
| `cancel_registration` | **Se désinscrire** |
| `status: "cancelled"` | **Séance annulée** |
| `max_attendees` | **Nombre de places** |
| `user` | **Membre** |
| `book_instance` | **Exemplaire** |
| `loan` | **Prêt** (ou **emprunt** selon le point de vue) |
| `notification` | **Message** (ou **rappel**, ou **confirmation** — ce n'est pas la même chose !) |

Ce dernier point est crucial. Votre code a probablement un concept unique de "notification". Mais le gérant fait la différence entre une **confirmation** ("vous êtes inscrit"), un **rappel** ("la séance est demain"), et une **alerte** ("la séance est annulée"). Ce sont trois choses différentes dans la vraie vie, mais une seule dans le code. C'est une source de bugs et de confusion.

### Ce que vous devez noter dans votre carnet

> ✍️ Combien de noms dans le code ne correspondent pas aux mots du gérant ?
> ✍️ Y a-t-il des concepts dans le vocabulaire du gérant qui n'existent pas du tout dans le code ?
> ✍️ Y a-t-il des concepts dans le code qui n'ont aucun équivalent dans le vocabulaire du gérant ? (Si oui, demandez-vous s'ils devraient exister.)

---

## Jour 3 — Les choses qui vont ensemble (2h)

### L'idée clé

Dans votre base de données, tout est à plat. Vous avez une table de séances, une table de membres, une table d'inscriptions, une table de paiements. Chaque table est indépendante, reliée aux autres par des numéros.

Mais dans la vraie vie, les choses ne sont pas à plat. Elles forment des **grappes**.

Quand le gérant pense à une séance, il ne pense pas à une ligne dans une table. Il pense à un **ensemble** :

```
La Soirée Polar
├── 15 mars, 20h, Café du Commerce
├── 20 places, dont 17 prises
├── Inscrits :
│   ├── Marie Dupont (inscrite le 2 mars, payé 5€)
│   ├── Jean Martin (inscrit le 5 mars, payé 5€)
│   └── Paul Durand (liste d'attente depuis le 8 mars)
├── Livre discuté : "Le Nom de la Rose"
└── Statut : confirmée
```

C'est un **tout**. Vous n'inscrivez pas quelqu'un "dans la table inscriptions" — vous inscrivez quelqu'un **à la Soirée Polar**. L'inscription n'a aucun sens sans la séance. Le paiement n'a aucun sens sans l'inscription. C'est une grappe.

Et cette grappe a des **règles qui s'appliquent à l'ensemble** :

- Le nombre d'inscrits ne dépasse jamais le nombre de places → c'est un invariant de LA GRAPPE, pas d'une table
- On ne peut pas s'inscrire deux fois → c'est une règle de LA GRAPPE
- Quand la séance est annulée, TOUS les inscrits sont remboursés → c'est une action sur LA GRAPPE

### Ce que vous allez faire

Demandez à Claude :

> Voici le dictionnaire de mon domaine et le code de mon contexte Réunions :
> [collez les deux]
>
> Identifie les "grappes" — les choses qui vont ensemble et qui n'ont pas de sens séparément. Pour chaque grappe :
> 1. Quelle est la chose principale ? (la "racine")
> 2. Quelles sont les choses qui lui sont rattachées ?
> 3. Quels invariants s'appliquent à la grappe entière ?
> 4. Quelles actions modifient la grappe ?

### Ce que Claude va vous montrer

```
GRAPPE : Séance
  Racine : la séance elle-même (date, lieu, nombre de places)
  Rattachés :
    - Les inscriptions (qui est inscrit, quand, statut du paiement)
    - La liste d'attente (qui attend, dans quel ordre)
  Invariants :
    - nombre d'inscrits ≤ nombre de places
    - un membre ne peut pas être inscrit ET en liste d'attente
    - une séance annulée n'accepte plus d'inscriptions
  Actions :
    - Programmer une séance
    - Inscrire un membre (crée une inscription DANS la séance)
    - Annuler la séance (affecte TOUTES les inscriptions)
    - Passer de la liste d'attente à inscrit (quand une place se libère)

GRAPPE : Prêt
  Racine : le prêt (qui prête, qui emprunte, quel exemplaire)
  Rattachés :
    - L'état du prêt (en cours, rendu, en retard)
    - Les relances (dates, messages envoyés)
  Invariants :
    - un exemplaire ne peut être dans qu'un seul prêt actif
    - un prêt a toujours un prêteur ET un emprunteur
  Actions :
    - Demander un emprunt
    - Accepter / refuser
    - Signaler le retour
    - Relancer l'emprunteur
```

### Le mot pour ça

Ces grappes, dans le vocabulaire professionnel, s'appellent des **agrégats** (Aggregates). La chose principale s'appelle la **racine de l'agrégat** (Aggregate Root).

La règle d'or : **toute modification passe par la racine**. On n'inscrit pas quelqu'un en modifiant directement la table des inscriptions — on demande à la séance d'inscrire quelqu'un. C'est la séance qui vérifie les invariants (reste-t-il des places ?), pas l'inscription.

C'est exactement comme dans une entreprise : vous ne modifiez pas directement la fiche de paie d'un employé — vous passez par les RH qui vérifient que tout est conforme.

---

## Jour 4 — Les choses qui ont une valeur, pas une identité (90 min)

### Un concept subtil mais important

Dans votre club de lecture, il y a deux types de choses :

**Des choses qu'on identifie par QUI elles sont :**
- Marie Dupont est Marie Dupont. Si deux personnes s'appellent Marie Dupont, ce sont quand même deux personnes différentes. C'est l'**identité** qui compte.
- La Soirée Polar du 15 mars est unique. Même si vous créez une autre soirée polar, ce n'est pas la même.

**Des choses qu'on identifie par CE QU'ELLES CONTIENNENT :**
- Une adresse "12 rue des Lilas, Paris". Si deux séances ont lieu à la même adresse, c'est la même adresse. Pas deux adresses différentes qui se ressemblent — la même.
- Un créneau horaire "mardi 20h-22h". Un créneau est défini par son contenu, pas par un numéro d'identité.
- Un montant "5€". Cinq euros, c'est cinq euros. Il n'y a pas "ce 5€-ci" et "ce 5€-là".

Les premières sont des **entités** — elles ont une identité propre.
Les secondes sont des **objets-valeur** (Value Objects) — elles sont définies par leur contenu.

### Pourquoi ça compte

Dans votre code, probablement tout est une entité. L'adresse d'une séance est stockée comme des champs séparés (`rue`, `ville`, `code_postal`) directement dans la table des séances. Le créneau horaire est juste un `datetime`. Le montant est un nombre.

Le problème :

```elixir
# Dans le code actuel :
seance.adresse_rue    # "12 rue des Lilas"
seance.adresse_ville  # "Paris"
seance.adresse_cp     # "75010"

# Que se passe-t-il si on veut vérifier que deux séances
# sont au même endroit ?
seance1.adresse_rue == seance2.adresse_rue and
seance1.adresse_ville == seance2.adresse_ville and
seance1.adresse_cp == seance2.adresse_cp
# C'est fragile et moche.
```

Avec un objet-valeur :

```elixir
# Avec un objet-valeur Adresse :
defmodule MonClub.Adresse do
  defstruct [:rue, :ville, :code_postal]
end

seance.lieu  # %Adresse{rue: "12 rue des Lilas", ville: "Paris", code_postal: "75010"}

# Deux séances au même endroit ?
seance1.lieu == seance2.lieu
# Simple et clair.
```

### Ce que vous allez faire

Demandez à Claude :

> Voici le code de mes contextes :
> [collez le code]
>
> Identifie les choses qui sont des objets-valeur déguisés — des données qui sont définies par leur contenu, pas par une identité unique. Pour chacune :
> 1. Où est-elle éparpillée en champs séparés dans le code ?
> 2. Quel objet-valeur pourrait la regrouper ?
> 3. Quel nom en langage du gérant ?

### Exemples courants

Claude va probablement trouver :

| Champs éparpillés | Objet-valeur | Nom du gérant |
|---|---|---|
| `rue`, `ville`, `cp` | `Adresse` | "L'adresse de la séance" |
| `date`, `heure_debut`, `heure_fin` | `Creneau` | "Le créneau de la séance" |
| `montant`, `devise` | `Montant` | "Le prix de la séance" |
| `prenom`, `nom`, `email` | `Coordonnees` | "Les coordonnées du membre" |
| `debut_pret`, `duree_max` | `PeriodeDePret` | "La durée du prêt" |

Transformez-en au moins deux ou trois. Demandez à Claude de créer les structs Elixir et de mettre à jour les contextes concernés.

---

## Jour 5 — Réécrire le code en langage du domaine (2h)

### Ce que vous allez faire

Vous avez maintenant trois outils :
1. Le **dictionnaire du domaine** (Jour 1) — les mots du gérant
2. Les **agrégats** (Jour 3) — les grappes de choses qui vont ensemble
3. Les **objets-valeur** (Jour 4) — les choses définies par leur contenu

Vous allez réécrire votre contexte Réunions en utilisant tout ça.

Demandez à Claude :

> Voici le code actuel de mon contexte Réunions :
> [collez le code]
>
> Voici mon dictionnaire du domaine :
> [collez le dictionnaire]
>
> Voici les agrégats identifiés :
> [collez les agrégats du Jour 3]
>
> Voici les objets-valeur identifiés :
> [collez les objets-valeur du Jour 4]
>
> Réécris le contexte Réunions pour que :
> 1. Les noms de fonctions utilisent le vocabulaire du gérant
> 2. L'agrégat Séance soit la racine — toute modification passe par la séance
> 3. Les objets-valeur soient utilisés au lieu de champs éparpillés
> 4. Les invariants de l'agrégat soient vérifiés dans la racine, pas ailleurs

### Ce que le code va devenir

Avant :

```elixir
defmodule MonClub.Reunions do
  def create_event(params) do ... end
  def register_user(event_id, user_id) do ... end
  def cancel_registration(reg_id) do ... end
  def update_event_status(event_id, status) do ... end
end
```

Après :

```elixir
defmodule MonClub.Reunions do
  def programmer_seance(titre, %Creneau{} = creneau, %Adresse{} = lieu, nombre_de_places) do
    # Crée une séance avec ses paramètres
  end

  def inscrire_membre(seance_id, membre_id) do
    # Charge la séance (l'agrégat entier)
    # Vérifie l'invariant : reste-t-il des places ?
    # Vérifie l'invariant : le membre n'est-il pas déjà inscrit ?
    # Ajoute l'inscription DANS la séance
    # Publie {:membre_inscrit, ...}
  end

  def desinscrire_membre(seance_id, membre_id) do
    # Charge la séance
    # Retire l'inscription
    # S'il y a une liste d'attente, passe le suivant en inscrit
    # Publie {:membre_desinscrit, ...}
  end

  def annuler_seance(seance_id, raison) do
    # Charge la séance avec TOUS ses inscrits
    # Marque tout comme annulé
    # Publie {:seance_annulee, %{inscrits: [...], raison: raison}}
  end
end
```

### Ce que vous devez remarquer

1. **Les noms des fonctions sont du français du gérant.** `programmer_seance`, `inscrire_membre`, `annuler_seance` — le gérant comprend ce code sans explication.

2. **Tout passe par la séance.** On ne modifie pas une inscription directement. On demande à la séance d'inscrire quelqu'un. La séance vérifie ses invariants.

3. **Les objets-valeur sont explicites.** `%Creneau{}`, `%Adresse{}` — ce ne sont pas des champs flottants, ce sont des concepts nommés.

4. **Les événements aussi parlent le langage du domaine.** `{:membre_inscrit}`, `{:seance_annulee}` — pas `{:registration_created}`, `{:event_status_updated}`.

---

## Jour 6 — Vérifier que tout tient (90 min)

### Ce que vous allez faire

Vos tests doivent suivre. Réécrivez-les dans le langage du domaine :

Avant :

```elixir
test "create registration decrements available slots" do
  event = create_event(%{max_attendees: 3})
  register_user(event.id, user.id)
  assert get_event(event.id).available_slots == 2
end
```

Après :

```elixir
test "inscrire un membre diminue le nombre de places" do
  seance = programmer_seance("Soirée Polar", creneau, lieu, 3)
  inscrire_membre(seance.id, marie.id)
  assert places_restantes(seance.id) == 2
end

test "impossible d'inscrire quand la séance est complète" do
  seance = programmer_seance("Soirée Polar", creneau, lieu, 1)
  inscrire_membre(seance.id, marie.id)
  assert {:error, :seance_complete} = inscrire_membre(seance.id, jean.id)
end

test "annuler une séance publie un événement avec tous les inscrits" do
  seance = programmer_seance("Soirée Polar", creneau, lieu, 20)
  inscrire_membre(seance.id, marie.id)
  inscrire_membre(seance.id, jean.id)

  annuler_seance(seance.id, "Mauvais temps")

  assert_event_published({:seance_annulee, %{
    inscrits: [marie.id, jean.id],
    raison: "Mauvais temps"
  }})
end
```

### Ce que vous devez remarquer

Les tests **se lisent comme des scénarios de la vraie vie**. Quelqu'un qui ne connaît pas le code pourrait lire le test et comprendre ce qui est vérifié. C'est le signe que votre code parle la langue du domaine.

Le gérant du club pourrait relire ces tests et dire "oui, c'est bien comme ça que ça devrait marcher". Essayez avec les vôtres — si vous devez expliquer ce que le test fait, c'est que les noms ne sont pas assez clairs.

---

## Jour 7 — Le bilan et le nouveau vocabulaire

### Les mots de la semaine

| Ce que vous dites | Le vrai nom | Ce que ça signifie |
|---|---|---|
| "Dictionnaire du gérant" | **Langage omniprésent** (Ubiquitous Language) | Le vocabulaire partagé entre les utilisateurs et le code |
| "Grappe de choses qui vont ensemble" | **Agrégat** (Aggregate) | Un ensemble d'objets traités comme un tout |
| "La chose principale de la grappe" | **Racine de l'agrégat** (Aggregate Root) | Le point d'entrée — toute modification passe par elle |
| "Chose définie par son contenu" | **Objet-valeur** (Value Object) | Une donnée sans identité propre (adresse, montant, créneau) |
| "Chose définie par qui elle est" | **Entité** (Entity) | Un objet avec une identité unique (membre, séance) |
| "Le code parle comme le gérant" | **Domain-Driven Design** (DDD) | Concevoir le logiciel à partir du langage et des règles du métier |

### Ce que vous faites depuis le début, c'est du DDD

Le Domain-Driven Design a été formalisé par Eric Evans en 2003. C'est une approche qui dit : le code doit être organisé autour du **métier** (le domaine), pas autour de la technique. Les modules découpent par responsabilité métier. Les interfaces parlent le langage des utilisateurs. Les invariants expriment les règles métier.

Vous le faites depuis le Module 1. Vous ne le saviez simplement pas.

### La structure interne d'un module, maintenant

```
MODULE : Réunions
│
├── Interface (fonctions publiques)
│   ├── programmer_seance(titre, créneau, lieu, places)
│   ├── inscrire_membre(seance_id, membre_id)
│   ├── desinscrire_membre(seance_id, membre_id)
│   └── annuler_seance(seance_id, raison)
│
├── Agrégat : Séance
│   ├── Racine : Séance (titre, créneau, lieu, places, statut)
│   ├── Rattachés : Inscription (membre, date, statut paiement)
│   ├── Rattachés : Liste d'attente (membre, position)
│   └── Invariants :
│       ├── inscrits ≤ places
│       ├── pas de double inscription
│       └── séance annulée = plus d'inscriptions
│
├── Objets-valeur
│   ├── Créneau (date, heure début, heure fin)
│   ├── Adresse (rue, ville, code postal)
│   └── Montant (valeur, devise)
│
└── Événements publiés
    ├── {:seance_programmee, ...}
    ├── {:membre_inscrit, ...}
    ├── {:membre_desinscrit, ...}
    └── {:seance_annulee, ...}
```

C'est propre. C'est lisible. Et surtout — c'est compréhensible par quelqu'un qui n'a jamais vu une ligne de code.

---

## La suite

Votre code parle le langage du métier. Vos modules sont découpés par domaine. Vos agrégats protègent vos invariants. Mais il y a un dernier problème : quand le projet grandit, certains agrégats deviennent énormes. La séance gère les inscriptions, la liste d'attente, l'annulation, les statistiques...

Le Module 10 va vous apprendre à faire en sorte que les invariants soient **protégés dans le code lui-même**, pas juste dans vos tests. Et les outils d'Elixir — les processus et les arbres de supervision — vont rendre ça étonnamment naturel.
