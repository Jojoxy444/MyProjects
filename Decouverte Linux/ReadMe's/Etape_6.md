# Guide d'utilisation : Connexion en tant qu'utilisateur et personnalisation des variables d'environnement

## Connexion en tant qu'utilisateur

1. **Utilisez la commande `su`** :
   Utilisez la commande `su` suivie du nom de l'utilisateur auquel vous souhaitez vous connecter.

   Par exemple, pour vous connecter en tant qu'utilisateur `"john"`, saisissez :

```bash
su john
```

## Personnalisation du fichier .bashrc

Une fois connecté en tant qu'utilisateur, vous pouvez personnaliser le fichier `.bashrc` pour ce compte. Voici comment procéder :

1. **Éditez le fichier .bashrc** :
   Editer le fichier `.bashrc` en utilisant nano :

```bash
nano ~/.bashrc
```

2. **Ajoutez des variables d'environnement** :
   Ajoutez les variables d'environnement `bureau`, `etage`, et `surnom`, à ce fichier.

   Par exemple :

```bash
# Variables d'environnement
export bureau="bureau_de_john"
export etage="etage_de_john"
export surnom="john"
```

## Affichage des variables d'environnement

1. **Utilisez la commande `echo`** :
   Utilisez la commande `echo` suivie du nom de la variable d'environnement précédée d'un `$`.

   Par exemple :

   ```bash
   echo $bureau
   ```

   Résultat :

   ```bash
   bureau_de_john
   ```
