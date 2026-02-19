# Jour 3 : Le code qui dit "ça a marché" ou "ça n'a pas marché"

## *Module 8 — Les mains dans le moteur*

---

### Avant de commencer : une analogie

Au Module 2, vous avez dessiné des parcours. Chaque parcours avait un **chemin normal** (tout se passe bien) et un **chemin d'erreur** (quelque chose rate). Vous aviez écrit des choses comme : "Si le membre n'existe pas → erreur" ou "Si plus de places → erreur".

En Elixir, ce concept existe directement dans le code. Quand une fonction fait quelque chose, elle le dit clairement :

```elixir
# Ça a marché
{:ok, livre}

# Ça n'a pas marché
{:error, "Plus de places"}
```

Ce sont vos chemins du Module 2, écrits dans le langage du code.

**Durée :** 1h-1h30
**Ce qu'il vous faut :** Votre dossier `mon_club` ouvert dans VSCode, Claude Code, votre carnet

---

### Ce que vous allez faire

Lancez Claude Code dans le dossier `mon_club` et envoyez :

> Montre-moi une fonction Elixir qui peut réussir ou échouer. Par exemple, une fonction `inscrire_membre` qui renvoie `{:ok, membre}` si tout va bien, ou `{:error, raison}` si quelque chose ne va pas.
>
> Puis montre-moi comment le code qui APPELLE cette fonction gère les deux cas avec `case`.

### Ce que vous allez voir

Claude va vous montrer quelque chose comme :

```elixir
def inscrire(email) do
  if email_valide?(email) do
    {:ok, %{email: email, inscrit_le: Date.utc_today()}}
  else
    {:error, "Email invalide"}
  end
end
```

Et le code qui l'utilise :

```elixir
case inscrire("marie@exemple.fr") do
  {:ok, membre} -> afficher_bienvenue(membre)
  {:error, raison} -> afficher_erreur(raison)
end
```

Le `case` regarde le résultat et fait quelque chose de différent selon la forme. Si c'est `{:ok, ...}`, on fait une chose. Si c'est `{:error, ...}`, on fait autre chose.

**Vous connaissez déjà ça.** C'est exactement vos parcours du Module 2 — le chemin normal et le chemin d'erreur. Le code ne fait que les écrire dans un format précis.

### L'exercice

Demandez à Claude Code :

> Montre-moi un deuxième exemple de fonction avec `{:ok, ...}` / `{:error, ...}` et un `case`, mais cette fois ne me montre PAS le `case`. Je vais essayer de l'écrire moi-même (en français, pas en code) : quel cas faut-il gérer, et que faire dans chaque cas ?

Vous n'écrivez pas du vrai code — vous décrivez les chemins, exactement comme au Module 2. Puis demandez à Claude de vous montrer le vrai `case` et comparez.

### Ce que vous devez noter dans votre carnet

> ✍️ Est-ce que `{:ok, ...}` / `{:error, ...}` vous rappelle les chemins du Module 2 ?
> ✍️ Avez-vous réussi à deviner les deux cas à gérer ?
> ✍️ À quoi ça sert de gérer le cas `{:error, ...}` ? Que se passe-t-il si on ne le fait pas ?
