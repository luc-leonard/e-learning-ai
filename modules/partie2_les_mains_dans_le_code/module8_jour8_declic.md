# Jour 8 : Le moment déclic — votre plan devient du code

## *Module 8 — Les mains dans le moteur*

---

### Avant de commencer

C'est le jour le plus important de ce module. Pas le plus technique — le plus **révélateur**.

Depuis le Module 1, vous construisez un plan d'architecture. Vous avez découpé en parties, défini des interfaces, dessiné des parcours, nommé des concepts. Ce plan existe dans votre fichier `plan.md`.

Aujourd'hui, vous allez voir ce plan **prendre vie dans le code**.

**Durée :** 1h30-2h
**Ce qu'il vous faut :** Votre dossier `mon_club` ouvert dans VSCode, Claude Code, votre carnet

---

### Ce que vous allez faire

Quittez Claude Code (`/exit`) et relancez une nouvelle session :

```bash
claude
```

Envoyez ce message :

> Lis plan.md. Puis lis le code du contexte principal de mon club de lecture.
>
> Le contexte unique contient tout mélangé. Je veux le découper en contextes Phoenix séparés, un par partie de mon plan. Les interfaces de mon plan doivent devenir les fonctions publiques de chaque contexte.
>
> Fais la séparation et montre-moi le résultat.

### Ce que vous allez voir

Le code va se réorganiser en quelque chose comme :

```
lib/mon_club/
  comptes/          ← la partie Comptes de votre plan
    comptes.ex      ← l'interface (fonctions publiques)
  livres/           ← la partie Livres
    livres.ex
  reunions/         ← la partie Réunions
    reunions.ex
```

Chaque dossier est une **partie** de votre plan. Chaque fichier principal (`.ex`) contient les **fonctions publiques** — la porte d'entrée dont vous parliez au Module 3.

### La comparaison

Maintenant, faites la comparaison côte à côte. Ouvrez `plan.md` d'un côté (dans VSCode, clic droit sur le fichier → "Ouvrir sur le côté"). De l'autre côté, regardez la structure des fichiers.

Demandez à Claude Code :

> Pour chaque contexte Phoenix que tu as créé, montre-moi ses fonctions publiques. Juste les noms et les paramètres, comme un sommaire.

Comparez ce sommaire avec les interfaces de votre plan.

### Le déclic

Regardez bien. Votre plan dit "La partie Livres sait : ajouter un livre, lister les livres, supprimer un livre". Le code dit `def ajouter(titre, auteur)`, `def lister()`, `def supprimer(id)`.

**Votre plan et votre code disent la même chose.** Ce n'est pas un hasard. C'est parce que votre plan est bon — et parce que bien architecturer un projet *avant* de coder, c'est exactement ce que font les professionnels. Vous le faites depuis le Module 1.

Tout ce que vous avez appris — les parties, les interfaces, les portes d'entrée, les parcours avec chemins d'erreur, les invariants — ce ne sont pas des exercices scolaires. Ce sont les fondations sur lesquelles le code est construit. Le code n'est que votre plan **traduit dans un langage que l'ordinateur comprend**.

### La vérification

Demandez à Claude Code :

> Est-ce que les fonctions publiques de chaque contexte correspondent aux interfaces de plan.md ? S'il y a des différences, lesquelles ?

S'il y a des différences, c'est soit que le plan a besoin d'être mis à jour, soit que le code n'a pas bien été découpé. Les deux sources de vérité — le plan et le code — doivent être alignées.

### Ce que vous devez noter dans votre carnet

> ✍️ Est-ce que la structure du code ressemble à votre plan ?
> ✍️ Y avait-il des parties dans votre plan qui manquaient dans le code, ou l'inverse ?
> ✍️ Qu'est-ce que ça vous fait de voir votre plan "en vrai" dans le code ?

### Avant de partir — sauvegardez

```bash
git add .
git commit -m "Jour 8 : découpage en contextes Phoenix alignés sur le plan"
```
