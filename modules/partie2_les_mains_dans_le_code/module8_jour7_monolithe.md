# Jour 7 : Le monolithe qui enfle

## *Module 8 — Les mains dans le moteur*

---

### Avant de commencer : une analogie

Souvenez-vous du Module 1, Étape 2. Vous aviez demandé à Claude d'ajouter des fonctionnalités, une par une. Au bout de quelques demandes, ça commençait à partir en vrille — le "plat de nouilles". Tout était emmêlé.

On va reproduire cette expérience. Mais cette fois, vous allez la **voir** dans le code, pas juste la sentir.

**Durée :** 1h30-2h
**Ce qu'il vous faut :** Votre dossier `mon_club` ouvert dans VSCode, Claude Code, votre carnet

---

### Ce que vous allez faire

Restez dans la même session Claude Code (ou relancez-en une). Demandez d'ajouter **deux fonctionnalités** au club de lecture. Tout reste dans le même contexte — ne réorganisez rien.

**Demande 1 :**

> Ajoute un système de comptes. Les membres ont un nom et un email. Il faut s'inscrire pour pouvoir voter ou proposer un livre. Garde tout dans le même contexte.

Attendez que Claude ait fini, vérifiez dans le navigateur que ça marche.

**Demande 2 :**

> Ajoute des réunions. Une réunion a un titre, une date, un lieu et un nombre de places. Les membres peuvent s'inscrire à une réunion. Garde tout dans le même contexte.

Vérifiez à nouveau dans le navigateur.

### L'exercice clé

Maintenant, demandez à Claude Code :

> Montre-moi le sommaire de toutes les fonctions du contexte principal, groupées par thème. Combien de thèmes différents cohabitent dans le même contexte ?

### 🔴 Ce que vous devez voir

La réponse va vous sauter aux yeux. Dans un seul contexte, vous avez maintenant des fonctions pour :
- les livres (ajouter, lister, supprimer)
- les votes (voter, compter)
- les comptes (s'inscrire, se connecter)
- les réunions (créer, lister, inscrire un membre)

Quatre thèmes dans le même sac. Le fichier qui contenait 5 fonctions en contient maintenant 15 ou 20.

**C'est le plat de nouilles du Module 1.** Mais cette fois, vous le **voyez** dans le code — pas juste dans vos impressions. Vous pouvez compter les fonctions, nommer les thèmes, pointer les mélanges. Vous avez les mots et les yeux pour décrire ce qui ne va pas.

### Ce que vous devez noter dans votre carnet

> ✍️ Combien de fonctions dans votre contexte unique ?
> ✍️ Combien de thèmes différents y cohabitent ?
> ✍️ Si vous deviez expliquer ce code à quelqu'un, par où commenceriez-vous ? (Si la réponse est "je ne sais pas", c'est un signal.)

### Avant de partir — sauvegardez

```bash
git add .
git commit -m "Jour 7 : monolithe avec comptes et réunions"
```
