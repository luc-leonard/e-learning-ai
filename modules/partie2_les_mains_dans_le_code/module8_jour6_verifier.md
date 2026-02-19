# Jour 6 : Vérifier dans le code

## *Module 8 — Les mains dans le moteur*

---

### Avant de commencer : une analogie

Au Module 4, vous avez appris que **celui qui construit ne devrait pas être celui qui vérifie**. Vous aviez ouvert une nouvelle session Claude pour vérifier le travail d'une session précédente — le cycle constructeur/vérificateur.

On va refaire exactement ça, mais cette fois vous pouvez vérifier **dans le code**, pas juste dans un rapport.

**Durée :** 1h-1h30
**Ce qu'il vous faut :** Votre dossier `mon_club` ouvert dans VSCode, Claude Code, votre carnet

---

### Ce que vous allez faire

Quittez Claude Code (`/exit`), puis relancez une nouvelle session :

```bash
claude
```

Demandez :

> Lis le code de mon club de lecture. Pour chaque fonction qui peut échouer, dis-moi :
> 1. Quand est-ce qu'elle renvoie `{:ok, ...}` ?
> 2. Quand est-ce qu'elle renvoie `{:error, ...}` ?
> 3. Est-ce que le code qui appelle cette fonction gère les deux cas ?
>
> Si tu trouves des cas d'erreur non gérés, liste-les.

### Ce que vous allez découvrir

Probablement que plusieurs fonctions **ne gèrent pas le cas d'erreur**. Claude a écrit le chemin normal, mais le `{:error, ...}` n'est traité nulle part. Vous retrouvez exactement le problème du Module 4 : le constructeur est optimiste, le vérificateur trouve les trous.

### Corriger

Choisissez 1 ou 2 cas d'erreur non gérés et demandez à Claude de les corriger. Par exemple :

> La fonction `voter(membre_id, livre_id)` peut échouer si le livre n'existe pas, mais le LiveView qui l'appelle ne gère pas ce cas. Corrige ça pour afficher un message d'erreur à l'utilisateur.

### Vérifier l'ampleur des changements

Avant de sauvegarder, regardez ce que Claude a modifié :

```bash
git diff
```

Vous avez appris cette commande au Module 4. Elle vous montre exactement ce qui a changé — les lignes ajoutées (en vert, préfixées par `+`) et les lignes supprimées (en rouge, préfixées par `-`). Est-ce que les changements sont localisés, ou est-ce que Claude a touché à plein de fichiers ?

### Ce que vous devez noter dans votre carnet

> ✍️ Combien de cas d'erreur non gérés Claude a-t-il trouvés ?
> ✍️ Les corrections étaient-elles localisées (un seul fichier) ou dispersées (plusieurs fichiers) ?
> ✍️ Retrouvez-vous le vocabulaire du Module 4 ? (invariant violé, cas limite, chemin d'erreur)

### Avant de partir — sauvegardez

```bash
git add .
git commit -m "Jour 6 : vérification et correction des erreurs"
```
