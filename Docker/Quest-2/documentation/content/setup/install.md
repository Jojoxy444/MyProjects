---
title: "Setup"
tags:
- setup
weight: -5
---

## Installation de Docker

### Debian
> Afin d'installer Docker sur Debian exécuter la commande suivante :

```sh
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

> Pour démarrer docker après son installation :

```sh
sudo systemctl start docker
```

### Docker Desktop

L'installation de docker ouvre aussi l'accès à l'application [docker desktop](https://www.docker.com/products/docker-desktop/) permettant de démarrer docker lors de son lancement

> Step 2: [Creer sa première image Docker](setup/images.md)
