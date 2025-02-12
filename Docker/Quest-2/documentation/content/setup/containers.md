---
title: "Containers"
tags:
- setup
weight: -3
---

## Lancer son premier conteneur

### Exécuter un conteneur simple 

Pour lancer un conteneur à partir de l'image que vous avez créée, utilisez la commande ```docker run``` en spécifiant le nom de l'image.

```sh
docker run -d --name mon-conteneur nom_de_votre_image:tag
```

#### Les différents paramètres

```-p``` Mapper le port de son application sur son port local pour pouvoir accéder à son application

```--name``` : Donner un nom à son conteneur

```--network``` : Connecter son conteneur à son réseau Docker

```--link``` : Permet de connecter son conteneur à un autre conteneur 

### Vérifier l'état du conteneur 

Utilisez docker ps pour vérifier l'état de vos conteneurs en cours d'exécution.

```sh
docker ps
```

Cela devrait afficher une liste des conteneurs en cours d'exécution sur votre machine.

### Gestion des conteneurs Docker

Arrêter et redémarrer un conteneur en utilisant les commandes ```docker stop``` et ```docker start```.

```sh
docker stop mon-conteneur
docker start mon-conteneur
```

### Supprimer un conteneur 

```sh
docker rm mon-conteneur
```

Assurez-vous que le conteneur est arrêté avant de le supprimer.

## Exploration avancée

#### Gestion des réseaux Docker 

Si votre application nécessite une communication entre conteneurs, abordez la gestion des [réseaux Docker](setup/reseaux.md).

#### Docker Compose 

Explorez [Docker Compose](setup/docker-compose.md) pour définir et exécuter des applications multi-conteneurs. Cela peut être particulièrement utile lorsque votre application nécessite plusieurs services.
