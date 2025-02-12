---
title: Bienvenue sur Docker !
enableToc: false
---

## Qu'est-ce que Docker ?

Docker est une plateforme open-source qui simplifie le déploiement, la gestion et la mise à l'échelle d'applications dans des conteneurs légers et portables.

## Conteneurs vs Machines Virtuelles

Les conteneurs Docker permettent l'exécution d'applications dans des environnements isolés, partageant le noyau du système hôte, ce qui les rend plus légers et plus rapides que les machines virtuelles.

- ```Portabilité``` : 
Les conteneurs Docker garantissent que les applications fonctionnent de manière cohérente, indépendamment de l'environnement.  


- ```Isolation``` : Chaque conteneur est isolé, assurant une sécurité et une cohérence des performances.

- ```Déploiement Facile``` : Les conteneurs peuvent être déployés rapidement et facilement, accélérant le cycle de développement.

- ```Gestion des Dépendances``` : Docker facilite la gestion des dépendances et la configuration de l'environnement.

## Concepts Clés

- ```Images Docker``` : Des images sont des instantanés immuables contenant le code, les dépendances et la configuration nécessaires pour exécuter une application.

- ```Conteneurs Docker``` : Les conteneurs sont des instances exécutables d'images, offrant une isolation et une portabilité maximales.

- ```Docker Hub``` : Docker Hub est un registre public où vous pouvez trouver, partager et télécharger des images Docker pré-construites.

## Cas d'Utilisation Courants 

Docker est idéal pour le développement local, le déploiement en production, la création d'environnements de test et la gestion de microservices.

## Écosystème Docker 

Outre Docker Core, l'écosystème comprend Docker Compose pour la gestion de plusieurs conteneurs, Docker Swarm pour l'orchestration, et d'autres outils complémentaires.

## Get Started

> Step 1 : [Installation de Docker](setup/install.md)

> Step 2 : [Creer sa première image Docker](setup/images.md)

> Step 3 : [Lancer son premier conteneur Docker](setup/containers.md)
