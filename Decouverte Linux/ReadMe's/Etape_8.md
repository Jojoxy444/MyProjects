# Connexion SSH à une autre VM

## Connexion en tant que compte utilisateur

Pour se connecter en tant que compte utilisateur (login du groupe), on exécute la commande suivante sur notre VM (VM A) :

```sh
su chenot_j
```

## Génération de la clé SSH

Pour générer une clé SSH RSA de 2048 bits, on exécute la commande suivante sur notre VM (VM A) :

```sh
ssh-keygen -t rsa -b 2048
```

## Copie de la clé publique sur l'autre VM

De l'autre coté, lorsque l'utilisateur de la VM B obtient la clé RSA publique de l'utilisateur de la VM A, il ne lui reste plus qu'à l'inscrire dans le fichier nommé `authorized_keys`

```sh
nano authorized_keys
```

## Connexion à la VM B

Pour vérifier que l'on peut se connecter :

```sh
ssh bob@172.16.230.32 -p 2242
```
