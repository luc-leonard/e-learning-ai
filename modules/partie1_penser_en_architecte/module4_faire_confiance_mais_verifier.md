# Module 4 : Faire confiance, mais vérifier

## *Apprendre à vérifier sur un petit projet — avant de vérifier le vrai*

---

## Ce que vous savez déjà

Vous savez organiser un projet en parties (Module 1), décrire les parcours et gérer les erreurs (Module 2), et donner à Claude la bonne quantité d'information (Module 3).

Mais depuis le début, vous faites quelque chose de risqué : **vous croyez Claude sur parole.** Il vous dit "c'est fait", et vous passez à la suite. Ce module va vous montrer pourquoi c'est un problème — et comment le résoudre.

On ne va pas travailler sur le club de lecture tout de suite. On va d'abord apprendre à vérifier sur **un petit projet séparé** — un terrain d'entraînement contrôlé. Ce sera plus rapide, plus clair, et vous aurez la satisfaction de voir le cycle complet fonctionner avant de l'appliquer à votre vrai projet (dans le Module 5).

**Durée :** 2h30-3h30
**Ce qu'il vous faut :** Votre terminal, VSCode, Claude Code, votre carnet

---

## Avant de commencer : une analogie

Vous faites construire une maison. L'architecte vous montre les plans. L'entrepreneur vous dit "c'est terminé". Vous visitez : les murs sont droits, la peinture est belle, les prises fonctionnent. Tout a l'air parfait.

Mais est-ce que les fondations sont solides ? Est-ce que l'isolation est bien posée derrière les murs ? Est-ce que la plomberie tiendra dans 5 ans ? Vous ne pouvez pas le voir à l'œil nu.

C'est pour ça qu'il existe des **contrôleurs** indépendants. Quelqu'un qui n'a pas construit la maison et qui vient vérifier que tout est conforme. Pas en regardant si c'est joli — en testant : il ouvre tous les robinets en même temps, il vérifie la pression, il mesure l'isolation.

Le contrôleur ne sait pas forcément construire une maison. Mais il sait **quoi vérifier et comment**.

C'est exactement ce que vous allez apprendre à faire.

---

## Étape 1 — Construire un terrain d'entraînement (30 min)

### Ce que vous allez faire

Vous allez créer un tout petit projet à côté de votre club de lecture : un **système de réservation de salles**. C'est volontairement simple — trois parties, un parcours, quelques pages.

Pourquoi ne pas utiliser le club de lecture directement ? Parce qu'il est gros. Si les tests plantent ou si Claude vérificateur produit un rapport de 50 erreurs, vous ne saurez pas si c'est vous qui faites mal ou si c'est le projet qui est trop complexe. Le mini-projet élimine ce doute.

### Créer le dossier

Dans le terminal de VSCode :

```bash
cd ~
mkdir mini-projet
cd mini-projet
git init
```

Puis ouvrez ce dossier dans VSCode : **Fichier → Ouvrir un dossier** → sélectionnez `mini-projet`. Ouvrez le terminal intégré (`` Ctrl + ` ``).

### Écrire le plan

Créez un fichier `plan.md` dans VSCode et écrivez-y le plan suivant (ou copiez-le) :

```
PLAN — Système de réservation de salles

Stack : Node.js + Express, SQLite, Pico.css (CDN)

PARTIE : Salles
→ Fait : gérer les salles (nom, capacité, créneaux disponibles)
→ Ne fait PAS : gérer les réservations (c'est Réservations)

PARTIE : Réservations
→ Fait : réserver un créneau, annuler une réservation
→ Ne fait PAS : gérer les salles, gérer les paiements
→ A besoin de : Salles

PARTIE : Paiement (simulé)
→ Fait : encaisser et rembourser (en faux argent)
→ Ne fait PAS : gérer les réservations

PARCOURS : Réserver un créneau payant
1. Vérifier que la salle existe et que le créneau est libre
2. Réserver le créneau (temporairement)
3. Prendre le paiement (simulé)
   Si ça rate : libérer le créneau
4. Confirmer la réservation
   Si ça rate : rembourser + libérer le créneau

PARCOURS : Annuler une réservation
1. Vérifier que la réservation existe
2. Rembourser le paiement
   Si ça rate : on s'arrête, la réservation reste active
3. Libérer le créneau
4. Supprimer la réservation
```

Enregistrez, puis sauvegardez avec git :

```bash
git add plan.md
git commit -m "Plan du mini-projet de réservation"
```

### Construire avec Claude

Avant de lancer Claude Code, assurez-vous d'être dans le bon dossier. Dans le terminal de VSCode, tapez :

```bash
pwd
```

La dernière partie du chemin doit être `mini-projet`. Si ce n'est pas le cas, tapez `cd ~/mini-projet`. Puis lancez Claude Code :

```bash
claude
```

Demandez-lui :

> Lis plan.md. Construis cette application de réservation de salles en suivant le plan. Utilise la stack indiquée. Les paiements sont simulés (pas de vrai service de paiement). Crée quelques salles par défaut pour pouvoir tester.

Lancez le site (`npm install` puis `npm start`), ouvrez-le dans votre navigateur, et vérifiez que ça fonctionne : vous pouvez voir les salles et réserver un créneau.

Quittez Claude Code (`/exit`) et sauvegardez :

```bash
git add .
git commit -m "Mini-projet construit"
```

---

## Étape 2 — Tester vous-même d'abord (15 min)

### Ce que vous allez faire

Avant de demander quoi que ce soit à Claude, **testez vous-même dans le navigateur**. Jouez l'utilisateur curieux :

- Réservez un créneau. Est-ce que le nombre de places diminue ?
- Réservez le même créneau deux fois. Qu'est-ce qui se passe ?
- Annulez. Est-ce que la place revient ?
- Essayez de réserver un créneau dans le passé. Ça marche ?

Ne cherchez pas à être exhaustif. Notez juste ce qui vous semble bizarre ou suspect.

### Ce que vous devez noter dans votre carnet

> ✍️ Listez 3-4 choses que vous avez essayées et le résultat.
> ✍️ Y a-t-il quelque chose qui a marché alors que ça n'aurait pas dû ?

### Pourquoi tester vous-même d'abord

Votre test manuel attrape les **problèmes visibles** — l'interface, le comportement. Le Claude vérificateur de l'étape suivante attrapera les **problèmes invisibles** — la logique interne, les <dfn title="Situation rare ou extrême à laquelle personne ne pense, comme réserver 0 places ou s'inscrire deux fois">cas limites</dfn>. Les deux sont complémentaires. Ne sautez pas cette étape sous prétexte que Claude va tout vérifier.

---

## Étape 3 — Le vérificateur (30 min)

### Ce que vous allez faire

Lancez une **nouvelle session** de Claude Code :

```bash
claude
```

C'est important : le vérificateur doit avoir un **regard frais**, sans le contexte de construction. Dites-lui :

> Lis plan.md. Explore ensuite les fichiers du projet. Comportes-toi comme un utilisateur curieux et un peu malveillant — essaie de faire des choses qu'un vrai utilisateur pourrait faire, y compris des choses bizarres. Pour chaque test, dis-moi :
> 1. Ce que tu as essayé
> 2. Ce qui aurait DÛ se passer (d'après plan.md)
> 3. Ce qui se passe RÉELLEMENT dans le code

### 🔴 Ce que vous allez découvrir

Préparez-vous. Ça va piquer.

**🚩 Des actions qui "marchent" mais ne font pas tout.**
Par exemple : "Je réserve un créneau. Le paiement est enregistré. Mais le nombre de places disponibles n'a pas diminué." Ou : "J'annule. Le créneau est libéré. Mais le remboursement n'est pas fait."

**🚩 Des cas que personne n'a prévus.**
"Que se passe-t-il si je réserve le même créneau deux fois ?" — Rien ne m'en empêche. "Que se passe-t-il si j'annule une réservation qui n'existe pas ?" — Erreur cryptique.

**🚩 Des parcours à moitié implémentés.**
Vous aviez décrit "si le paiement rate, libérer le créneau" dans le plan. Claude constructeur avait dit "c'est fait". Mais le "c'est fait" signifiait parfois "j'ai écrit le cas normal, pas les cas d'erreur".

### Pourquoi ça arrive

Ce n'est pas que Claude ment. C'est que Claude fait ce que vous lui demandez **au moment où vous le demandez**. Quand vous dites "implémente le parcours de réservation", il implémente le chemin principal. Les cas d'erreur, il les fait si vous insistez — mais il ne va pas spontanément tout couvrir.

C'est exactement pareil avec un artisan humain. Si vous dites "installe une serrure sur la porte", il installe la serrure. Il ne va pas spontanément vérifier que la porte résiste aux coups de pied. Il faut le lui demander.

### Oui, vous faites confiance à un autre Claude

Vous vous dites peut-être : "Mais le vérificateur aussi, c'est Claude. Je fais toujours confiance à une IA." C'est vrai — mais c'est un Claude **indépendant**, qui n'a pas construit le code et n'a aucun intérêt à dire que tout va bien. C'est la même raison pour laquelle un contrôleur de maison n'est jamais l'entrepreneur lui-même.

### Ce que vous devez noter dans votre carnet

> ✍️ Combien de problèmes Claude-vérificateur a-t-il trouvés ?
> ✍️ Lesquels aviez-vous déjà repérés vous-même à l'étape 2 ?
> ✍️ Lesquels sont graves (argent mal géré, données incohérentes) vs bénins (affichage bizarre) ?

---

## Étape 4 — Comprendre la différence (10 min)

### Lisez ceci APRÈS avoir fait les étapes 2 et 3

Vous venez de faire quelque chose de fondamental : vous avez utilisé un Claude différent pour vérifier le travail du premier Claude. Et il a trouvé des problèmes.

Pourquoi un Claude "frais" trouve-t-il des erreurs que le Claude "constructeur" n'a pas vues ?

**Parce que quand on construit, on pense à ce qui doit marcher. Quand on vérifie, on pense à ce qui pourrait casser.**

Ce sont deux façons de penser opposées. Le constructeur est optimiste : "voilà comment ça fonctionne". Le vérificateur est pessimiste : "voilà comment ça pourrait échouer". Et il est très difficile de faire les deux en même temps — pour une IA comme pour un humain.

C'est pour ça que dans l'industrie, la personne qui construit n'est jamais la même que celle qui vérifie. Pas parce que le constructeur est mauvais — mais parce qu'on ne peut pas être juge et partie.

**Règle fondamentale : la conversation qui construit et la conversation qui vérifie doivent être séparées.**

---

## Étape 5 — Écrire des vérifications (30 min)

### L'idée clé

Vos parcours dans `plan.md` décrivent ce qui **devrait** se passer. Un scénario de vérification, c'est la même chose retournée : "si je fais ça, alors ça doit être vrai ensuite."

Ce n'est pas du code. Ce sont des phrases en français.

### Ce que vous allez faire

C'est la première fois que vous écrivez vous-même un contenu structuré dans un fichier du projet. Ne vous inquiétez pas si le format n'est pas parfait — l'important, c'est le contenu.

Ouvrez `plan.md` dans VSCode et ajoutez une section `VÉRIFICATIONS` à la fin. Commencez par le parcours "Réserver un créneau payant" :

```
VÉRIFICATIONS : Réservation d'un créneau payant

Situation de départ :
  - La salle "Salle A" a 5 créneaux, il en reste 2
  - L'utilisateur Alice veut réserver le créneau de 14h

Après une réservation réussie :
  ✓ Il reste 1 créneau disponible (pas 2)
  ✓ Alice apparaît dans les réservations
  ✓ Un paiement est enregistré au nom d'Alice
  ✓ Le créneau de 14h est marqué comme pris

Quand le créneau est déjà pris :
  ✓ La réservation est refusée
  ✓ Aucun paiement n'est enregistré
  ✓ Alice voit un message clair

Quand le paiement échoue :
  ✓ Alice n'a PAS de réservation
  ✓ Le créneau n'a PAS été pris
  ✓ Alice voit "paiement refusé"
```

### Vous remarquez quelque chose ?

Chaque vérification est une **phrase qu'on peut vérifier par oui ou non**. "Il reste 1 créneau" — c'est vrai ou c'est faux. "Alice apparaît dans les réservations" — oui ou non. Il n'y a pas d'ambiguïté.

C'est la force de cette approche : vous n'avez pas besoin de lire le code pour savoir si l'application marche. Vous avez besoin de **regarder le résultat et vérifier une liste**.

### Ajoutez les cas bizarres

Maintenant, ajoutez des vérifications pour les situations auxquelles personne ne pense :

```
VÉRIFICATIONS : Cas limites

Alice réserve le même créneau deux fois :
  ✓ La deuxième réservation est refusée
  ✓ Un seul paiement est enregistré

Alice annule sa réservation :
  ✓ Le créneau redevient disponible
  ✓ Alice est remboursée
  ✓ La réservation n'apparaît plus

Alice annule une réservation qui n'existe pas :
  ✓ Un message d'erreur clair s'affiche
  ✓ Rien d'autre ne change
```

### Demandez à Claude de compléter

Quand vous avez écrit vos vérifications, lancez Claude Code et demandez-lui :

> Lis plan.md. J'ai ajouté des vérifications à la fin. Quels cas ai-je oubliés ? Pense aux cas bizarres, aux cas limites, et aux cas où deux choses arrivent en même temps. Ajoute-les à la suite de mes vérifications dans plan.md.

Claude va proposer des cas auxquels vous n'avez pas pensé. **C'est vous qui décidez lesquels garder** — tous les cas ne méritent pas d'être vérifiés.

Quittez Claude Code (`/exit`) et sauvegardez :

```bash
git add plan.md
git commit -m "Vérifications ajoutées au plan"
```

### Ce que vous devez noter dans votre carnet

> ✍️ Quels cas limites avez-vous trouvés vous-même, avant Claude ?
> ✍️ Lesquels n'avaient pas de bonne réponse évidente — où c'était VOUS qui deviez décider du comportement ?

---

## Étape 6 — Le cycle de correction (30 min)

### Le rapport de vérification

Quittez Claude Code (`/exit`) puis relancez une nouvelle session (`claude`). Dites-lui :

> Lis plan.md. Pour chaque vérification listée, explore le code correspondant et dis-moi :
> - ✅ PASSE : le code fait bien ce qui est décrit
> - ❌ ÉCHOUE : le code ne fait pas ce qui est décrit (explique pourquoi)
> - ⚠️ IMPOSSIBLE À VÉRIFIER : le code ne couvre pas ce cas du tout

Vous allez obtenir un rapport clair. Probablement un mélange des trois. C'est normal.

- **Les ✅** sont vos certitudes. Ça marche, un Claude indépendant l'a confirmé.
- **Les ❌** sont vos priorités — on va les corriger.
- **Les ⚠️** sont des trous. Des choses que personne n'a implémentées.

### Corriger les échecs

Quittez (`/exit`), relancez Claude Code (`claude`) et dites-lui de corriger un échec précis. Ce qui suit est un exemple — **remplacez la phrase entre guillemets par le ❌ exact de votre rapport**, et décrivez ce que vous avez compris du problème :

> Lis plan.md. La vérification suivante échoue : "Quand le paiement échoue, le créneau n'a PAS été pris." Actuellement, le créneau est réservé avant le paiement mais jamais libéré si le paiement rate. Corrige ça en respectant le parcours décrit dans le plan.

Plus vous êtes précis, plus Claude est efficace. Si vous ne comprenez pas pourquoi ça échoue, dites-le simplement : "Je ne sais pas pourquoi, mais le résultat ne correspond pas à la vérification."

### Vérifier l'ampleur des changements

Après correction, regardez ce que Claude a changé :

```bash
git diff
```

Cette commande est nouvelle. Elle vous montre toutes les modifications depuis votre dernier commit — les lignes ajoutées en vert, les lignes supprimées en rouge. Vous n'avez pas besoin de comprendre le code en détail, mais vous pouvez voir **l'ampleur** des changements :

- **3-10 lignes modifiées** pour corriger un bug → rassurant, c'est ciblé.
- **200 lignes réécrites** pour un bug simple → suspect, Claude a probablement tout refait au lieu de corriger le minimum.

Si l'ampleur vous semble disproportionnée, dites-le à Claude : "Tu as réécrit beaucoup de code pour un petit bug. Peux-tu corriger uniquement le problème, sans tout changer ?"

### Sauvegarder et re-vérifier

```bash
git add .
git commit -m "Correction : libération du créneau quand le paiement échoue"
```

**Refaites la vérification.** Quittez (`/exit`), relancez (`claude`), et répétez la même demande de rapport. Certains ❌ vont passer en ✅. Parfois, une correction crée un nouveau ❌ ailleurs. C'est normal — c'est exactement comme ça que fonctionne le développement professionnel.

Le cycle complet est : **construire → committer → vérifier → corriger → committer → vérifier à nouveau.** Git garde la trace de chaque étape. Si une correction empire les choses, `git checkout .` vous ramène au dernier commit propre.

### Ce que vous devez noter dans votre carnet

> ✍️ Combien de ✅, ❌ et ⚠️ dans le premier rapport ?
> ✍️ Après correction, est-ce que de nouveaux ❌ sont apparus ?

---

## Étape 7 — Les tests automatiques (30 min)

### Le problème du cycle manuel

Le cycle de l'étape 6 fonctionne, mais il est fatigant. À chaque correction, il faut relancer un Claude vérificateur, attendre son rapport, comparer avec le précédent... Et si vous changez quelque chose dans deux semaines, il faut tout refaire.

Repensez au contrôleur de la maison. S'il devait revenir vérifier chaque robinet à la main après chaque modification, il passerait sa vie chez vous. Ce qu'il fait en réalité, c'est installer des **capteurs** : un détecteur de fuite sur chaque tuyau, un testeur sur chaque circuit. Après ça, les capteurs surveillent en permanence. Si quelque chose casse, l'alarme se déclenche.

Vous allez faire la même chose : transformer vos vérifications en français en **tests automatiques** — du code que l'ordinateur exécute tout seul et qui vous dit ce qui marche et ce qui ne marche pas.

### Ce que vous allez faire

Lancez Claude Code (`claude`) et demandez-lui :

> Lis plan.md. Transforme chaque vérification en un test automatique. Chaque ✓ doit devenir un test qui passe ou échoue. Je veux pouvoir lancer tous les tests avec une seule commande.

### Ce qui va se passer

Claude Code va créer des fichiers de tests dans votre projet. Vous n'avez pas besoin de comprendre le code de ces tests. Ce qui compte, c'est ce qui se passe quand vous les lancez.

Quand Claude Code a terminé, il vous indiquera la commande exacte à taper pour lancer les tests. Tapez-la dans le terminal. Vous allez voir quelque chose comme :

```
✓ Réservation réussie : il reste 1 créneau
✓ Réservation réussie : Alice apparaît dans les réservations
✓ Réservation réussie : paiement enregistré
✗ Double réservation : Alice peut réserver deux fois
✗ Paiement échoué : le créneau n'est pas libéré

8 tests, 6 passed, 2 failed
```

Vert = ça marche. Rouge = c'est cassé. Pas de rapport à interpréter. Juste des faits.

> 🚩 **Si les tests ne se lancent pas** ou si vous voyez des erreurs incompréhensibles, dites à Claude Code exactement ce que vous voyez. Si après deux tentatives ça ne marche toujours pas, ne restez pas bloqué. Ce n'est pas vous qui avez échoué — la mise en place de tests automatiques est l'une des tâches les plus capricieuses en développement, même pour les professionnels. Vous aurez à nouveau l'occasion de pratiquer ça dans le Module 5 et dans la partie 2. Le cycle manuel de l'étape 6 reste valide et suffisant.

### Le nouveau cycle

Si les tests marchent, le cycle devient beaucoup plus court :

```
1. Demander une modification à Claude Code
2. Lancer les tests (npm test)
3. Tout est vert → git add + git commit
4. Du rouge → demander à Claude de corriger
5. Relancer les tests
6. Répéter jusqu'à tout vert
```

Essayez : demandez à Claude Code de corriger les tests qui échouent, relancez les tests, et répétez jusqu'à ce que tout passe.

### Pourquoi c'est un changement fondamental

- **C'est instantané.** Une commande, quelques secondes, vous savez où vous en êtes.
- **C'est répétable.** Après chaque modification, relancez la même commande.
- **Ça attrape les <dfn title="Quand une correction casse quelque chose qui marchait avant">régressions</dfn>.** Si Claude corrige un bug mais en crée un autre, les tests vous le disent immédiatement.
- **Ça survit au temps.** Dans deux semaines, quand vous aurez oublié les détails, les tests s'en souviennent pour vous.

```bash
git add .
git commit -m "Tests automatiques ajoutés et passants"
```

---

## Ce que vous avez appris

### En une phrase

**Construire et vérifier sont deux activités différentes, faites par deux conversations différentes, avec deux états d'esprit différents.**

### Les trois nouveaux réflexes

10. **Ne faites pas confiance, vérifiez.** Ce qui a l'air de marcher ne marche pas forcément. Seule une vérification précise — une phrase qu'on peut répondre par oui ou non — vous donne une certitude.

11. **Séparez le constructeur du vérificateur.** La conversation qui construit ne vérifie pas son propre travail. Utilisez une conversation séparée avec un regard frais.

12. **Transformez vos vérifications en tests automatiques.** Vos phrases en français deviennent des capteurs permanents. Une commande, quelques secondes, zéro ambiguïté.

---

## Avant de partir — sauvegardez

Votre mini-projet est complet. C'est un petit système, mais il est **vérifié**. Vous savez exactement ce qui marche et ce qui ne marche pas — pas parce que Claude vous l'a dit, mais parce que vous l'avez prouvé.

```bash
git add .
git commit -m "Module 4 terminé : mini-projet vérifié avec tests"
```

---

## La suite

Vous savez maintenant vérifier. Mais vous l'avez fait sur un petit projet contrôlé — trois parties, un parcours, quelques vérifications.

Dans le Module 5, vous allez **appliquer ces compétences à votre vrai projet** — le club de lecture. C'est plus gros, plus imprévisible, et probablement plus cassé que vous ne le pensez. Mais vous savez maintenant exactement quoi faire.
