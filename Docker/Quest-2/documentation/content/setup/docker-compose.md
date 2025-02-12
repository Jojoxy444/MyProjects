---
title: "Docker-compose"
---

```Docker Compose``` est un outil qui permet de définir et de gérer des applications multi-conteneurs. Il utilise un fichier ```YAML``` pour configurer les services, les réseaux et les volumes, facilitant ainsi le déploiement et la gestion d'applications complexes composées de plusieurs services.

## Installation de Docker Compose 

```sh
sudo apt install -y docker-compose
```

## Utilisation de Docker Compose 

### Création du fichier docker-compose.yml 

Créez un fichier docker-compose.yml dans le répertoire de votre projet. 

Voici un exemple de structure de fichier :

```yaml
version: "3"
services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"
  database:
    image: postgres:latest
    environment:
      POSTGRES_PASSWORD: example
```

### Lancement des conteneurs 

```sh
docker-compose up 
```

### Arrêt des conteneurs 

```sh
docker-compose down
```
En utilisant ```Docker Compose```, vous pouvez définir la configuration de vos ```services```, ```réseaux``` et ```volumes``` en un seul fichier, simplifiant ainsi la gestion et le déploiement de votre application multi-conteneurs.