# Jour 3 : Provoquer la casse

## *Module 9 — Le monolithe qui enfle*

---

### Avant de commencer

Au Module 4, vous avez appris à "faire confiance mais vérifier". Aujourd'hui, vous allez vérifier que votre découpage tient vraiment — en le cassant volontairement.

**Durée :** 1h30
**Ce qu'il vous faut :** Votre dossier `mon_club` ouvert dans VSCode, Claude Code, votre carnet

---

### Ce que vous allez faire

Quittez Claude Code (`/exit`) et relancez une nouvelle session :

```bash
claude
```

Demandez à Claude Code de faire un changement dans le contexte Comptes :

> Lis le code du contexte Comptes.
>
> Renomme la fonction qui récupère un membre (par exemple `get_membre` ou le nom équivalent) en `trouver_membre`. Ne modifie que le contexte Comptes — ne touche pas aux autres contextes.

### 🔴 Ce qui va se passer

Les autres contextes vont casser. Livres appelle la fonction de Comptes pour vérifier qu'un membre existe — mais cette fonction vient de changer de nom. Réunions fait pareil. Résultat : des erreurs.

**Ne corrigez pas.** C'est le but de l'exercice.

### L'enquête

Demandez à Claude Code :

> Sans rien corriger, montre-moi tous les endroits du code qui appellent l'ancienne fonction de Comptes. Combien de fichiers sont touchés ?

### Ce que vous devez noter dans votre carnet

> ✍️ Combien de fichiers sont cassés par ce seul changement de nom ?
> ✍️ Est-ce que ces fichiers ont un rapport avec les comptes ? (Non — ils gèrent les livres et les réunions.)

### Annuler la casse

Vous connaissez la commande depuis le Module 1 :

```bash
git checkout .
```

Tout revient à l'état du dernier commit. Le code remarche.

### La leçon

Un seul changement dans un seul contexte a cassé les autres. Pourquoi ? Parce que les contextes **se connaissent trop**. Livres sait que Comptes a une fonction qui s'appelle d'une certaine façon. Réunions sait la même chose. Si Comptes change, ils tombent.

**Découper ne suffit pas si les modules se connaissent trop.** La séparation physique (des fichiers différents) n'est pas une séparation réelle si les modules dépendent des détails internes des autres.

C'est le problème qu'on va résoudre dans les prochains jours.
