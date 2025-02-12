# Projet Minitel by Vincent, Mattéo, Amir, et Joan

Ce projet Minitel est une application de surveillance et de gestion du système développée en Python, utilisant la bibliothèque `curses` pour l'affichage en mode terminal. L'application fournit des informations détaillées sur le système, y compris l'OS, la mémoire, le stockage, les processus, les interfaces réseau, et permet également d'exporter des rapports sous forme d'archive `.tar.gz`.

## Fonctionnalités

### Affichage d'informations système

- **Version du système d'exploitation** : Affiche la version de l'OS et du noyau.
- **Uptime** : Temps de fonctionnement depuis le dernier démarrage.
- **Informations CPU** : Nombre de cœurs logiques.
- **Mémoire** : Quantité totale et mémoire disponible.
- **Stockage** : Espace disque total, utilisé et libre.
- **Limite des fichiers ouverts** : Nombre maximal de fichiers ouverts autorisé.
- **Limite des processus** : Limite du nombre de processus.

### Liste des packages installés

- **Affiche la liste des packages installés sur le système** (nécessite la commande `dpkg`).
- **Pagination avec navigation** (`n` pour la page suivante, `p` pour la page précédente).

### Informations réseau

- **Affiche les interfaces réseau disponibles et leurs adresses.**
- **Affiche les paquets transmis et reçus par interface.**
- **Indique si l’IP forwarding est activé.**

### Gestion des processus

- **Affiche la liste des processus actifs avec les informations suivantes** :
  - PID
  - Nom du processus
  - Utilisateur associé
  - Statut du processus
  - PID parent (PPID)
  - Ligne de commande associée

### Export des informations

- **Exportation des données système** :
  - **Informations générales** : OS, uptime, CPU, mémoire, stockage.
  - **Informations réseau** : Interfaces, paquets transmis/reçus, état du forwarding IP.
  - **Informations des processus** : Détails sur les processus actifs.
- **Compression des rapports** :
  - Les informations sont exportées sous forme de fichiers JSON, puis compressées dans une archive `.tar.gz` placée dans le dossier `temps_files`.

### Navigation dans l'application

- Les informations sont affichées de manière interactive en utilisant `curses`.
- Appuyez sur des touches spécifiques pour accéder aux fonctionnalités :
  - **'p'** : Afficher les packages installés.
  - **'n'** et **'p'** : Naviguer entre les pages des packages ou des informations réseau.
  - **'q'** ou autre touche : Quitter les sous-menus ou l'application.

## Installation

1. Clonez le dépôt ou copiez le code source.

2. Executez le script d'installation
   ```bash
   sudo chmod +x install_python.sh
   sudo ./install_python.sh
   ```
3. Lancez l'application depuis le terminal :
   ```bash
   cd minitel_project
   python3 main.py
   ```

**_Note_** : _Le programme utilise dpkg pour lister les packages installés. Assurez-vous de l'exécuter sur un système compatible avec cette commande (comme Debian ou Ubuntu)._

**_Exigences Système :_**

- **_OS :_** _Linux (Debian, Ubuntu pour la commande dpkg)_
- **_Python :_** _Version 3.x_
- **_Dépendances Python :_**
  - _psutil_
  - _curses (intégrée à Python)_
