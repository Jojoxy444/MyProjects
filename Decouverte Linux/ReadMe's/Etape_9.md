# Synchronisation des répertoires avec `rsync`

## Commande à utiliser

Sur notre VM (VM A), on exécute la commande suivante pour synchroniser les répertoires :

```sh
rsync -av --delete --no-perms -e "ssh -port port_de_vm_b" /data/admin/configurations bob@adresse_ip_de_vm_b:/data/admin/configurations/
```

Explication des options :

- -a : Active le mode archive pour une synchronisation récursive et conserve les propriétés importantes des fichiers.

- -v : Active le mode verbose pour afficher des informations détaillées sur les opérations effectuées.

- --delete : Supprime les fichiers dans le répertoire de destination qui ne sont plus présents dans le répertoire source.

- --no-perms : Ne conserve pas les permissions des fichiers.

- -e "ssh -port port_de_vm_b" : Utilise le protocole SSH pour le transfert des fichiers tout en se connectant sur le port 2242.

Exemple :

```sh
rsync -av --delete --no-perms -e "ssh -p 2242" /data/admin/configurations/ bob@172.16.230.32:/data/admin/configurations/
```
