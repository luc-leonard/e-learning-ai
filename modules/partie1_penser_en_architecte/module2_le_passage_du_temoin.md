# Module 2 : Le passage du témoin

## *Quand les parties de votre projet doivent travailler ensemble — et que ça dérape*

---

## Ce que vous savez déjà

Dans le Module 1, vous avez appris à découper votre projet en parties distinctes, chacune avec un rôle clair et des limites. Votre club de lecture a maintenant un plan dans `plan.md` : Comptes, Livres, Critiques, Prêts, etc.

Ça a réglé un gros problème. Mais ça en a créé un nouveau.

**Durée :** 4-5 heures (en une ou deux sessions)
**Ce qu'il vous faut :** Votre projet du Module 1 (avec `plan.md`), Claude Code, votre carnet

---

## Avant de commencer : une analogie

Imaginez une course de relais. Quatre coureurs, chacun excellent dans sa spécialité. Le premier sprinte, passe le témoin au deuxième, qui le passe au troisième, et ainsi de suite.

Chaque coureur pris individuellement est parfait. Mais la course se gagne ou se perd **au moment où le témoin passe d'une main à l'autre.**

Si le deuxième coureur laisse tomber le témoin, que fait-on ? Le premier coureur a déjà couru — on ne peut pas "annuler" sa course. Le troisième attend un témoin qui n'arrive pas. Et le chrono tourne.

Dans votre application, c'est pareil. Vos parties sont bien découpées. Mais quand un utilisateur fait quelque chose — s'inscrire à une réunion, emprunter un livre, payer pour un événement — ça déclenche **une chaîne d'actions à travers plusieurs parties**. Et si une étape de la chaîne échoue, tout le reste doit réagir. C'est là que les choses deviennent intéressantes.

---

## Étape 1 — Provoquer la catastrophe (90 min)

### Ce que vous allez faire

Ouvrez le terminal intégré de VSCode et lancez Claude Code :

```bash
claude
```

Votre projet du Module 1 est toujours là, avec le code et `plan.md`. Commencez par vérifier que le site fonctionne encore — lancez-le et ouvrez-le dans votre navigateur.

**Une précision importante :** dans ce module, on va parler de "paiements" et de "notifications par email". Ce sont des **simulations**. Un paiement, c'est juste le site qui vérifie que le membre a assez d'argent (fictif) et qui le soustrait. Un email, c'est juste un message qui s'affiche ou s'enregistre quelque part. On ne branche pas de vraie banque ni de vrai service d'email. Si Claude vous propose d'installer Stripe ou un service de mail, dites-lui de simuler.

Une fois le site lancé, envoyez ces scénarios **un par un** à Claude Code. Pour chacun, demandez-lui de l'implémenter, puis **relancez le site et vérifiez dans votre navigateur** que ça marche.

> **Scénario 1 : L'inscription à une réunion payante**
> "Un membre veut s'inscrire à une réunion qui coûte 5€. Il faut : vérifier qu'il est bien membre, vérifier qu'il reste des places, prendre le paiement, l'inscrire, et lui envoyer une confirmation. Implémente ça. Les paiements et les emails sont simulés."

> **Scénario 2 : L'annulation**
> "Le membre de tout à l'heure veut annuler. Il faut : le désinscrire, le rembourser, libérer sa place, et lui envoyer une confirmation d'annulation. Implémente ça."

> **Scénario 3 : La réunion annulée par l'admin**
> "L'admin annule une réunion. Il faut : rembourser TOUS les inscrits, les désinscrire, les prévenir, et mettre à jour les statistiques. Implémente ça."

> **Scénario 4 : Le prêt de livre problématique**
> "Un membre emprunte un livre. Puis il est banni par l'admin. Que devient le prêt ? Le livre doit être rendu. Le propriétaire doit être prévenu. Implémente ça."

> **Scénario 5 : L'inscription simultanée**
> "Il reste une seule place à une réunion. Deux membres cliquent sur 'S'inscrire' en même temps. Que se passe-t-il ? Implémente une solution."

### 🔴 Ce que vous devez surveiller

Cette fois, les problèmes ne viennent pas de l'oubli de Claude. Le plan est là, les parties sont bien découpées. Les problèmes viennent de quelque chose de nouveau :

**🚩 Claude traite chaque étape comme si elle allait toujours marcher.**
Pour le scénario 1, il va probablement écrire : "vérifier le membre, vérifier les places, prendre le paiement, inscrire, envoyer l'email" — en ligne droite, comme si rien ne pouvait mal tourner. Mais que se passe-t-il si le paiement échoue APRÈS avoir réservé la place ? La place est bloquée, le membre n'est pas inscrit, et personne ne sait pourquoi.

**🚩 Les annulations sont un cauchemar.**
Pour les scénarios 2 et 3, observez comment Claude gère le cas où le remboursement échoue. Est-ce qu'il désinscrit quand même le membre ? Est-ce qu'il envoie l'email d'annulation alors que l'argent n'est pas rendu ? Souvent, il fait tout en parallèle sans se soucier de l'ordre.

**🚩 Les effets en cascade ne sont pas gérés.**
Pour le scénario 4, Claude va probablement bannir le membre et gérer le prêt séparément, sans lien entre les deux. Le propriétaire du livre ne sera pas prévenu, ou sera prévenu deux fois, ou sera prévenu que le livre est rendu alors qu'il ne l'est pas encore.

**🚩 Le scénario 5 n'a souvent aucune solution.**
Deux personnes, une place. Claude va probablement ignorer le problème ou proposer une solution naïve qui ne marche pas vraiment.

### Ce que vous devez noter dans votre carnet

> ✍️ Pour chaque scénario, est-ce que Claude a mentionné ce qui pouvait mal tourner ? Ou est-ce qu'il a supposé que tout marcherait ?
> ✍️ Quand vous lui avez demandé "et si le paiement échoue ?", est-ce qu'il avait prévu le cas ?
> ✍️ Est-ce que les parties se "préviennent" entre elles quand quelque chose change ?

---

## Étape 2 — Comprendre le problème (15 min)

### Lisez ceci APRÈS avoir fait l'étape 1

Dans le Module 1, le problème c'était l'organisation dans l'**espace** : quoi va où, qui fait quoi. On a résolu ça avec le plan.

Maintenant, le problème c'est l'organisation dans le **temps** : dans quel ordre les choses se passent, et que faire quand une étape échoue.

Voici une analogie du quotidien.

**Commander un meuble en ligne, c'est une chaîne d'actions :**

1. Vous payez → la boutique reçoit l'argent
2. La boutique confirme → le stock est mis à jour
3. L'entrepôt prépare → le colis est créé
4. Le livreur livre → vous recevez le meuble

Ça a l'air simple. Mais que se passe-t-il si le livreur ne vous trouve pas à l'étape 4 ?

- Le colis revient à l'entrepôt → le stock est remis à jour
- La boutique vous contacte → vous replanifiez
- Si vous annulez → le paiement est remboursé

Chaque étape a une **étape inverse** au cas où ça rate. Et l'ordre compte : on ne rembourse pas avant d'avoir récupéré le colis.

Les bonnes boutiques en ligne gèrent tout ça automatiquement. Les mauvaises vous font appeler le service client pendant 45 minutes parce que votre colis est "livré" dans leur système alors que vous ne l'avez jamais reçu.

**Votre application du Module 1, c'est la mauvaise boutique en ligne.** Les parties fonctionnent individuellement, mais personne n'a écrit ce qui se passe entre elles, dans quel ordre, et comment revenir en arrière si ça rate.

---

## Étape 3 — Écrire les parcours (45 min)

### Ce que vous allez faire

Quittez Claude Code (`/exit`), puis relancez-le pour repartir avec un regard frais :

```bash
claude
```

Vous allez ajouter des **parcours** à votre plan. Un parcours, c'est une action complète vue du point de vue de l'utilisateur, qui traverse plusieurs parties. Demandez à Claude Code :

> Lis plan.md. Je veux ajouter des "parcours" à la suite du plan existant. Un parcours décrit une action complète qui traverse plusieurs parties. Pour chaque parcours, je veux :
>
> 1. Les étapes dans l'ordre (quelle partie fait quoi, à quel moment)
> 2. Pour chaque étape : que se passe-t-il si elle échoue ?
> 3. La règle de retour en arrière : comment on "défait" ce qui a été fait avant
>
> Écris ça en français simple directement dans plan.md, à la suite du plan existant. Commence par ce parcours : "Un membre s'inscrit à une réunion payante."

### Ce que Claude va écrire dans plan.md

Quelque chose qui ressemble à ça :

```
PARCOURS : Inscription à une réunion payante

Étape 1 → Comptes : vérifier que le membre est connecté
  Si ça rate : on s'arrête, on lui demande de se connecter
  Rien à défaire (on n'a encore rien fait)

Étape 2 → Droits d'accès : vérifier qu'il a le droit de s'inscrire
  Si ça rate : on s'arrête, on lui dit pourquoi
  Rien à défaire

Étape 3 → Réunions : vérifier qu'il reste des places, RÉSERVER une place
  Si ça rate : on s'arrête, on lui dit "complet"
  Rien à défaire

Étape 4 → Paiement : prendre le paiement de 5€
  Si ça rate : on LIBÈRE la place réservée à l'étape 3, on dit "paiement refusé"
  Défaire : libérer la place

Étape 5 → Réunions : confirmer l'inscription (la place réservée devient définitive)
  Si ça rate : on REMBOURSE le paiement de l'étape 4, on LIBÈRE la place
  Défaire : rembourser + libérer

Étape 6 → Notifications : envoyer l'email de confirmation
  Si ça rate : tant pis, l'inscription est quand même valide
  (une notification ratée ne remet pas en cause l'inscription)
```

### Le moment important

Regardez bien la dernière étape. L'email de confirmation qui échoue **n'annule pas l'inscription**. C'est une décision de design, pas une décision technique. Et c'est VOUS qui devez la prendre, pas Claude.

Toutes les étapes ne se valent pas. Certaines sont critiques (le paiement), d'autres sont importantes mais pas fatales (la notification). Savoir faire la différence, c'est ça le travail de l'architecte.

### Continuez avec les autres parcours

Demandez à Claude Code d'ajouter dans `plan.md` les parcours pour :
- "Un membre annule son inscription"
- "Un admin annule une réunion entière"
- "Un membre est banni alors qu'il a un livre emprunté"

Relisez `plan.md` dans VSCode après chaque ajout. Modifiez ce qui ne vous semble pas logique. C'est votre plan, pas celui de Claude.

---

## Repartir de zéro — proprement

Le code actuel est celui de l'étape 1 — chaotique, cassé par les scénarios qu'on a empilés. On ne va pas essayer de le réparer. On va le jeter et repartir du code propre du Module 1.

Mais attention : vous venez d'écrire des parcours dans `plan.md`, et vous ne voulez pas les perdre. La solution : **committer uniquement `plan.md`**, puis jeter le reste.

```bash
git add plan.md
git commit -m "Module 2 : ajout des parcours dans plan.md"
```

Remarquez la différence avec `git add .` : ici, on n'ajoute **qu'un seul fichier**. Le code cassé n'est pas inclus dans le commit.

Maintenant, jetez tout le code cassé :

```bash
git checkout .
```

Tous les fichiers de code reviennent à leur état du Module 1 — propre et fonctionnel. Mais `plan.md` garde ses parcours, parce qu'il a été commité juste avant. Vérifiez dans VSCode : le code est redevenu celui du Module 1, et `plan.md` contient bien les parcours.

---

## Étape 4 — Reconstruire avec les parcours (60-90 min)

### Ce que vous allez faire

Quittez Claude Code et relancez-le :

```bash
claude
```

Votre `plan.md` contient maintenant les parties ET les parcours, et votre code est propre. Demandez à Claude Code de reconstruire en suivant le plan complet :

> Lis plan.md. Il contient le plan de mon application (les parties) et les parcours (les chaînes d'actions avec gestion d'erreur). Reconstruis l'application en suivant ce plan. Pour chaque parcours, respecte exactement l'ordre des étapes et les règles de retour en arrière décrites. Les paiements et emails sont simulés.

Lancez le site, vérifiez dans le navigateur. Si une partie ne fonctionne pas, corrigez-la avant de passer à la suivante.

### 🟢 Ce que vous allez remarquer

- Claude gère maintenant les échecs **à chaque étape**, pas juste le cas où tout va bien
- L'ordre est respecté : on ne confirme pas avant d'avoir payé
- Les retours en arrière sont cohérents : si le paiement échoue, la place est libérée
- Les notifications sont traitées comme "pas critiques" — un email raté ne casse plus rien

### Le test acide

Demandez à Claude Code :

> "Que se passe-t-il si le paiement est lent et met 30 secondes à répondre ? Est-ce que la place reste réservée pendant ce temps ? Pendant combien de temps ?"

Si votre parcours est bien écrit, Claude pourra répondre. Si non, il va inventer — et c'est un signe que le parcours a besoin d'être complété.

### Ce que vous devez noter dans votre carnet

> ✍️ Est-ce que le site se lance et fonctionne après chaque parcours implémenté ?
> ✍️ Comparez avec l'étape 1 : est-ce que Claude gère mieux les cas d'erreur ?
> ✍️ Est-ce qu'il y a des cas que les parcours ne couvrent pas encore ?

---

## Étape 5 — Le scénario impossible (20 min)

### Ce que vous allez faire

Reprenez le scénario 5 de l'étape 1 :

> Il reste une place. Deux personnes cliquent en même temps. Que se passe-t-il ?

Demandez à Claude Code de vous expliquer le problème **avec une analogie du quotidien, pas du jargon technique**.

### Lisez ceci APRÈS avoir lu la réponse de Claude

L'analogie que Claude vous a probablement donnée ressemble à quelque chose comme : deux personnes qui veulent le même objet au même moment, avec un mécanisme de "mise de côté" le temps de finaliser.

C'est exactement ce que fait votre parcours : l'étape 3 **réserve** la place avant le paiement. Si le paiement échoue ou prend trop de temps, la réservation expire et la place redevient disponible.

### Pourquoi c'est important

Ce problème — deux personnes qui veulent la même chose au même moment — existe dans presque toutes les applications. Votre parcours le résout naturellement, parce que vous avez séparé "réserver" et "confirmer" en deux étapes distinctes.

Si vous n'aviez pas de parcours, Claude aurait fait "vérifier qu'il reste des places" et "inscrire" en une seule étape. Et entre le moment où il vérifie et le moment où il inscrit, quelqu'un d'autre pourrait prendre la dernière place.

---

## Étape 6 — Compléter le plan (30 min)

### Ce que vous allez faire

Votre plan a maintenant deux niveaux : les parties et les parcours. Il est temps d'écrire un parcours **vous-même**, sans l'aide de Claude.

Ouvrez `plan.md` dans VSCode et ajoutez un parcours pour une action que vos membres pourraient vouloir faire et qui touche à plusieurs parties. Par exemple :

- "Un membre change de chapitre local (déménagement)"
- "Un membre propose un livre qui existe déjà dans un autre chapitre"
- "L'admin fusionne deux chapitres"

Écrivez les étapes et les cas d'échec **à la main dans VSCode**. Pas besoin que ce soit parfait — essayez juste de suivre le même format que les autres parcours.

Quand c'est fait, demandez à Claude Code :

> Lis plan.md. J'ai ajouté un nouveau parcours à la fin. Relis-le et dis-moi ce que j'ai oublié ou ce qui ne tient pas la route. Ne le réécris pas — dis-moi juste ce qui manque.

### Le déclic

Si vous arrivez à écrire un parcours qui tient la route avant même de demander à Claude, vous avez compris quelque chose de fondamental : **vous ne décrivez pas du code, vous décrivez des règles de fonctionnement**. C'est comme écrire le règlement intérieur d'un club — qui a le droit de faire quoi, dans quel ordre, et que faire quand ça dérape.

### Ce que vous devez noter dans votre carnet

> ✍️ Quel parcours avez-vous choisi ? Pourquoi ?
> ✍️ Qu'est-ce que Claude a trouvé que vous aviez oublié ?
> ✍️ Est-ce que c'était plus facile que vous ne le pensiez ?

---

## Ce que vous avez appris

### En une phrase

**Découper en parties ne suffit pas. Il faut aussi décrire comment ces parties travaillent ensemble, dans quel ordre, et comment elles réagissent quand quelque chose tourne mal.**

### Les trois nouveaux réflexes

4. **Décrivez les parcours, pas juste les parties.** Un parcours = une action complète qui traverse plusieurs parties, étape par étape.

5. **Chaque étape doit prévoir son échec.** Si ça peut rater, ça ratera. Écrivez ce qui se passe quand ça rate AVANT que ça rate.

6. **Toutes les étapes ne se valent pas.** Un paiement raté, c'est grave. Un email raté, ce n'est pas la fin du monde. C'est vous qui décidez de cette différence, pas l'IA.

### Votre plan mis à jour

Votre `plan.md` contient maintenant :

```
PARTIE : Comptes
→ Fait : ...
→ Ne fait PAS : ...
→ A besoin de : ...

PARTIE : Réunions
→ ...

(etc.)

---

PARCOURS : Inscription réunion payante
→ Étape 1 : ...
→ Si ça rate : ...
→ ...

PARCOURS : Annulation
→ ...

(etc.)
```

C'est ce fichier que Claude Code consulte à chaque nouvelle session.

---

## Avant de partir — sauvegardez

```bash
git add .
git commit -m "Module 2 terminé : parcours et gestion d'erreurs"
```

---

## La suite

Dans le Module 3, on va découvrir que quand un projet grandit vraiment, `plan.md` devient trop gros pour que Claude le digère d'un coup. On va apprendre à **structurer l'information en niveaux** pour donner à Claude exactement ce dont il a besoin — ni plus, ni moins. C'est le passage de "tout mettre dans un seul fichier" à "organiser l'information comme une carte à plusieurs zooms".
