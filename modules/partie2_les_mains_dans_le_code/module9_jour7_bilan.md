# Jour 7 : Le bilan

## *Module 9 — Le monolithe qui enfle*

---

### Ce que vous avez fait cette semaine

Vous avez résolu le **deuxième niveau de couplage**. Le premier (tout dans un fichier) a été résolu au Module 8 en découpant. Le deuxième (les modules qui s'appellent trop) a été résolu cette semaine en passant des appels directs aux événements.

**Durée :** 45min-1h
**Ce qu'il vous faut :** Votre carnet

---

### Les compétences acquises

| Compétence | Ce que ça signifie |
|---|---|
| **Voir le couplage inter-contextes** | Vous savez dessiner les flèches entre contextes et compter les dépendances |
| **Provoquer la casse** | Vous savez tester si un découpage tient en modifiant une interface |
| **Distinguer question et annonce** | Vous savez classer chaque appel entre contextes |
| **Lire un broadcast PubSub** | Vous reconnaissez `Phoenix.PubSub.broadcast(...)` comme "afficher sur le tableau" |
| **Lire un listener** | Vous reconnaissez un module qui écoute des événements, même sans comprendre GenServer |
| **Nommer un événement** | Vous savez que `{:membre_inscrit}` est un bon nom et `{:row_inserted}` un mauvais nom |

### Ce que vous ne savez PAS encore faire (et c'est normal)

- Écrire un listener de zéro sans Claude Code
- Gérer les cas d'erreur dans les événements asynchrones (que se passe-t-il si le listener plante ?)
- Tester l'asynchrone en détail (les tests de listeners sont un sujet avancé)

Rien de ça n'est nécessaire pour la suite. Ce qui est nécessaire, c'est ce que vous savez faire : **voir le couplage, le nommer, et guider Claude pour le réduire**.

### Le vocabulaire de la semaine

| Ce que vous dites | Le vrai nom | Ce que ça signifie |
|---|---|---|
| "Annonce ce qui s'est passé" | **Événement de domaine** (Domain Event) | Un fait qui s'est produit, exprimé au passé |
| "Le tableau d'affichage" | **PubSub** (Publish/Subscribe) | Un mécanisme où quelqu'un publie et d'autres s'abonnent |
| "Écouter et réagir" | **Listener** (ou Handler) | Un module qui attend un événement et réagit |
| "Je pose une question" | **Requête** (Query) | Un appel qui demande une information sans rien modifier |
| "Je donne un ordre" | **Commande** (Command) | Un appel qui demande de faire quelque chose |
| "Je n'ai pas besoin de savoir qui écoute" | **Découplage par événements** | Les modules communiquent sans se connaître |

### Le point sur le nommage

Vos événements doivent parler du **club de lecture**, pas du code :

- `{:membre_inscrit_reunion, ...}` → le gérant du club comprend
- `{:row_inserted, ...}` → seul un développeur comprend

Si un événement ne peut pas se traduire en une phrase que le gérant du club comprendrait, il est probablement mal nommé.

### La structure de votre projet

```
plan.md                              ← votre plan d'architecture
  INVARIANTS
  VUE D'ENSEMBLE (parties + interfaces)
  FICHES DÉTAILLÉES
  FLUX
  ÉVÉNEMENTS                         ← nouveau !
  TESTS

CODE
├── lib/mon_club/
│   ├── comptes/comptes.ex
│   ├── livres/livres.ex            ← publie des événements
│   ├── reunions/reunions.ex        ← publie des événements
│   └── notifications/              ← écoute des événements (si créé)
│       └── listener.ex
```

### Avant de partir — sauvegardez

```bash
git add .
git commit -m "Module 9 terminé : couplage inter-contextes et événements PubSub"
```

---

## La suite

Vos modules sont découpés et communiquent par événements. L'extérieur est propre. Mais ouvrez le capot d'un contexte — disons Réunions — et regardez à l'intérieur. C'est un sac de fonctions, de tables de base de données, et de champs aux noms techniques. Le bazar a juste déménagé.

Le Module 10 va changer votre façon de penser l'intérieur d'un contexte, en s'appuyant sur **les mots que vos utilisateurs emploient** — pas les mots de la technique.
