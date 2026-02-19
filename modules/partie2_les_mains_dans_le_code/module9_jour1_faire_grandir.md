# Jour 1 : Faire grandir le projet

## *Module 9 — Le monolithe qui enfle*

---

### Avant de commencer

Au Jour 7 du Module 8, vous avez vu le monolithe — tout entassé dans un seul contexte. Au Jour 8, vous l'avez découpé en contextes séparés : Comptes, Livres, Réunions. Chacun chez soi, chacun avec sa porte d'entrée.

Ça fonctionne. Mais votre club de lecture est un peu trop simple. Dans un vrai club, les parties ne vivent pas chacune dans leur bulle — elles ont besoin les unes des autres. C'est normal, et c'est ce qu'on va créer aujourd'hui.

**Durée :** 1h30-2h
**Ce qu'il vous faut :** Votre dossier `mon_club` ouvert dans VSCode, Claude Code, votre carnet

---

### Ce que vous allez faire

Quittez Claude Code (`/exit`) et relancez une nouvelle session :

```bash
claude
```

Vous allez demander à Claude Code d'ajouter deux fonctionnalités qui **lient les contextes entre eux**. Ce n'est pas un accident — c'est exactement ce qui arrive quand un projet grandit.

**Demande 1 :**

> Lis plan.md et le code du projet.
>
> Ajoute cette fonctionnalité : seuls les membres inscrits (contexte Comptes) peuvent voter pour un livre (contexte Livres). Avant d'enregistrer un vote, le code doit vérifier que le membre existe dans Comptes.
>
> Mets à jour plan.md pour refléter cette nouvelle règle.

Attendez que Claude ait fini. Lancez le site (`mix phx.server`) et vérifiez dans le navigateur que ça marche.

**Demande 2 :**

> Ajoute une deuxième fonctionnalité : quand quelqu'un s'inscrit à une réunion (contexte Réunions), le code doit vérifier que cette personne est un membre inscrit (contexte Comptes) et que les places ne sont pas pleines.
>
> Mets à jour plan.md.

Vérifiez à nouveau dans le navigateur.

### Ce qui vient de se passer

Regardez votre code. Le contexte Livres appelle maintenant le contexte Comptes pour vérifier qu'un membre existe. Le contexte Réunions fait la même chose. Vos contextes bien séparés se **connaissent** maintenant.

C'est parfaitement logique — un club de lecture ne peut pas fonctionner si les réunions ne savent pas qui sont les membres. Mais ça crée quelque chose de nouveau : des **liens entre les contextes**.

### Ce que vous devez noter dans votre carnet

> ✍️ Quels contextes appellent d'autres contextes maintenant ?
> ✍️ Est-ce que ça vous semble normal que Livres ait besoin de Comptes ?

### Avant de partir — sauvegardez

```bash
git add .
git commit -m "Jour 1 M9 : ajout vote membres et inscription réunions"
```
