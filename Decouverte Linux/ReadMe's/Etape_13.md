# Configuration du cronjob pour redémarrer le service Apache2

Ce document explique comment configurer un cronjob pour redémarrer le service Apache2 à des moments spécifiques de la semaine.

## Installation de `cron`

On exécute ces commandes pour installer `cron`

```bash
sudo apt-get update
sudo apt-get install cron
```

## Configuration du cronjob

1. On ouvre le fichier de crontab système de l'utilisateur `john` en utilisant un éditeur de texte :

```bash
sudo crontab -u john -e
```

2. On ajoute la ligne suivante à la fin du fichier pour définir la tâche planifiée :

```bash
42 23 * * 3,6 john systemctl restart apache2
```

Cette ligne signifie que le service apache2 redémarrera à `23h42` les `mercredis` (jour 3) et `samedis` (jour 6) en tant qu'utilisateur `john`.
