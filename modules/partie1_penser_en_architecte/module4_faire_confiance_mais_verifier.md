# Module 4 : Faire confiance, mais vérifier

## *Comment savoir si ce que l'IA a construit marche vraiment — sans lire le code*

---

## Ce que vous savez déjà

Vous savez organiser un projet en parties (Module 1), décrire les parcours et gérer les erreurs (Module 2), et donner à Claude la bonne quantité d'information (Module 3).

Mais depuis le début, vous faites quelque chose de risqué : **vous croyez Claude sur parole.** Il vous dit "c'est fait", et vous passez à la suite. Ce module va vous montrer pourquoi c'est un problème — et comment le résoudre.

**Durée :** 2-3 heures
**Ce qu'il vous faut :** Votre projet du club de lecture (avec le plan à deux niveaux), un compte Claude, votre carnet

---

## Avant de commencer : une analogie

Vous faites construire une maison. L'architecte vous montre les plans. L'entrepreneur vous dit "c'est terminé". Vous visitez : les murs sont droits, la peinture est belle, les prises fonctionnent. Tout a l'air parfait.

Mais est-ce que les fondations sont solides ? Est-ce que l'isolation est bien posée derrière les murs ? Est-ce que la plomberie tiendra dans 5 ans ? Vous ne pouvez pas le voir à l'œil nu.

C'est pour ça qu'il existe des **contrôleurs** indépendants. Quelqu'un qui n'a pas construit la maison et qui vient vérifier que tout est conforme. Pas en regardant si c'est joli — en testant : il ouvre tous les robinets en même temps, il vérifie la pression, il mesure l'isolation.

Le contrôleur ne sait pas forcément construire une maison. Mais il sait **quoi vérifier et comment**.

C'est exactement ce que vous allez apprendre à faire.

---

## Étape 1 — Découvrir que ça ne marche pas (45 min)

### Ce que vous allez faire

Reprenez votre projet du club de lecture. Tout a l'air de fonctionner — vous avez vos parties, vos parcours, Claude a tout implémenté.

Ouvrez une **nouvelle conversation** — pas celle où Claude a construit le projet. C'est important. Collez-y la vue d'ensemble et dites :

> Voici la vue d'ensemble de mon application de club de lecture :
> [collez la vue d'ensemble]
>
> Je vais te donner le code de cette application. Je veux que tu te comportes comme un utilisateur curieux et un peu malveillant. Essaie de faire des choses qu'un vrai utilisateur pourrait faire — y compris des choses bizarres ou inattendues. Pour chaque test, dis-moi :
> 1. Ce que tu as essayé
> 2. Ce qui aurait DÛ se passer (d'après la vue d'ensemble)
> 3. Ce qui se passe RÉELLEMENT dans le code
>
> Voici le code :
> [collez le code de votre application]

### 🔴 Ce que vous allez découvrir

Préparez-vous. Ça va piquer.

**🚩 Des actions qui "marchent" mais ne font pas tout ce qu'elles devraient.**
Claude va probablement trouver des cas comme : "J'inscris un membre à une réunion payante. Le paiement est enregistré. Mais le nombre de places disponibles n'a pas diminué." Ou : "J'annule une inscription. L'email de confirmation est envoyé. Mais le remboursement n'est jamais déclenché."

**🚩 Des cas que personne n'a prévus.**
"Que se passe-t-il si un membre s'inscrit deux fois à la même réunion ?" — Rien ne l'empêche. "Que se passe-t-il si un membre emprunte son propre livre ?" — Ça marche. "Que se passe-t-il si un admin se bannit lui-même ?" — Oups.

**🚩 Des parcours qui ne sont pas vraiment implémentés.**
Vous aviez décrit un parcours complet avec gestion d'erreur dans le Module 2. Claude avait dit "c'est fait". Mais le "c'est fait" signifiait parfois "j'ai écrit le cas normal, pas les cas d'erreur". Le retour en arrière quand le paiement échoue ? Pas codé. L'expiration automatique d'une demande de prêt après 3 jours ? Pas codée.

### Pourquoi ça arrive

Ce n'est pas que Claude ment. C'est que Claude fait ce que vous lui demandez **au moment où vous le demandez**. Quand vous dites "implémente le parcours d'inscription à une réunion payante", il implémente le chemin principal. Les cas d'erreur, les cas bizarres, les vérifications — il les fait si vous insistez, mais il ne va pas spontanément tout couvrir.

C'est exactement pareil avec un artisan humain. Si vous dites "installe une serrure sur la porte", il installe la serrure. Il ne va pas spontanément vérifier que la porte résiste aux coups de pied, que la serrure fonctionne par -20°C, et qu'on ne peut pas l'ouvrir avec une carte de crédit. Il faut le lui demander.

### Ce que vous devez noter dans votre carnet

> ✍️ Combien de problèmes Claude-vérificateur a-t-il trouvés ?
> ✍️ Lesquels vous surprennent le plus ?
> ✍️ Lesquels sont graves (données perdues, argent mal géré) vs bénins (affichage bizarre) ?

---

## Étape 2 — Comprendre la différence (15 min)

### Lisez ceci APRÈS avoir fait l'étape 1

Vous venez de faire quelque chose de fondamental : vous avez utilisé **un Claude différent** pour vérifier le travail du premier Claude. Et il a trouvé des problèmes.

Pourquoi un Claude "frais" trouve-t-il des erreurs que le Claude "constructeur" n'a pas vues ?

**Parce que quand on construit, on pense à ce qui doit marcher. Quand on vérifie, on pense à ce qui pourrait casser.**

Ce sont deux façons de penser opposées. Le constructeur est optimiste : "voilà comment ça fonctionne". Le vérificateur est pessimiste : "voilà comment ça pourrait échouer". Et il est très difficile de faire les deux en même temps — pour une IA comme pour un humain.

C'est pour ça que dans l'industrie, la personne qui construit n'est jamais la même que celle qui vérifie. Pas parce que le constructeur est mauvais — mais parce qu'on ne peut pas être juge et partie.

**Règle fondamentale : la conversation qui construit et la conversation qui vérifie doivent être séparées.**

---

## Étape 3 — Écrire des scénarios de vérification (45 min)

### L'idée clé

Vos parcours du Module 2 décrivent ce qui **devrait** se passer. Un scénario de vérification, c'est la même chose retournée : "si je fais ça, alors ça doit être vrai ensuite."

Ce n'est pas du code. Ce sont des phrases en français.

### Ce que vous allez faire

Ouvrez votre plan. Pour chaque parcours, vous allez écrire des vérifications. Commencez par le faire vous-même avant de demander à Claude.

Prenez le parcours "Inscription à une réunion payante" :

```
VÉRIFICATIONS : Inscription réunion payante

Situation de départ :
  - La réunion "Soirée polar" a 10 places, il en reste 3
  - Le membre Marie est connectée, elle n'est pas inscrite

Après une inscription réussie :
  ✓ Il reste 2 places (pas 3)
  ✓ Marie apparaît dans la liste des inscrits
  ✓ Un paiement de 5€ est enregistré au nom de Marie
  ✓ Marie a reçu un email de confirmation
  ✓ Les statistiques comptent un inscrit de plus

Après une inscription QUAND IL N'Y A PLUS DE PLACE :
  ✓ Marie n'est PAS inscrite
  ✓ Aucun paiement n'a été pris
  ✓ Marie voit un message "complet"
  ✓ Le nombre de places n'a pas changé (toujours 0)

Après une inscription QUAND LE PAIEMENT ÉCHOUE :
  ✓ Marie n'est PAS inscrite
  ✓ Le nombre de places n'a PAS diminué
  ✓ Aucun email n'est envoyé
  ✓ Marie voit un message "paiement refusé"
```

### Vous remarquez quelque chose ?

Chaque vérification est une **phrase qu'on peut vérifier par oui ou non**. "Il reste 2 places" — c'est vrai ou c'est faux. "Marie apparaît dans la liste" — oui ou non. Il n'y a pas d'ambiguïté.

C'est la force de cette approche : vous n'avez pas besoin de lire le code pour savoir si l'application marche. Vous avez besoin de **regarder le résultat et vérifier une liste**.

### Continuez avec les cas bizarres

Maintenant, ajoutez des vérifications pour les cas auxquels personne ne pense :

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
  ✓ Les places ne sont plus comptabilisées (la réunion n'existe plus)

L'admin essaie de s'inscrire à sa propre réunion gratuite :
  ✓ Ça marche (ou ça ne marche pas — c'est VOUS qui décidez,
    mais il faut que ce soit un choix, pas un accident)
```

### Demandez à Claude de compléter

Quand vous avez écrit vos vérifications, demandez à Claude d'en ajouter :

> Voici mes vérifications pour le parcours "Inscription réunion payante" :
> [collez vos vérifications]
>
> Quels cas ai-je oubliés ? Pense aux cas bizarres, aux cas limites, et aux cas où plusieurs choses arrivent en même temps.

Claude va vous proposer des cas auxquels vous n'avez pas pensé. Certains seront pertinents, d'autres excessifs. **C'est vous qui décidez lesquels garder.** Tous les cas ne méritent pas d'être vérifiés — il faut se concentrer sur ceux qui comptent vraiment.

---

## Étape 4 — Faire vérifier par Claude (45 min)

### Ce que vous allez faire

Vous avez maintenant trois types de documents :
1. La **vue d'ensemble** (Module 3) — ce que l'application fait
2. Les **fiches détaillées** (Module 3) — comment chaque partie fonctionne
3. Les **vérifications** (ce module) — comment prouver que ça marche

Ouvrez une **nouvelle conversation** (le vérificateur) et envoyez :

> Voici la vue d'ensemble de mon application :
> [vue d'ensemble]
>
> Voici les vérifications que je veux effectuer :
> [collez les vérifications]
>
> Et voici le code de l'application :
> [collez le code]
>
> Pour chaque vérification, dis-moi :
> - ✅ PASSE : le code fait bien ce qui est décrit
> - ❌ ÉCHOUE : le code ne fait pas ce qui est décrit (explique pourquoi)
> - ⚠️ IMPOSSIBLE À VÉRIFIER : le code ne couvre pas ce cas du tout

### Ce que vous allez obtenir

Un rapport clair avec des ✅, ❌, et ⚠️. Probablement un mélange des trois. C'est normal.

### Ce que vous faites des résultats

**Les ❌ (échecs)** sont vos priorités. Avant de corriger, sauvegardez l'état actuel :

```bash
git add .
git commit -m "Avant corrections : X échecs sur Y vérifications"
```

Puis retournez dans la conversation de construction, collez la vue d'ensemble + la fiche de la partie concernée, et dites :

> La vérification suivante échoue : "Après une inscription quand le paiement échoue, le nombre de places ne doit PAS avoir diminué."
> Actuellement, la place est réservée avant le paiement mais jamais libérée si le paiement rate.
> Corrige ça en respectant le parcours décrit dans la fiche.

**Les ⚠️ (impossibles à vérifier)** sont des trous. Des choses que personne n'a implémentées. Décidez si elles sont importantes, et si oui, demandez à Claude de les ajouter.

**Les ✅ (succès)** sont vos certitudes. Vous SAVEZ que ces cas marchent, pas parce que Claude vous l'a dit, mais parce qu'un Claude indépendant l'a vérifié.

### Le cycle

Après correction, regardez ce que Claude Code a changé :

```bash
git diff
```

Cette commande vous montre toutes les modifications depuis votre dernier commit — les lignes ajoutées en vert, les lignes supprimées en rouge. Vous n'avez pas besoin de comprendre le code en détail, mais vous pouvez voir **l'ampleur** des changements. Une correction qui touche 3 lignes, c'est rassurant. Une correction qui réécrit 200 lignes pour un bug simple, c'est suspect.

Sauvegardez la correction, puis relancez la vérification :

```bash
git add .
git commit -m "Correction : [décrivez ce que vous avez corrigé]"
```

**Refaites la vérification.** Renvoyez le code corrigé au Claude vérificateur. Certains ❌ vont passer en ✅. Parfois, une correction crée un nouveau ❌ ailleurs. C'est normal — c'est exactement comme ça que fonctionne le développement professionnel.

Le cycle complet est : **construire → committer → vérifier → corriger → committer → vérifier à nouveau.** Git garde la trace de chaque étape. Si une correction empire les choses, `git checkout .` vous ramène au dernier commit propre.

---

## Étape 5 — Faire écrire les tests à Claude (30 min)

### Le problème du cycle manuel

Le cycle de l'étape 4 fonctionne, mais il est fatigant. À chaque correction, il faut renvoyer tout le code à un Claude vérificateur, attendre son rapport, comparer avec le précédent... Et si vous changez quelque chose dans deux semaines, il faut tout refaire.

Repensez au contrôleur de la maison. S'il devait revenir vérifier chaque robinet à la main après chaque modification, il passerait sa vie chez vous. Ce qu'il fait en réalité, c'est installer des **capteurs** : un détecteur de fuite sur chaque tuyau, un testeur sur chaque circuit. Après ça, les capteurs surveillent en permanence. Si quelque chose casse, l'alarme se déclenche.

Vous allez faire la même chose : transformer vos vérifications en français en **tests automatiques** — du code que l'ordinateur exécute tout seul et qui vous dit ce qui marche et ce qui ne marche pas.

### Ce que vous allez faire

Demandez à Claude Code :

> Voici mes vérifications pour l'application :
> [collez vos vérifications en français]
>
> Transforme chaque vérification en un test automatique. Chaque ✓ doit devenir un test qui passe ou échoue. Je veux pouvoir lancer tous les tests avec une seule commande.

### Ce qui va se passer

Claude Code va créer des fichiers de tests dans votre projet. Vous n'avez pas besoin de comprendre le code de ces tests. Ce qui compte, c'est ce qui se passe quand vous les lancez.

Claude Code vous donnera une commande pour les exécuter (quelque chose comme `npm test` ou `mix test`). Lancez-la. Vous allez voir quelque chose comme :

```
✓ Inscription réussie : il reste 2 places
✓ Inscription réussie : Marie apparaît dans les inscrits
✓ Inscription réussie : paiement enregistré
✗ Inscription quand complet : Marie est quand même inscrite
✗ Paiement échoué : la place n'est pas libérée

12 tests, 9 passed, 3 failed
```

Vert = ça marche. Rouge = c'est cassé. Pas de rapport à interpréter. Juste des faits.

### Le nouveau cycle

Le cycle devient beaucoup plus court :

```
1. Demander une modification à Claude Code
2. Lancer les tests (une commande)
3. Tout est vert → git add + git commit
4. Du rouge apparaît → demander à Claude Code de corriger
5. Relancer les tests
6. Répéter jusqu'à tout vert
```

Essayez : demandez à Claude Code de corriger les tests qui échouent, relancez les tests, et répétez jusqu'à ce que tout passe.

### Pourquoi c'est un changement fondamental

- **C'est instantané.** Une commande, quelques secondes, vous savez où vous en êtes.
- **C'est répétable.** Après chaque modification, relancez la même commande. Pas besoin de réexpliquer quoi que ce soit.
- **Ça attrape les régressions.** Si Claude corrige le bug du paiement mais casse l'inscription, les tests vous le disent immédiatement — même si vous n'y pensiez pas.
- **Ça survit au temps.** Dans deux semaines, quand vous aurez oublié les détails, les tests s'en souviennent pour vous.

```bash
git add .
git commit -m "Tests automatiques ajoutés et passants"
```

---

## Étape 6 — Le piège de la confiance (20 min)

### Ce que vous allez faire

Un dernier exercice, et celui-ci est un piège volontaire.

Ouvrez une **nouvelle conversation** avec Claude et envoyez :

> Voici le code de mon application :
> [collez le code]
>
> Est-ce que ce code est correct ? Est-ce qu'il y a des bugs ?

### Ce qui va se passer

Claude va vous répondre quelque chose de rassurant. Il va dire que le code est "globalement bien structuré", peut-être signaler quelques améliorations possibles, et vous donner l'impression que tout va bien.

Maintenant comparez cette réponse avec le rapport de vérification de l'étape 4. Les ❌ que vous aviez trouvés — est-ce que Claude les mentionne ?

**Souvent, non.** Ou en passant, noyés dans une réponse positive.

### Pourquoi

Quand vous demandez "est-ce que c'est correct ?", c'est une question vague. Claude va lire le code, constater qu'il est syntaxiquement valide et logiquement cohérent avec lui-même, et dire "oui". C'est techniquement vrai — le code est "correct" en soi.

Mais "correct" et "fait ce qu'il devrait" sont deux choses différentes. Le code peut être parfaitement correct ET ne pas rembourser le paiement quand il le devrait. Il n'y a pas de bug au sens technique. Il y a un manque — quelque chose qui n'a pas été fait.

**La question "est-ce que c'est correct ?" est la mauvaise question.** La bonne question, c'est vos vérifications : "est-ce que le nombre de places diminue après inscription ? est-ce que le remboursement se déclenche après annulation ?" Des questions précises, vérifiables, qui ne laissent pas de place à l'interprétation.

### La leçon

> **Ne demandez jamais à l'IA "est-ce que c'est bon ?". Demandez-lui de vérifier des choses précises.** Une question floue donne une réponse floue. Une vérification précise donne un oui ou un non.

---

## Ce que vous avez appris

### En une phrase

**Construire et vérifier sont deux activités différentes, faites par deux conversations différentes, avec deux états d'esprit différents.**

### Les quatre nouveaux réflexes

10. **Ne faites pas confiance, vérifiez.** Ce qui a l'air de marcher ne marche pas forcément. Seule une vérification précise vous donne une certitude.

11. **Séparez le constructeur du vérificateur.** La conversation qui construit ne vérifie pas son propre travail. Utilisez une conversation séparée avec un regard frais.

12. **Posez des questions précises, pas des questions vagues.** "Est-ce que ça marche ?" → mauvais. "Est-ce que le nombre de places diminue de 1 après une inscription réussie ?" → bon.

13. **Faites écrire les tests par Claude, pas juste le code.** Vos vérifications en français deviennent des tests automatiques. Une commande, quelques secondes, zéro ambiguïté. C'est votre filet de sécurité permanent.

### La structure complète de votre projet

```
VUE D'ENSEMBLE
├── Parties et portes d'entrée (Module 1 + 3)

FICHES DÉTAILLÉES
├── Une par partie, avec détails internes (Module 3)

PARCOURS
├── Actions complètes avec gestion d'erreur (Module 2)

VÉRIFICATIONS                  ← nouveau
├── En français : ce qui doit être vrai après chaque action
├── Cas normaux, cas d'erreur, cas limites

TESTS AUTOMATIQUES             ← nouveau
├── Générés par Claude à partir des vérifications
├── Lançables en une commande
├── Le filet de sécurité permanent du projet
```

---

## Avant de partir — sauvegardez

```bash
git add .
git commit -m "Module 4 terminé : vérifications et cycle de correction"
```

Tapez `git log --oneline` pour voir tout votre historique. Vous devriez avoir une série de commits qui racontent l'histoire de votre apprentissage — du premier chaos jusqu'à un projet vérifié.

---

## La suite

Vous avez maintenant un vrai système : des parties organisées, des parcours définis, une structure d'information en niveaux, et des vérifications pour vous assurer que tout tient. C'est un vrai projet logiciel, piloté par vous, construit par l'IA.

Dans le Module 5, on va aborder la dernière grande question : **votre projet va évoluer dans le temps.** Des parties vont être remplacées. Des portes d'entrée vont changer. De nouvelles demandes vont apparaître qui ne rentrent dans aucune partie existante. Comment faire évoluer un projet sans tout casser ? Comment savoir quand il faut réorganiser le plan lui-même ?
