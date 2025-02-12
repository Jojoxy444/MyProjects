# Système d'information et de monitoring

Cette application est un outil de monitoring système conçu pour fonctionner dans un terminal. Elle utilise la bibliothèque `curses` pour créer une interface utilisateur textuelle qui affiche diverses informations sur le système, y compris des détails sur le système d'exploitation, les ressources matérielles, les interfaces réseau, et les processus en cours d'exécution.

## Fonctionnalités

- **Informations Système** : Affiche des informations générales sur le système, notamment :

  - Version de l'OS
  - Temps de fonctionnement (uptime)
  - Version du noyau
  - Nombre de cœurs CPU
  - Informations sur la mémoire (total et disponible)
  - Utilisation du disque
  - Limite d'ouvertures de fichiers
  - Limite de processus

- **Paquets Installés** : Permet à l'utilisateur de voir la liste des paquets installés sur le système, avec une pagination pour faciliter la navigation.

- **Informations Réseau** : Affiche des informations sur les interfaces réseau, y compris :

  - Adresses IP des interfaces
  - Statistiques des paquets envoyés et reçus
  - État du forwarding de paquets (activé ou non)

- **Gestion des Processus** : Affiche une liste des processus en cours d'exécution, avec la possibilité de :
  - Voir plus de processus avec une pagination.
  - Terminer un processus en fournissant son PID (identifiant de processus).

## Utilisation

1. **Lancement de l'application** : Exécutez le fichier `main.py` à partir de votre terminal.

   ```bash
   python main.py
   ```
