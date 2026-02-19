# Module 0 : Avant de commencer

## *Installer vos outils — et comprendre ce que vous installez*

---

## À qui s'adresse ce module

Vous n'avez jamais ouvert un terminal. Vous ne savez pas ce qu'est git. Vous avez peut-être entendu le mot "ligne de commande" sans vraiment savoir ce que c'est. Parfait — c'est exactement là qu'on commence.

Ce module va vous faire installer quatre choses : un **terminal**, **Visual Studio Code**, **git**, et **Claude Code**. On va prendre le temps d'expliquer chacun. À la fin, vous aurez un environnement prêt pour tout le reste de la formation.

**Durée :** 1h30-2h30
**Ce qu'il vous faut :** Un ordinateur (Mac, Linux, ou Windows), une connexion internet, un compte Anthropic, un carnet et un stylo

### Le carnet

Tout au long de cette formation, on vous demandera d'écrire des choses dans un **carnet** — un vrai, en papier, avec un stylo. Pas un fichier texte, pas une app de notes.

Pourquoi ? Parce que quand vous écrivez à la main, vous réfléchissez. Quand vous tapez au clavier, vous transcrivez. Ce n'est pas la même chose. Le carnet n'est pas un document de référence — c'est un outil de pensée. Vous y noterez vos observations, vos frustrations, vos intuitions. Personne ne le lira à part vous.

Prenez n'importe quel carnet. Un cahier d'écolier fait très bien l'affaire.

---

## Avant de commencer : une analogie

Imaginez un atelier de menuiserie.

Pour travailler le bois, vous avez besoin de quatre choses :
- **L'atelier lui-même** — un espace où vous pouvez donner des instructions et voir ce qui se passe. C'est le **terminal**.
- **Un établi bien éclairé** — une surface de travail confortable, avec vos planches bien rangées et visibles d'un coup d'œil. C'est **Visual Studio Code**.
- **Un système de rangement** — à chaque étape de votre projet, vous prenez une photo de votre travail et vous la rangez dans un album. Si vous faites une erreur, vous pouvez revenir à n'importe quelle photo précédente. C'est **git**.
- **Un assistant très compétent** — il sait construire à peu près n'importe quoi, mais il a besoin que vous lui parliez clairement. C'est **Claude Code**.

On va installer ces quatre choses dans l'ordre.

---

## Étape 1 — Le terminal (10 min)

### Ce que c'est

Le terminal, c'est une fenêtre où vous tapez des instructions à votre ordinateur. Pas de boutons, pas de menus — juste du texte. C'est intimidant au début, mais en réalité c'est plus simple qu'une interface graphique : vous dites exactement ce que vous voulez, et l'ordinateur le fait.

### Comment l'ouvrir

**Sur Mac :**
Ouvrez l'application **Terminal** (cherchez "Terminal" avec Spotlight en appuyant sur `Cmd + Espace`).

**Sur Linux :**
Cherchez "Terminal" dans vos applications, ou utilisez le raccourci `Ctrl + Alt + T`.

**Sur Windows :**
Vous allez avoir besoin de **WSL** (Windows Subsystem for Linux). Ouvrez PowerShell en tant qu'administrateur et tapez :
```
wsl --install
```
Redémarrez votre ordinateur. Après le redémarrage, une fenêtre Ubuntu s'ouvrira et vous demandera de créer un nom d'utilisateur et un mot de passe. Faites-le. C'est ce terminal que vous utiliserez pour la suite.

### Vos premières commandes

Une fois le terminal ouvert, vous voyez un curseur qui clignote. Tapez ceci et appuyez sur Entrée :

```bash
pwd
```

Ça affiche le **dossier dans lequel vous êtes** (`pwd` = "print working directory"). Probablement quelque chose comme `/Users/votrenom` sur Mac ou `/home/votrenom` sur Linux.

Maintenant :

```bash
ls
```

Ça **liste le contenu** du dossier actuel. Vous devriez reconnaître des noms familiers : Documents, Bureau, Images...

Créez un dossier pour la formation :

```bash
mkdir formation-ia
```

Et entrez dedans :

```bash
cd formation-ia
```

Tapez `pwd` pour confirmer — vous devriez voir `/Users/votrenom/formation-ia` ou similaire.

### Aide-mémoire

| Commande | Ce qu'elle fait |
|----------|----------------|
| `pwd` | Affiche où vous êtes |
| `ls` | Liste le contenu du dossier |
| `mkdir nom` | Crée un dossier |
| `cd nom` | Entre dans un dossier |
| `cd ..` | Remonte d'un dossier |

---

## Étape 2 — Visual Studio Code (20 min)

### Ce que c'est

Visual Studio Code (VSCode) est un **éditeur de code** gratuit. Pensez-y comme un traitement de texte, mais conçu pour le code au lieu de la prose.

Pourquoi en avoir besoin si Claude Code fait tout ? Parce que vous voulez **voir** ce qui se passe. Quand Claude Code crée ou modifie des fichiers, VSCode vous les montre en temps réel, avec de la coloration syntaxique (les différents éléments du code s'affichent en couleurs distinctes). C'est votre établi bien éclairé — vous ne construisez pas dans le noir.

### Installer VSCode

Allez sur [code.visualstudio.com](https://code.visualstudio.com) et téléchargez la version correspondant à votre système. Lancez l'installeur.

**Utilisateurs Windows :** Téléchargez la version Windows normale (pas la version WSL). VSCode sait communiquer avec WSL automatiquement.

### Ouvrir votre dossier de projet

Lancez VSCode, puis :
1. Allez dans **Fichier → Ouvrir un dossier**
2. Naviguez jusqu'au dossier `formation-ia` que vous avez créé à l'étape précédente
3. Sélectionnez-le et cliquez **Ouvrir**

Vous voyez maintenant votre dossier de projet dans le panneau de gauche. Pour l'instant il est vide — c'est normal.

### Le terminal intégré

VSCode a un **terminal intégré** — un terminal directement dans l'éditeur. C'est celui que vous utiliserez le plus souvent.

Pour l'ouvrir : **Terminal → Nouveau terminal** (ou `` Ctrl + ` ``).

Un terminal s'ouvre en bas de la fenêtre. Tapez `pwd` — vous devriez être directement dans votre dossier `formation-ia`. Si ce n'est pas le cas, tapez `cd ~/formation-ia`.

**Utilisateurs Windows :** VSCode va probablement ouvrir un terminal PowerShell par défaut. Vous devez le changer pour WSL. Cliquez sur la petite flèche à côté du `+` dans le panneau du terminal, et sélectionnez **Ubuntu (WSL)**.

À partir de maintenant, utilisez ce terminal intégré pour toutes les commandes. Vous aurez le code visible en haut et le terminal en bas — tout au même endroit.

---

## Étape 3 — Git (30 min)

### Ce que c'est

Git, c'est un système de **points de sauvegarde** pour vos fichiers.

Pensez à un jeu vidéo. Avant un passage difficile, vous sauvegardez. Si ça se passe mal, vous rechargez la sauvegarde et vous réessayez. Git fait exactement la même chose, mais pour votre code et vos fichiers de projet.

Chaque sauvegarde s'appelle un **commit**. Un commit, c'est un instantané de tous vos fichiers à un moment donné, avec un petit message qui dit ce que vous avez fait ("ajouté la page d'accueil", "corrigé le bug du formulaire").

### Installer git

Dans le terminal intégré de VSCode, tapez :

```bash
git --version
```

**Si un numéro de version s'affiche :** git est déjà installé, passez à "Configurer git".

**Sur Mac (si git n'est pas installé) :**
Votre Mac vous proposera de l'installer — acceptez et suivez les instructions.

**Sur Linux / WSL :**
```bash
sudo apt update && sudo apt install git
```
On vous demandera votre mot de passe. Tapez-le (rien ne s'affiche pendant que vous tapez — c'est normal, c'est une mesure de sécurité).

### Configurer git

Git a besoin de savoir qui vous êtes pour signer vos sauvegardes. Tapez ces deux commandes en remplaçant par vos informations :

```bash
git config --global user.name "Votre Nom"
git config --global user.email "votre@email.com"
```

### Votre premier dépôt

Vérifiez que vous êtes dans `formation-ia` (tapez `pwd`). Puis :

```bash
git init
```

Vous venez de dire à git : "surveille ce dossier". Git va maintenant suivre tous les changements que vous faites ici. Ce dossier est devenu un **dépôt** (repository en anglais).

### Votre premier commit

Créons un fichier pour avoir quelque chose à sauvegarder. Dans VSCode, créez un nouveau fichier : **Fichier → Nouveau fichier** (ou `Cmd + N` sur Mac, `Ctrl + N` sur Linux/Windows). Tapez dedans :

```
# Ma formation IA
```

Puis enregistrez-le avec **Fichier → Enregistrer** (ou `Cmd + S` / `Ctrl + S`) sous le nom `notes.md`, dans votre dossier `formation-ia`. Vous devriez le voir apparaître dans le panneau gauche de VSCode.

Demandons à git ce qu'il voit :

```bash
git status
```

Git vous dit qu'il y a un nouveau fichier (`notes.md`) mais qu'il ne le suit pas encore. Le nom du fichier est en rouge — c'est normal.

Pour dire à git "je veux inclure ce fichier dans ma prochaine sauvegarde" :

```bash
git add notes.md
```

Retapez `git status`. Le fichier est maintenant en vert — il est prêt à être sauvegardé.

Créez votre sauvegarde :

```bash
git commit -m "Premier commit : ajout du fichier de notes"
```

Le `-m` veut dire "message". Chaque sauvegarde a un message qui décrit ce que vous avez fait.

### Le cycle git

Vous venez d'apprendre le seul cycle que vous utiliserez pendant toute la formation :

```
1. Vous modifiez des fichiers
2. git add (vous choisissez quoi sauvegarder)
3. git commit -m "description" (vous sauvegardez)
```

C'est tout. Il y a des dizaines de commandes git avancées, mais ces trois étapes couvrent 90% de ce que vous ferez.

### Aide-mémoire

| Commande | Ce qu'elle fait |
|----------|----------------|
| `git init` | Commence à surveiller un dossier |
| `git status` | Montre ce qui a changé |
| `git add fichier` | Prépare un fichier pour la sauvegarde |
| `git commit -m "message"` | Sauvegarde avec une description |
| `git log --oneline` | Affiche l'historique des sauvegardes |

Essayez `git log --oneline` maintenant — vous devriez voir votre premier commit.

---

## Étape 4 — Claude Code (30 min)

### Ce que c'est

Claude Code, c'est Claude **directement dans votre terminal**. Pas besoin d'aller sur un site web, pas besoin de copier-coller du code. Vous lui parlez, il voit vos fichiers, il peut les modifier, et il travaille avec vous dans votre dossier de projet.

C'est l'assistant de l'atelier. Il est dans la pièce avec vous, il voit les planches, et il peut prendre les outils lui-même.

### Installer Node.js

Claude Code a besoin de **Node.js** pour fonctionner. C'est un moteur qui fait tourner certains programmes — vous n'avez pas besoin de comprendre les détails, juste de l'installer.

**Sur Mac :**
Allez sur [nodejs.org](https://nodejs.org) et téléchargez la version **LTS** (la version stable, sur le bouton vert de gauche). Lancez l'installeur.

**Sur Linux / WSL :**
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
```

Vérifiez :

```bash
node --version
```

Vous devriez voir un numéro de version (par exemple `v22.x.x`).

### Installer Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

`npm` c'est le gestionnaire de paquets de Node.js — un outil qui installe des programmes. `-g` veut dire "installe-le globalement" (accessible de partout).

### Se connecter

Lancez Claude Code :

```bash
claude
```

Claude Code va vous demander de vous connecter à votre compte Anthropic. Suivez les instructions à l'écran — ça ouvrira une page dans votre navigateur pour vous authentifier.

Une fois connecté, vous verrez un prompt qui attend vos instructions. Vous êtes dans Claude Code.

### Votre première conversation

Envoyez-lui ceci :

```
Lis le fichier notes.md et dis-moi ce qu'il contient.
```

Claude Code va lire votre fichier et vous répondre. Il est **dans votre dossier** — il voit ce que vous voyez.

Maintenant, demandez-lui :

```
Ajoute une ligne dans notes.md avec la date d'aujourd'hui et le texte "Module 0 terminé".
```

Claude Code va modifier le fichier directement. Regardez dans VSCode — le contenu de `notes.md` se met à jour en temps réel. C'est pour ça qu'on a installé VSCode : vous voyez ce que Claude Code fait.

Maintenant, demandez-lui de sauvegarder avec git :

```
Fais un commit git avec tes changements
```

Vérifiez le commit avec `git log --oneline`

### Pour quitter Claude Code

Tapez `/exit` ou appuyez sur `Ctrl + C`.

### Aide-mémoire

| Action | Commande |
|--------|----------|
| Lancer Claude Code | `claude` |
| Quitter Claude Code | `/exit` ou `Ctrl+C` |
| Lui parler | Tapez votre message et appuyez sur Entrée |

Claude Code peut lire vos fichiers, les modifier, exécuter des commandes, et créer de nouveaux fichiers. Pendant toute la formation, c'est lui votre partenaire de travail.

---

## Ce que vous avez installé — et pourquoi

Récapitulons :

- **Le terminal** vous donne un accès direct à votre ordinateur, sans interface graphique. C'est votre atelier.
- **Visual Studio Code** vous montre vos fichiers et votre code de manière claire et organisée. C'est votre établi.
- **Git** vous permet de sauvegarder votre travail à chaque étape et de revenir en arrière si quelque chose casse. C'est votre filet de sécurité.
- **Claude Code** est l'IA qui va construire avec vous. Il voit vos fichiers, comprend votre projet, et peut agir directement dessus. C'est votre assistant.

Ces quatre outils vont travailler ensemble pendant toute la formation. Voici le cycle typique d'une session de travail :

```
1. Ouvrir VSCode sur votre dossier de projet
2. Ouvrir le terminal intégré (Ctrl + `)
3. Lancer Claude Code (claude)
4. Travailler avec Claude Code (et voir les changements dans VSCode)
5. Sauvegarder régulièrement avec git (add + commit)
```

---

## Checkpoint

Avant de passer au Module 1, vérifiez que tout fonctionne :

- [ ] Vous savez ouvrir un terminal (autonome ou dans VSCode)
- [ ] `pwd`, `ls`, `cd` et `mkdir` ne vous font plus peur
- [ ] VSCode est installé et ouvert sur votre dossier `formation-ia`
- [ ] Git est installé (`git --version` affiche un numéro)
- [ ] Vous avez un dépôt `formation-ia` avec au moins deux commits
- [ ] Claude Code est installé et vous avez eu une conversation avec lui
- [ ] Vous comprenez le cycle : modifier → `git add` → `git commit`

Si un point bloque, ne restez pas coincé. Décrivez votre problème à Claude Code (s'il est installé) ou cherchez l'erreur exacte sur internet. Débloquer une installation récalcitrante, c'est déjà de l'apprentissage.

---

## La suite

Votre environnement est prêt. Dans le Module 1, vous allez demander à Claude Code de construire quelque chose pour vous — et vous allez découvrir pourquoi ça ne suffit pas de "juste demander".
