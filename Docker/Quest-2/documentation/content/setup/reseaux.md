---
title: "Reseaux Docker"
tags:
- setup
weight: -2
---

Les ```réseaux Docker``` permettent aux conteneurs de communiquer entre eux de manière sécurisée et efficace. 
Voici quelques concepts clés à connaître :

- Création d'un Réseau 

```sh
docker network create mon_nouveau_reseau
```

- Liste des Réseaux 

```sh
docker network ls
```

- Détails d'un Réseau 

```sh
docker network inspect mon_nouveau_reseau
```

- Connexion d'un Conteneur à un Réseau 

```sh
docker network connect mon_nouveau_reseau mon_conteneur
```

- Déconnexion d'un Conteneur d'un Réseau 

```sh
docker network disconnect mon_nouveau_reseau mon_conteneur
```

Les ```réseaux Docker``` offrent une flexibilité permettant d'isoler et de connecter des conteneurs selon les besoins spécifiques de votre application. La compréhension des différents types de réseaux et de leur utilisation est essentielle pour la mise en place d'une architecture conteneurisée robuste.
