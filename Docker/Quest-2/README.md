## Vote

<span style="color:turquoise">**Service**</span> : Vote

<span style="color:turquoise">**Objectif**</span> : Front-end afin d'afficher les votes

<span style="color:turquoise">**Langage**</span>: Python

<span style="color:turquoise">**Services externes**</span> : Redis

## Result

<span style="color:turquoise">**Service**</span> Result

<span style="color:turquoise">**Objectif**</span> : Front-end afin d'afficher les résultats

<span style="color:turquoise">**Langage**</span> : JavaScript

<span style="color:turquoise">**Services externes**</span> : PostgreSQL

<span style="color:turquoise">**Identifiants**</span> :

```
DB_USER = "postgres"

DB_PASS = "postgres"

DB_HOST ="db"

DB_NAME ="postgres"
```

## Worker

<span style="color:turquoise">**Service**</span> : Worker

<span style="color:turquoise">**Objectif**</span> : Transférer les votes de la BDD Redis vers la BDD PostgreSQL

<span style="color:turquoise">**Services externes**</span> : Redis, PostgreSQL

# Vote application

_Cette application permet d'émettre un vote avec deux choix possible
<span style="color:yellow">"Cat" & "Dog"</span>. Les résultats fournis seront transmis par la base de donnée
<span style="color:yellow">Redis</span> puis passeront par le
<span style="color:yellow">Worker</span> pour être transférés sur
<span style="color:yellow">Postgres</span> pour finalement être affiché sur la page
<span style="color:yellow">Result</span>._

## Usage

_Afin de démarrer le projet, exécutez la commande suivante :_

```sh
docker-compose up
```

## Containers

### Vote

_C'est une page qui affiche les différentes propositions de votes, en l'occurence "Cat" & "Dog"._

### Redis

_Redis est une base de données qui stocke les votes de manière éphemère._

### Worker

_Le worker se charge de faire le lien entre redis et la base de données postgres_

### DB

_La base de données postgres envoie les votes reçus au result_

### Result

_C'est une page qui affiche les pourcentages pour chaque votes_
