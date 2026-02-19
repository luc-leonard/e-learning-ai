# Jour 4 : Annoncer au lieu d'ordonner

## *Module 9 — Le monolithe qui enfle*

---

### Avant de commencer : une analogie

Votre application, c'est un immeuble de bureaux. Chaque étage est un département (un contexte). Comptes au 1er, Livres au 2ème, Réunions au 3ème.

Bien séparé. Propre. Chaque étage a sa porte.

Sauf que dans la pratique, les employés passent leur temps dans l'ascenseur. Quelqu'un des Réunions descend aux Comptes pour demander "ce membre existe-t-il ?". Le département Livres descend aussi aux Comptes pour vérifier un votant. Aller-retour, aller-retour. Les étages sont séparés, mais les gens sont emmêlés.

Un jour, les Comptes déménagent et changent leur porte d'entrée. Panique dans tout l'immeuble — c'est exactement ce qui s'est passé au Jour 3.

Maintenant, imaginez un autre système : chaque département a un **tableau d'affichage** dans le hall. Quand les Réunions inscrivent quelqu'un, ils n'appellent personne — ils affichent une note : *"Marie s'est inscrite à la Soirée Polar"*. Si un autre département est intéressé, il regarde le tableau et fait son travail. Personne n'appelle personne directement.

Si les Comptes déménagent ? Aucun impact sur les annonces. Le tableau d'affichage est toujours au même endroit.

**Durée :** 1h-1h30
**Ce qu'il vous faut :** Votre carnet (pas besoin d'ordinateur pour la première partie)

---

### La règle

Il y a deux types de communication entre contextes :

**La question** — "J'ai besoin d'une réponse pour continuer."
- "Ce membre existe-t-il ?" → Oui, il faut une réponse immédiate. Pas d'inscription possible sans cette vérification.
- Ça reste un appel direct. Normal.

**L'annonce** — "Quelque chose s'est passé, réagissez si ça vous concerne."
- "Marie s'est inscrite à la Soirée Polar" → Réunions n'a pas besoin de réponse. L'inscription est faite. Si quelqu'un veut envoyer un email de confirmation ou mettre à jour des statistiques, c'est son affaire.
- Ça devrait être un **événement**, pas un appel direct.

La différence : une question **attend** une réponse. Une annonce **n'attend rien**.

---

### L'exercice : classer vos flèches

Reprenez le schéma de flèches du Jour 2 (celui que Claude vous a montré). Pour chaque flèche, décidez : est-ce une **question** ou une **annonce** ?

Par exemple :

| Flèche | Question ou annonce ? | Pourquoi |
|---|---|---|
| Livres → Comptes (vérifier le membre avant un vote) | **Question** | Livres a besoin de la réponse pour continuer |
| Réunions → Comptes (vérifier le membre avant inscription) | **Question** | Réunions a besoin de la réponse pour continuer |

> ✍️ Classez chaque flèche de votre schéma en "question" ou "annonce" dans votre carnet.

Vous remarquerez peut-être que toutes vos flèches actuelles sont des questions. C'est normal — vous n'avez pas encore ajouté de fonctionnalités qui *annoncent* des choses. Mais pensez à ce qui se passerait si vous ajoutiez :
- Un email de confirmation après une inscription à une réunion → **annonce** ("quelqu'un s'est inscrit")
- Une mise à jour de statistiques quand un vote est enregistré → **annonce** ("un vote a eu lieu")
- Une notification quand un nouveau livre est proposé → **annonce** ("un livre a été proposé")

---

### L'exercice : écrire les événements en français

Pour chaque annonce que vous avez identifiée (ou imaginée), écrivez l'événement **en français**. Pas en code — en français, comme une note sur le tableau d'affichage de l'immeuble.

Exemples :
- "Marie s'est inscrite à la Soirée Polar"
- "Jean a voté pour Le Nom de la Rose"
- "Un nouveau livre a été proposé : Dune"

> ✍️ Écrivez vos événements en français dans votre carnet. Au moins 3.

Ces phrases en français vont devenir du code au Jour 5. Mais aujourd'hui, pas de code — juste le concept.

### Ce que vous devez retenir

La règle est simple :
- **Question** (j'ai besoin d'une réponse) → appel direct. Ça reste comme avant.
- **Annonce** (quelque chose s'est passé) → événement. Le tableau d'affichage.

Demain, vous verrez à quoi ressemble ce tableau d'affichage en Elixir.
