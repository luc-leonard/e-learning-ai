# Module 5 : Vérifier pour de vrai

## *Appliquer le cycle de vérification à votre club de lecture — avec ses imperfections*

---

## Ce que vous savez déjà

Dans le Module 4, vous avez appris à vérifier sur un petit projet contrôlé. Vous connaissez le cycle : écrire des vérifications en français, obtenir un rapport ✅/❌/⚠️, corriger, re-vérifier. Vous avez peut-être même des tests automatiques qui tournent.

Maintenant, on retourne au club de lecture. C'est plus gros. C'est plus flou. Et il y a probablement des problèmes que vous ne soupçonnez pas. C'est exactement le but.

**Durée :** 2-3 heures
**Ce qu'il vous faut :** Votre projet du club de lecture (dans `formation-ia/`), Claude Code, votre carnet

---

## Avant de commencer : une analogie

Vous venez de passer le permis sur un circuit d'entraînement. Tout était contrôlé : des cônes bien alignés, pas de trafic, pas de surprises. Maintenant, c'est la première fois que vous conduisez en ville. Les mêmes compétences — regarder les rétroviseurs, freiner, tourner — mais avec du bruit, des imprévus, et des piétons qui traversent n'importe où.

Ce n'est pas plus difficile au sens technique. Mais ça demande une compétence supplémentaire : **savoir quoi ignorer**. Sur le circuit, vous pouviez être méthodique. En ville, vous devez prioriser : cette voiture qui freine devant vous est plus urgente que le panneau publicitaire sur la droite.

C'est pareil pour la vérification. Le mini-projet était le circuit. Le club de lecture, c'est la ville.

---

## Avant de commencer — testez le site (10 min)

Avant d'écrire la moindre vérification, passez dix minutes à tester votre club de lecture comme un utilisateur ordinaire. C'est le même réflexe qu'à l'Étape 2 du Module 4 : votre regard d'utilisateur attrape ce que les vérifications écrites ne voient pas.

Dans le terminal de VSCode, assurez-vous d'être dans `formation-ia/`, puis lancez le site avec la même commande qu'au Module 1 (`npm start` ou celle que Claude vous a donnée). Ouvrez l'adresse dans votre navigateur et essayez quelques actions : inscrivez-vous à une réunion, annulez, naviguez.

> ✍️ Notez 2-3 choses qui vous semblent bizarres ou qui ne fonctionnent pas comme prévu.

---

## Étape 1 — Écrire les vérifications dans les fiches (45 min)

### Ce que vous allez faire

Ouvrez votre dossier `formation-ia/` dans VSCode. Vous retrouvez votre structure du Module 3 : `plan.md` et le dossier `fiches/` avec une fiche par partie.

Les vérifications vont **dans les fiches**. C'est logique : les vérifications sont du détail interne, pas de la vue d'ensemble. Chaque fiche va recevoir une section `VÉRIFICATIONS`, comme vous l'avez fait dans `plan.md` du mini-projet.

### Commencez par une seule fiche

Ne faites pas tout d'un coup. Choisissez **une seule fiche** — celle de la partie que vous connaissez le mieux. Si vous hésitez, prenez `fiches/reunions.md` : c'est la partie qui a le parcours le plus complet (inscription payante, annulation).

Ouvrez la fiche dans VSCode et ajoutez une section `VÉRIFICATIONS` à la fin :

```
VÉRIFICATIONS : Inscription à une réunion payante

Situation de départ :
  - La réunion "Soirée polar" a 10 places, il en reste 3
  - Le membre Marie est connectée, elle n'est pas inscrite

Après une inscription réussie :
  ✓ Il reste 2 places (pas 3)
  ✓ Marie apparaît dans la liste des inscrits
  ✓ Un paiement de 5€ est enregistré au nom de Marie
  ✓ Marie a reçu un email de confirmation

Quand il n'y a plus de place :
  ✓ Marie n'est PAS inscrite
  ✓ Aucun paiement n'a été pris
  ✓ Marie voit un message "complet"
  ✓ Le nombre de places n'a pas changé (toujours 0)

Quand le paiement échoue :
  ✓ Marie n'est PAS inscrite
  ✓ Le nombre de places n'a PAS diminué
  ✓ Aucun email n'est envoyé
  ✓ Marie voit un message "paiement refusé"
```

### Ajoutez les cas limites

```
VÉRIFICATIONS : Cas limites

Marie s'inscrit deux fois à la même réunion :
  ✓ La deuxième inscription est refusée
  ✓ Un seul paiement est enregistré
  ✓ Le nombre de places n'a diminué qu'une fois

Marie s'inscrit puis l'admin annule la réunion :
  ✓ Marie est remboursée
  ✓ Marie n'apparaît plus dans les inscrits
  ✓ Marie a reçu un email d'annulation

L'admin essaie de s'inscrire à sa propre réunion gratuite :
  ✓ Ça marche (ou ça ne marche pas — c'est VOUS qui décidez,
    mais il faut que ce soit un choix, pas un accident)
```

### Demandez à Claude de compléter

Lancez Claude Code et demandez-lui :

> Lis la fiche fiches/reunions.md. J'ai ajouté des vérifications à la fin. Quels cas ai-je oubliés ? Pense aux cas bizarres, aux cas limites, et aux cas où plusieurs choses arrivent en même temps. Ajoute-les dans la fiche.

**C'est vous qui décidez lesquels garder.** Sur un gros projet, il y a potentiellement des dizaines de cas limites. Gardez ceux qui comptent — ceux qui touchent à l'argent, aux données, ou à la sécurité. Supprimez ceux qui sont anecdotiques.

Quittez Claude Code (`/exit`) et sauvegardez :

```bash
git add fiches/reunions.md
git commit -m "Module 5 : vérifications ajoutées à la fiche Réunions"
```

### Ce que vous devez noter dans votre carnet

> ✍️ Combien de vérifications avez-vous écrites vous-même avant Claude ?
> ✍️ Combien Claude a-t-il ajoutées ? Combien avez-vous gardées ?

---

## Étape 2 — Le rapport de vérification (30 min)

### Ce que vous allez faire

Quittez Claude Code (`/exit`) puis relancez une nouvelle session (`claude`). Comme au Module 4, le vérificateur doit avoir un regard frais. Dites-lui :

> Lis plan.md et la fiche fiches/reunions.md. Pour chaque vérification listée dans la fiche, explore le code correspondant et dis-moi :
> - ✅ PASSE : le code fait bien ce qui est décrit
> - ❌ ÉCHOUE : le code ne fait pas ce qui est décrit (explique pourquoi)
> - ⚠️ IMPOSSIBLE À VÉRIFIER : le code ne couvre pas ce cas du tout

### Ce qui va être différent du mini-projet

Le mini-projet avait 8-10 vérifications, dont la plupart passaient. Le club de lecture va probablement montrer un ratio moins glorieux. C'est **normal** — le projet est plus vieux, plus gros, et a été reconstruit plusieurs fois.

Ne vous découragez pas si vous voyez beaucoup de ❌ et de ⚠️. Rappelez-vous : avant ce rapport, vous ne saviez même pas que ces problèmes existaient. Maintenant, vous les connaissez. C'est un progrès, pas un échec.

### Ce que vous devez noter dans votre carnet

> ✍️ Combien de ✅, ❌ et ⚠️ ?
> ✍️ Le ratio est-il meilleur ou pire que ce que vous attendiez ?

---

## Étape 3 — Prioriser (15 min)

### La compétence nouvelle

Sur le mini-projet, vous pouviez tout corriger — il n'y avait que quelques erreurs. Sur le club de lecture, vous devez **choisir vos batailles**. Tout ne mérite pas d'être corrigé tout de suite.

Relisez vos ❌ et ⚠️, et classez-les en trois catégories :

**🔴 Grave — à corriger maintenant**
L'argent est mal géré (paiement pris sans inscription, remboursement manquant). Les données sont incohérentes (un membre est inscrit mais n'apparaît pas dans la liste). Un parcours décrit dans le plan n'est pas implémenté du tout.

**🟡 Important — à corriger bientôt**
Un cas limite n'est pas géré (double inscription, annulation bizarre). Le comportement est acceptable mais pas conforme au plan. Ce n'est pas critique, mais ça pourrait le devenir.

**⚪ Mineur — on peut vivre avec**
Un message d'erreur n'est pas clair. Un affichage est bizarre mais fonctionnel. Un cas extrêmement improbable n'est pas géré.

### Ce que vous devez noter dans votre carnet

> ✍️ Combien de 🔴, 🟡 et ⚪ ?
> ✍️ Quel critère avez-vous utilisé pour décider ? (L'argent ? Les données ? L'expérience utilisateur ?)

---

## Étape 4 — Le cycle de correction (45 min)

### Ce que vous allez faire

Commencez par les 🔴 — les problèmes graves. Le cycle est le même que pour le mini-projet :

**Sauvegarder avant de corriger :**

```bash
git add .
git commit -m "Avant corrections : état actuel du club de lecture"
```

**Corriger :**

Quittez (`/exit`), relancez Claude Code (`claude`), et demandez-lui de corriger un problème précis :

Voici un exemple de demande — remplacez la partie entre guillemets par la phrase exacte de votre ❌, copiée telle quelle depuis le rapport :

> Lis plan.md et la fiche fiches/reunions.md. La vérification suivante échoue : "Marie n'est PAS inscrite quand le paiement échoue". Corrige ça en respectant les parcours décrits dans la fiche.

**Vérifier l'ampleur avec `git diff` :**

```bash
git diff
```

Même réflexe qu'au Module 4 : 3-10 lignes modifiées, c'est rassurant. 200 lignes réécrites pour un bug simple, c'est suspect.

**Sauvegarder :**

```bash
git add .
git commit -m "Correction : [décrivez ce que vous avez corrigé]"
```

**Re-vérifier :** Quittez, relancez, redemandez le rapport. Certains ❌ vont passer en ✅.

### Un conseil pour les vrais projets

Ne corrigez pas tout d'un coup. Faites **une correction par commit**. Si une correction casse quelque chose, vous savez exactement laquelle, et `git checkout .` vous ramène au commit précédent.

Sur le mini-projet, vous pouviez vous permettre d'être moins discipliné. Sur un vrai projet, cette rigueur vous sauvera.

---

## Étape 5 — Les tests automatiques (30 min, optionnel)

### Pourquoi c'est optionnel

Sur le mini-projet, les tests avaient de bonnes chances de fonctionner du premier coup — le code était petit et fraîchement construit. Le club de lecture est différent : le code a été reconstruit plusieurs fois, la structure est plus complexe, et les tests automatiques ont besoin d'un code assez bien organisé pour s'y brancher.

Si les tests ont bien marché au Module 4, tentez l'expérience. Sinon, le cycle manuel (vérifier → corriger → committer → re-vérifier) reste votre outil principal, et il fonctionne très bien.

### Si vous voulez essayer

Commencez petit. Ne demandez pas à Claude de tester **toutes** les fiches d'un coup. Choisissez **une seule fiche** — celle qui a le plus de vérifications 🔴. Lancez Claude Code :

> Lis plan.md et la fiche fiches/reunions.md. Transforme uniquement les vérifications de cette fiche en tests automatiques. Je veux pouvoir les lancer avec une seule commande.

Si `npm test` fonctionne et que vous voyez des ✓ et des ✗ — victoire. Vous avez des capteurs permanents sur la partie la plus importante de votre projet.

Si ça ne marche pas après deux tentatives : passez à la suite. La mise en place de tests sur un projet existant est une compétence à part entière, et vous la travaillerez dans la partie 2 de la formation.

```bash
git add .
git commit -m "Tests automatiques pour la partie Réunions"
```

---

## Étape 6 — Élargir à d'autres fiches (facultatif, 30-60 min)

### Ce que vous allez faire

Si vous avez le temps et l'énergie, répétez le cycle pour une ou deux autres fiches :

1. Ouvrez la fiche dans VSCode et ajoutez les vérifications
2. Demandez à Claude de compléter
3. Lancez le rapport de vérification (session fraîche)
4. Priorisez (🔴/🟡/⚪)
5. Corrigez les 🔴
6. Commettez après chaque correction

Vous n'êtes pas obligé de couvrir toutes les fiches. Ce qui compte, c'est que les parties **critiques** (celles qui touchent à l'argent, aux données, aux inscriptions) aient des vérifications solides.

**Quand s'arrêter ?** Quand les parties critiques n'ont plus de ❌ graves — argent mal géré, données incohérentes, parcours non implémenté. Vous n'avez pas besoin d'un rapport tout vert. Vous avez besoin d'un projet dont vous *connaissez* l'état.

---

## Ce que vous avez appris

### En une phrase

**Sur un vrai projet, la vérification ne consiste pas à tout vérifier — mais à savoir quoi vérifier en priorité.**

### Les deux nouveaux réflexes

13. **Posez des questions précises, pas des questions vagues.** "Est-ce que ça marche ?" → mauvais. "Est-ce que le nombre de places diminue de 1 après une inscription réussie ?" → bon. Plus la question est précise, plus la réponse est utile.

14. **Priorisez vos corrections.** Tout n'est pas grave. L'argent mal géré est plus urgent qu'un affichage bizarre. Corrigez les 🔴 d'abord, les 🟡 ensuite, et vivez avec les ⚪.

### La structure complète de votre projet

```
plan.md
├── Vue d'ensemble : parties et portes d'entrée (Module 1 + 3)
└── Parcours : actions complètes avec gestion d'erreur (Module 2)

fiches/
├── Une fiche par partie (Module 3)
└── Vérifications dans chaque fiche (Modules 4-5)     ← nouveau
    ├── Cas normaux
    ├── Cas d'erreur
    └── Cas limites

Tests automatiques (fichiers séparés)                   ← nouveau
├── Générés par Claude à partir des vérifications
├── Lançables en une commande (npm test)
└── Le filet de sécurité permanent du projet
```

### Pas de "Repartir de zéro" cette fois

Vous l'avez remarqué : dans ce module, on n'a pas jeté le code pour tout reconstruire. C'est un signe de progrès. Votre code est assez bien structuré pour être **corrigé** plutôt que **jeté**. C'est la différence entre un projet chaotique et un projet maintenu.

---

## Avant de partir — sauvegardez

```bash
git add .
git commit -m "Module 5 terminé : vérifications et corrections du club de lecture"
```

Tapez `git log --oneline` pour voir tout votre historique. Vous devriez avoir une série de commits qui racontent l'histoire de votre apprentissage — du premier chaos jusqu'à un projet vérifié.

---

## La suite

Vous avez maintenant un vrai système : des parties organisées, des parcours définis, une structure d'information en niveaux, et des vérifications pour vous assurer que tout tient. C'est un vrai projet logiciel, piloté par vous, construit par l'IA.

Dans le Module 6, on va aborder une question différente : **vous pratiquez des techniques professionnelles depuis cinq modules, mais vous ne connaissez pas encore leurs vrais noms.** On va mettre des mots sur ce que vous savez — et découvrir que ce vocabulaire vous ouvre les portes d'un monde entier de connaissances. Puis on va affronter le moment où votre plan, celui que vous avez soigneusement construit, ne suffit plus.
