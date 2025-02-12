---
title: "Images"
tags:
- setup
weight: -4
---

## Écrire un Dockerfile 

Créez un fichier appelé Dockerfile qui définit les instructions nécessaires pour construire votre image Docker. Vous pouvez spécifier l'image de base, les dépendances, les configurations, et les commandes d'exécution.

### Exemple de Dockerfile

```sh
# Utilisez une image de base
FROM debian:bullseye

# Installez les dépendances nécessaires
RUN apt-get update && apt-get install -y \
    package1 \
    package2 \
    && rm -rf /var/lib/apt/lists/*

# Copiez votre application dans l'image
COPY . /app

# Définissez le répertoire de travail
WORKDIR /app

# Spécifiez la commande d'exécution
CMD ["./votre_application"]
```

## Construire l'image 

Utilisez la commande ```docker build``` pour construire votre image en spécifiant le chemin vers le répertoire contenant le Dockerfile.

```sh
docker build -t nom_de_votre_image:tag .
```

Assurez-vous de remplacer ```nom_de_votre_image``` par le nom que vous souhaitez donner à votre image et ```tag``` par une version ou un identifiant spécifique.

## Vérifier l'image créée  

Vous pouvez utiliser la commande ```docker images``` pour voir la liste des images Docker sur votre machine. Assurez-vous que votre image nouvellement créée apparaît dans la liste.

```sh
docker images
```

> Step 3: [Lancer son premier conteneur](setup/containers.md)
