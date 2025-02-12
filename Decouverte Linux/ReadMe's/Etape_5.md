# Configuration de l'accès administratif

## Configuration

1. **Modifier le fichier sudoers** :
   En tant que superutilisateur, ouvrez le fichier sudoers à l'aide de la commande `visudo` :

```bash
sudo visudo
```

2. **Ajoutez la ligne suivante** :
   Ajoutez la ligne suivante à la fin du fichier sudoers pour autoriser le groupe `"admin"` à exécuter toutes les commandes avec `sudo` :

```bash
%admin ALL=(ALL:ALL) ALL
```

Cela permettra aux membres du groupe `"admin"` d'exécuter des commandes d'administration.
