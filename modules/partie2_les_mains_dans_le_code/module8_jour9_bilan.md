# Jour 9 : Le bilan

## *Module 8 — Les mains dans le moteur*

---

### Ce que vous avez fait ces dix jours

Vous avez traversé un seuil. Vous n'êtes plus uniquement un architecte qui donne des plans à l'IA — vous êtes quelqu'un qui peut **lire le code, identifier les problèmes, et guider les corrections avec précision**.

**Durée :** 45min-1h
**Ce qu'il vous faut :** Votre carnet

---

### Les compétences acquises

| Compétence | Ce que ça signifie |
|---|---|
| **Lire une fonction** | Vous voyez `def`, les paramètres, et la valeur de retour — vous comprenez ce que fait la fonction |
| **Lire les chemins ok/error** | Vous savez que `{:ok, ...}` et `{:error, ...}` sont les deux chemins d'un parcours |
| **Reconnaître un module** | Vous voyez `defmodule` et vous pensez "partie de mon plan" |
| **Suivre un pipe** | Vous comprenez `\|>` comme "puis" — une chaîne d'étapes |
| **Lire un sommaire** | Vous pouvez regarder les fonctions publiques d'un module et comprendre son interface |
| **Voir le monolithe** | Vous savez reconnaître quand tout est entassé au même endroit |
| **Aligner plan et code** | Vous savez vérifier que la structure du code correspond à votre plan d'architecture |

### Ce que vous ne savez PAS encore faire (et c'est normal)

- Écrire du code Elixir de zéro (vous modifiez avec Claude Code)
- Comprendre tout ce que fait Phoenix en coulisses (les <dfn title="Des scripts qui modifient la structure de la base de données — ajouter une table, une colonne, etc.">migrations</dfn>, le routeur, les sockets)
- Optimiser les performances
- Gérer le déploiement

Rien de ça n'est nécessaire pour la suite. Ce qui est nécessaire, c'est ce que vous savez faire : **lire, comprendre la structure, et guider Claude avec précision**.

### La structure de votre projet

```
plan.md                              ← votre plan d'architecture
  INVARIANTS
  VUE D'ENSEMBLE (parties + interfaces)
  FICHES DÉTAILLÉES
  FLUX
  TESTS

CODE                                 ← votre code, aligné sur le plan
├── lib/mon_club/
│   ├── comptes/comptes.ex          ← partie = defmodule
│   ├── livres/livres.ex            ← fonctions publiques = interface
│   ├── reunions/reunions.ex        ← code interne = implémentation
│   └── ...
```

### Avant de partir — sauvegardez

```bash
git add .
git commit -m "Module 8 terminé : lecture de code et alignement plan/code"
```

---

## La suite

Votre code est bien découpé. Ça marche. Mais la semaine prochaine, on va faire grossir le projet sérieusement — et vous allez découvrir que des contextes bien découpés ne suffisent pas. Quand le contexte "Réunions" a besoin de savoir des choses sur les "Comptes" et les "Paiements" et les "Notifications" en même temps, les dépendances se multiplient et le code redevient un plat de nouilles — mais cette fois entre les contextes, pas à l'intérieur. Le Module 9 vous apprendra à gérer ça.
