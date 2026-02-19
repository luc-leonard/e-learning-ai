# Jour 2 : Voir les fils emmêlés

## *Module 9 — Le monolithe qui enfle*

---

### Avant de commencer

Au Module 3, vous avez dessiné la carte de votre projet — les parties, les interfaces, les liens. Aujourd'hui, vous allez dessiner une nouvelle carte. Pas celle du plan cette fois — celle du **code réel**.

**Durée :** 1h-1h30
**Ce qu'il vous faut :** Votre dossier `mon_club` ouvert dans VSCode, Claude Code, votre carnet

---

### L'exercice : dessiner avant de regarder

Avant d'ouvrir Claude Code, prenez votre carnet. Vous avez trois contextes : Comptes, Livres, Réunions. Hier, vous avez ajouté des fonctionnalités qui les lient.

Dessinez trois boîtes sur votre carnet. Tracez des flèches entre elles pour représenter les liens que vous imaginez. Une flèche de A vers B signifie "A a besoin de B dans son code".

> ✍️ Dessinez votre schéma de flèches avant de continuer.

---

### Ce que vous allez faire

Quittez Claude Code (`/exit`) et relancez une nouvelle session :

```bash
claude
```

Demandez à Claude Code de vous montrer la réalité :

> Lis le code de mon projet.
>
> Pour chaque contexte (Comptes, Livres, Réunions), montre-moi quels autres contextes il appelle directement dans son code. Dessine ça avec des flèches : A → B signifie "A appelle B".

### Ce que vous allez voir

Quelque chose comme :

```
Livres → Comptes       (pour vérifier que le membre existe avant un vote)
Réunions → Comptes     (pour vérifier que le membre existe avant une inscription)
```

C'est peut-être exactement ce que vous aviez dessiné. Ou peut-être que Claude a trouvé des liens auxquels vous n'aviez pas pensé.

### Comparez

Regardez votre dessin et le résultat de Claude. Les flèches sont-elles les mêmes ? Y a-t-il des surprises ?

Maintenant, posez-vous cette question : **si vous changez l'interface de Comptes, combien de contextes cassent ?**

Réponse : probablement deux — Livres et Réunions. Avec seulement trois contextes, ça ne semble pas dramatique. Mais imaginez un projet avec 10 contextes, où chacun appelle 2 ou 3 autres. Le nombre de flèches explose.

### Le mot pour ça

Vous connaissez déjà le mot : c'est du **couplage**. Au Module 8 Jour 7, le couplage était *à l'intérieur* d'un contexte — toutes les fonctions mélangées dans le même fichier. Vous l'avez résolu en découpant.

Aujourd'hui, le couplage est *entre* les contextes. Vous avez des boîtes bien rangées, mais elles sont liées par des fils. C'est le **couplage <dfn title="Entre les contextes, par opposition à l'intérieur d'un contexte">inter-contextes</dfn>**.

### Ce que vous devez noter dans votre carnet

> ✍️ Combien de flèches dans le schéma de Claude ?
> ✍️ Quel contexte est le plus appelé par les autres ?
> ✍️ Votre dessin correspondait-il au schéma réel ?
