# <span style="color:#007BFF">Endpoint Get :  /hello</span>

<span style="color:#A7CCED">**Informations requises :** </span>*Aucune information requise pour cette requête.*

<span style="color:#A7CCED">**Exemple de retour :** </span>

```json
{
  "message": "Hello, World"
}
```

<span style="color:#A7CCED">**Exemple de requête CURL :** </span>

```sh
curl -X GET "https://votre-api.com/hello"
```

<span style="color:#A7CCED">**Description :** </span> *Cet endpoint renvoie simplement un message 
<span style="color:#E15554">**"Hello, World"***</span>.

# <span style="color:#007BFF">Endpoint Get :  /hello/link</span>

<span style="color:#A7CCED">**Informations requises :** </span>*Aucune information requise pour cette requête.*

<span style="color:#A7CCED">**Exemple de retour :** </span>

```json
{
  "message": "Hello Link!"
}
```

<span style="color:#A7CCED">**Exemple de requête CURL :** </span>

```sh
curl -X GET "https://votre-api.com/hello/link"
```

<span style="color:#A7CCED">**Description :** </span> *Cet endpoint renvoie un message 
<span style="color:#E15554">**"Hello Link!"***</span>.

# <span style="color:#007BFF">Endpoint Post : /user/create/</span>

<span style="color:#A7CCED">**Informations requises :** </span>*Vous devez fournir un 
<span style="color:#E1BC29">**JSON**</span>
avec les informations d'utilisateur, y compris le courrier électronique 
<span style="color:#E15554">**(mail)** </span>, le mot de passe <span style="color:#E15554">**(password)** </span>, le prénom <span style="color:#E15554">**(firstname)** </span>, le nom de famille <span style="color:#E15554">**(lastname)** </span>, la date de naissance <span style="color:#E15554">**(birthday_date)** </span>, l'adresse <span style="color:#E15554">**(address)** </span>, le code postal <span style="color:#E15554">**(postal_code)** </span>, et d'autres champs.*

<span style="color:#A7CCED">**Exemple de retour :** </span>
*Vous recevrez un 
<span style="color:#E1BC29">**JSON**</span>
contenant les informations de l'utilisateur créé, ou une erreur si la création a échoué.*

<span style="color:#A7CCED">**Exemple de requête CURL :** </span>

```sh
curl -X POST "https://votre-api.com/user/create/" -H "Content-Type: application/json" -d '{
  "mail": "john.doe@example.com",
  "password": "password123",
  "firstname": "John",
  "lastname": "Doe",
  "birthday_date": "1990-01-15",
  "address": "123 Main St",
  "postal_code": "12345",
  "key": "your_secret_key"
}'
```

<span style="color:#A7CCED">**Description :** </span> 
*Cet endpoint permet la création d'un nouvel utilisateur. Vous pouvez inclure un champ 
<span style="color:#E15554">**key** </span>
avec une clé secrète pour déterminer le rôle de l'utilisateur. Le rôle par défaut est 
<span style="color:#E15554">**"user"**</span>
 sauf si la clé secrète est fournie, auquel cas le rôle est 
<span style="color:#E15554">**"admin"**</span>
 . Les informations de l'utilisateur sont stockées dans la base de données.*

# <span style="color:#007BFF">Endpoint Get : /user/info/{user_id}</span>

<span style="color:#A7CCED">**Informations requises :** </span> *Vous devez fournir l'ID de l'utilisateur 
<span style="color:#E15554">**(user_id)**</span>
 dans l'URL.*

<span style="color:#A7CCED">**Exemple de retour :** </span>
*Vous recevrez un 
<span style="color:#E1BC29">**JSON**</span>
contenant les informations de l'utilisateur, y compris le rôle et d'autres détails. Si vous n'êtes pas autorisé, vous recevrez une erreur.*

<span style="color:#A7CCED">**Exemple de requête CURL :** </span>

```sh
curl -X GET "https://votre-api.com/user/info/123" -H "Authorization: Bearer VOTRE_TOKEN_JWT"
```

<span style="color:#A7CCED">**Description :** </span> 
*Cet endpoint permet de récupérer les informations d'un utilisateur en fonction de son 
<span style="color:#E15554">**ID**</span>
. Vous devez fournir un jeton 
<span style="color:#3BB273">**JWT**</span> 
valide pour accéder à ces informations. Selon le rôle de l'utilisateur, certaines informations peuvent être masquées.*

# <span style="color:#007BFF">Endpoint Delete : /user/delete/{user_id}</span>

<span style="color:#A7CCED">**Informations requises :** </span>
*Vous devez fournir l'ID de l'utilisateur 
<span style="color:#E15554">**(user_id)**</span> 
dans l'URL et un jeton 
<span style="color:#3BB273">**JWT**</span> 
valide dans l'en-tête de la requête.*

<span style="color:#A7CCED">**Exemple de retour :** </span>
*Vous recevrez un message indiquant que l'utilisateur a été supprimé avec succès, ou une erreur si la suppression a échoué.*

<span style="color:#A7CCED">**Exemple de requête CURL :** </span>

```sh
curl -X DELETE "https://votre-api.com/user/delete/123" -H "Authorization: Bearer VOTRE_TOKEN_JWT"
```

<span style="color:#A7CCED">**Description :** </span> 
*Cet endpoint permet à un administrateur de supprimer un utilisateur en fonction de son 
<span style="color:#E15554">**ID**</span>
. Un jeton 
<span style="color:#3BB273">**JWT**</span>
est nécessaire pour l'authentification, et seuls les administrateurs sont autorisés à effectuer cette action.*



# <span style="color:#007BFF">Endpoint Post /connect</span>

<span style="color:#A7CCED">**Informations requises :** </span>
*Un 
<span style="color:#E1BC29">**JSON**</span>
contenant 
<span style="color:#E15554">**mail**</span> 
et 
<span style="color:#E15554">**password**</span>.*

<span style="color:#A7CCED">**Exemple de retour :** </span>
*Un jeton 
<span style="color:#3BB273">**JWT**</span>
 pour l'authentification.*

<span style="color:#A7CCED">**Exemple de requête CURL :** </span>

```sh
curl -X POST http://votre-serveur/connect -d '{
    "mail": "utilisateur@example.com",
    "password": "mot_de_passe"
}'
```

<span style="color:#A7CCED">**Description :** </span> 
*Cet endpoint permet de se connecter en renseignant son 
<span style="color:#E15554">**mail**</span>
et son 
<span style="color:#E15554">**password**</span> 
afin d'obtenir un token 
<span style="color:#3BB273">**JWT**</span>
afin d'accéder aux autres endpoints.*

# <span style="color:#007BFF">Endpoint Post /upload/picture/user/{user_id}</span>

<span style="color:#A7CCED">**Informations requises :** </span>
*<span style="color:#E15554">**user_id (int)** </span> : L'identifiant de l'utilisateur. 
<span style="color:#E15554">**Fichier image**</span> : L'image de profil à télécharger (
<span style="color:#E1BC29">**gif**</span>, <span style="color:#E1BC29">**png**</span> ou <span style="color:#E1BC29">**jpg**</span>).*

<span style="color:#A7CCED">**Exemple de retour :** </span>
```json
{
    "message": "Image de profil enregistrée avec succès.",
    "image_path": "/assets/picture/profiles/{user_token}.jpg"
}
```

<span style="color:#A7CCED">**Exemple de requête CURL :** </span>

```sh
curl -X POST -F "file=@image.jpg" http://votre-domaine.com/upload/picture/user/123
```

<span style="color:#A7CCED">**Description :** </span> 
*Ce point de terminaison permet aux utilisateurs de télécharger leur image de profil. Si un utilisateur ne fournit pas de fichier image, l'image de profil par défaut est enregistrée. Les images téléchargées sont stockées dans le dossier 
<span style="color:#E15554">**assets/picture/profiles**</span> 
sous le nom 
<span style="color:#E15554">**{user_token}**</span>.
<span style="color:#E1BC29">**jpg**</span>.*

# <span style="color:#007BFF">Endpoint Post /picture/user/{user_id}</span>

<span style="color:#A7CCED">**Informations requises :**</span>
<span style="color:#E15554">**user_id (int)**</span> : *L'identifiant de l'utilisateur.*

<span style="color:#A7CCED">**Exemple de retour :** </span>
*Retourne l'image de profil de l'utilisateur au format 
<span style="color:#E1BC29">**gif**</span>, 
<span style="color:#E1BC29">**png**</span> ou 
<span style="color:#E1BC29">**jpg**</span>. Si l'image n'existe pas, elle renvoie l'image de profil par défaut.*

<span style="color:#A7CCED">**Exemple de requête CURL :** </span>

```sh
curl http://votre-domaine.com/assets/picture/profiles/123
```

<span style="color:#A7CCED">**Description :** </span> 
*Cet endpoint renvoie l'image de profil de l'utilisateur identifié par 
<span style="color:#E15554">**user_id**</span>
. Si l'utilisateur n'a pas d'image de profil personnalisée, il renvoie l'image de profil par défaut.*

# <span style="color:#007BFF">Endpoint Post /user/update/{user_id}</span>

<span style="color:#A7CCED">**Informations requises :** </span>
*<span style="color:#E15554">**user_id (int)**</span>
: L'identifiant de l'utilisateur.
Données 
<span style="color:#E1BC29">**JSON**</span>
 pour mettre à jour le profil de l'utilisateur (varie en fonction des autorisations de l'utilisateur).
Jeton 
<span style="color:#3BB273">**JWT**</span>
(dans l'en-tête de la demande) pour l'authentification.*

<span style="color:#A7CCED">**Exemple de retour :** </span>*Retourne les données du profil utilisateur mises à jour.*

<span style="color:#A7CCED">**Exemple de requête CURL :** </span>

```sh
curl -X POST -H "Authorization: Bearer VOTRE_JETON_JWT" -H "Content-Type: application/json" -d '{"mail": "nouveau@mail.com", "firstname": "Nouveau", "lastname": "Nom", ...}' http://votre-domaine.com/user/update/123
```

<span style="color:#A7CCED">**Description :** </span> 
*Cet endpoint permet à un utilisateur de mettre à jour son propre profil, sous réserve des autorisations définies par le jeton 
<span style="color:#3BB273">**JWT**</span>. Les champs mis à jour peuvent varier en fonction du rôle de l'utilisateur (par exemple, les administrateurs peuvent mettre à jour plus de champs que les utilisateurs standard).*

# <span style="color:#007BFF">Endpoint Post /user/password</span>

<span style="color:#A7CCED">**Informations requises :** </span>*Données 
<span style="color:#E1BC29">**JSON**</span>
 contenant l'adresse e-mail de l'utilisateur, le mot de passe actuel et le nouveau mot de passe.*

<span style="color:#A7CCED">**Exemple de retour :** </span>*Retourne un message indiquant que le mot de passe a été mis à jour avec succès.*

<span style="color:#A7CCED">**Exemple de requête CURL :** </span>

```sh
curl -X POST -H "Content-Type: application/json" -d '{"mail": "mail@example.com", "password": "ancien_mot_de_passe", "new_password": "nouveau_mot_de_passe", "repeat_new_password": "nouveau_mot_de_passe"}' http://votre-domaine.com/user/change_password
```

<span style="color:#A7CCED">**Description :** </span> 
*Cet endpoint permet à un utilisateur de changer son mot de passe. Il nécessite l'adresse mail de l'utilisateur, l'ancien mot de passe et le nouveau mot de passe.*

# <span style="color:#007BFF">Endpoint Post /departement/create/</span>

<span style="color:#A7CCED">**Informations requises :** </span>
<span style="color:#E15554">***name (corps de la requête)*** </span>*: Le nom du département que vous souhaitez créer.*

<span style="color:#A7CCED">**Exemple de retour :** </span>

```json
{
  "id": 1,
  "name": "Département RH"
}
```

<span style="color:#A7CCED">**Exemple de requête CURL :** </span>

```sh
curl -X POST -H "Authorization: Bearer VOTRE_TOKEN_JWT" -d '{"name": "Département RH"}' http://votre-serveur.com/departement/create/
```

<span style="color:#A7CCED">**Description :** </span> *Cet endpoint permet de créer un nouveau département en fournissant son nom. Il est accessible uniquement pour les administrateurs.*

# <span style="color:#007BFF">Endpoint Post /departements/{id_departement}/users/add</span>

<span style="color:#A7CCED">**Informations requises :** </span>
<span style="color:#E15554">***id_departement***</span>
 *(dans l'URL) : L'ID du département auquel vous souhaitez ajouter des utilisateurs.
<span style="color:#E15554">***user_ids***</span>
 (corps de la requête) : Une liste d'ID d'utilisateurs à ajouter au département.*

<span style="color:#A7CCED">**Exemple de retour :** </span>

```json
[
  {
    "id": 1,
    "mail": "utilisateur1@example.com",
    "firstname": "John",
    "lastname": "Doe",
    "role": "admin",
    "departement": ["RH"]
  },
  {
    "id": 2,
    "mail": "utilisateur2@example.com",
    "firstname": "Jane",
    "lastname": "Smith",
    "role": "user",
    "departement": ["RH"]
  }
]
```

<span style="color:#A7CCED">**Exemple de requête CURL :** </span>

```sh
curl -X POST -H "Authorization: Bearer VOTRE_TOKEN_JWT" -d '{"user_ids": [1, 2]}' http://votre-serveur.com/departements/1/users/add
```

<span style="color:#A7CCED">**Description :** </span> *Cet endpoint permet aux administrateurs d'ajouter des utilisateurs à un département spécifique.*

# <span style="color:#007BFF">Endpoint Post /departements/{id_departement}/users/remove</span>

<span style="color:#A7CCED">**Informations requises :** </span>
<span style="color:#E15554">***id_departement** </span> (dans l'URL) : L'ID du département duquel vous souhaitez supprimer des utilisateurs.
<span style="color:#E15554">**user_ids** </span>(corps de la requête) : Une liste d'ID d'utilisateurs à supprimer du département.*

<span style="color:#A7CCED">**Exemple de retour :** </span>

```json
[
  {
    "id": 2,
    "mail": "utilisateur2@example.com",
    "firstname": "Jane",
    "lastname": "Smith",
    "role": "user",
    "departement": []
  }
]
```

<span style="color:#A7CCED">**Exemple de requête CURL :** </span>

```sh
curl -X POST -H "Authorization: Bearer VOTRE_TOKEN_JWT" -d '{"user_ids": [2]}' http://votre-serveur.com/departements/1/users/remove
```

<span style="color:#A7CCED">**Description :** </span> *Cet endpoint permet aux administrateurs de supprimer des utilisateurs d'un département spécifique.*

# <span style="color:#007BFF">Endpoint Get /departements/{id_departement}/users</span>

<span style="color:#A7CCED">**Informations requises :** </span>
<span style="color:#E15554">***id_departement** </span>
 (dans l'URL) : L'ID du département pour lequel vous souhaitez récupérer les utilisateurs.*

<span style="color:#A7CCED">**Exemple de retour :** </span>

```json
[
  {
    "id": 1,
    "mail": "utilisateur1@example.com",
    "firstname": "John",
    "lastname": "Doe",
    "role": "admin",
    "departement": ["RH"]
  },
  {
    "id": 2,
    "mail": "utilisateur2@example.com",
    "firstname": "Jane",
    "lastname": "Smith",
    "role": "user",
    "departement": ["RH"]
  }
]
```

<span style="color:#A7CCED">**Exemple de requête CURL :** </span>

```sh
curl -H "Authorization: Bearer VOTRE_TOKEN_JWT" http://votre-serveur.com/departements/1/users
```

<span style="color:#A7CCED">**Description :** </span> *Cet endpoint permet de récupérer la liste des utilisateurs qui appartiennent à un département spécifique. L'accès dépend du rôle de l'utilisateur (admin ou utilisateur).*

# <span style="color:#007BFF">Endpoint Post rh/msg/add</span>

<span style="color:#A7CCED">**Informations requises :** </span>
<span style="color:#E15554">***id_user** </span>
 (corps de la requête) : L'ID de l'utilisateur créant la demande RH.
content (corps de la requête) : Le contenu de la demande RH.*

<span style="color:#A7CCED">**Exemple de retour :** </span>

```json
{
  "id_user": 1,
  "content": "Besoin de congé pour une semaine."
}
```

<span style="color:#A7CCED">**Exemple de requête CURL :** </span>

```sh
curl -X POST -H "Authorization: Bearer VOTRE_TOKEN_JWT" -d '{"id_user": 1, "content": "Besoin de congé pour une semaine."}' http://votre-serveur.com/rh/msg/add
```
<span style="color:#A7CCED">**Description :** </span> *Cet endpoint permet aux utilisateurs de créer une nouvelle demande RH en fournissant leur ID et le contenu de la demande.*

# <span style="color:#007BFF">Endpoint Post /rh/msg/remove</span>

<span style="color:#A7CCED">**Informations requises :** </span>
<span style="color:#E15554">***id** </span>
 (corps de la requête) : L'ID de la demande RH à supprimer.*

<span style="color:#A7CCED">**Exemple de retour :** </span>

```json
{
  "message": "Demande RH supprimée avec succès"
}
```

<span style="color:#A7CCED">**Exemple de requête CURL :** </span>

```sh
curl -X POST -H "Authorization: Bearer VOTRE_TOKEN_JWT" -d '{"id": 1}' http://votre-serveur.com/rh/msg/remove
```

<span style="color:#A7CCED">**Description des cas d'utilisation:** </span>
*Cet endpoint permet de fermer une demande RH spécifique en fournissant son 
<span style="color:#E15554">***ID*** </span>
. Il est accessible aux administrateurs et aux managers.*

# <span style="color:#007BFF">Endpoint Post /rh/msg/update</span>

<span style="color:#A7CCED">**Informations requises :** </span>
<span style="color:#E15554">***id_user** </span> (corps de la requête) : L'ID de l'utilisateur créant la demande RH.
content (corps de la requête) : Le contenu mis à jour de la demande RH.*

<span style="color:#A7CCED">**Exemple de retour :** </span>

```json
{
  "id_user": 1,
  "content": "Nouveau contenu de la demande RH."
}
```

<span style="color:#A7CCED">**Exemple de requête CURL :** </span>

```sh
curl -X POST -H "Authorization: Bearer VOTRE_TOKEN_JWT" -d '{"id_user": 1, "content": "Nouveau contenu de la demande RH."}' http://votre-serveur.com/rh/msg/update
```

<span style="color:#A7CCED">**Description :** </span> *Cet endpoint permet aux utilisateurs de mettre à jour le contenu d'une demande RH existante en fournissant leur 
<span style="color:#E15554">***ID***</span>
 et le nouveau contenu.*

# <span style="color:#007BFF">Endpoint Post /rh/msg</span>

<span style="color:#A7CCED">**Informations requises :** </span>*Aucune information requise.*

<span style="color:#A7CCED">**Exemple de retour :** </span>

```json
[
  {
    "id": 1,
    "id_user": 1,
    "content": "Demande RH numéro 1",
    "registration_date": "2023-11-07T12:00:00",
    "visibility": true,
    "close": false,
    "last_action": "2023-11-07T14:30:00",
    "delete_date": null
  },
  {
    "id": 2,
    "id_user": 2,
    "content": "Demande RH numéro 2",
    "registration_date": "2023-11-07T13:15:00",
    "visibility": true,
    "close": false,
    "last_action": "2023-11-07T15:45:00",
    "delete_date": null
  }
]
```

<span style="color:#A7CCED">**Exemple de requête CURL :** </span>

```sh
curl -H "Authorization: Bearer VOTRE_TOKEN_JWT" http://votre-serveur.com/rh/msg
```

<span style="color:#A7CCED">**Description :** </span> *Cet endpoint permet de récupérer la liste des demandes RH. Il est accessible aux managers et aux administrateurs.*