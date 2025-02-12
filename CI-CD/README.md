## OPS2 - Initiation à la CI/CD

### Commandes disponibles

* `make build` : monter l'image docker
* `make up` : lancer le conteneur docker qui contient l'api et la base de donnée
* `make down` : down le conteneur docker qui contient l'api et la base de donnée
* `make test` : lance le conteneur docker de test et execute les tests
* `make lint` : vérifie la syntaxe de vos fichiers
* `make format` : corrige la syntaxe de vos fichiers
* `make shell` : vous permet d'accéder au terminal du conteneur docker si il est lancé
* `make logs` : vous permet d'attacher le terminal de logs du conteneur docker à votre terminal, vous permet d'accéder aux logs du conteneur en direct

### Installation

Avant toute chose, assurez-vous d'avoir : `docker` ainsi que la commande `make`

1. `make build` vous permet de monter l'image docker
2. `make up` vous permet de lancer l'api via un conteneur docker sur [cette ip](https://localhost) 

A partir de là vous pouvez accéder au ***swagger*** de votre api via https://localhost/docs