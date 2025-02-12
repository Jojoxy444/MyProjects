import subprocess, uvicorn
from fastapi import FastAPI, HTTPException, UploadFile, Depends, status, File, Path
from fastapi.security import OAuth2PasswordBearer
from fastapi.responses import FileResponse
from sqlalchemy import create_engine, Column, Integer, String, Float, text, Date, JSON, ARRAY, Boolean, Table, ForeignKey, MetaData
from sqlalchemy.orm import sessionmaker, Session, relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy_utils import database_exists, create_database
from pydantic import BaseModel, Json, parse_obj_as

from typing import Union, Optional, List
import json

from dotenv import load_dotenv
import os

from datetime import date, datetime, timedelta

import hashlib

from jwt import PyJWTError
from jwt.exceptions import DecodeError, ExpiredSignatureError
import jwt

from PIL import Image
from io import BytesIO

from Utils.Classes.Users import *
from Utils.Classes.Pictures import *
from Utils.Classes.Departements import *
from Utils.Classes.RequestRH import *
from Utils.Classes.Events import *

from Utils.Fonctions.Users import *
from Utils.Fonctions.Pictures import *
from Utils.Fonctions.Departements import *
from Utils.Fonctions.RequestRH import *
from Utils.Fonctions.Events import *

jwt_token = None

registration_date = date.today()

app = FastAPI()

@app.get("/hello")
async def read_root():
    return {"message": "Hello, World"}

@app.get("/hello/link")
async def hello_link():
  return {"message": "Hello Link!"}

@app.post("/user/create/", response_model=user_create)
async def create_user(item: user_create):
    query = text('INSERT INTO "user" (mail, password, firstname, lastname, birthday_date, address, postal_code, age, meta, registration_date, token, role, departement) VALUES (:mail, :password, :firstname, :lastname, :birthday_date, :address, :postal_code, :age, :meta, :registration_date, :token, :role, :departement) RETURNING *')
    meta_data = {}
    meta_json = json.dumps(meta_data)

    if item.key == secret_key:
        values = {
            "mail": item.mail,
            "password": hash_password(item.password, database_salt),
            "firstname": item.firstname,
            "lastname": item.lastname,
            "birthday_date": item.birthday_date,
            "address": item.address,
            "postal_code": item.postal_code,
            "age": calculate_age(item.birthday_date),
            "meta": meta_json,
            "registration_date": registration_date,
            "token": generate_token(item.mail, item.firstname, item.lastname, database_salt),
            "role": "admin",
            "departement": []
        }
    else:
        values = {
            "mail": item.mail,
            "password": hash_password(item.password, database_salt),
            "firstname": item.firstname,
            "lastname": item.lastname,
            "birthday_date": item.birthday_date,
            "address": item.address,
            "postal_code": item.postal_code,
            "age": calculate_age(item.birthday_date),
            "meta": meta_json,
            "registration_date": registration_date,
            "token": generate_token(item.mail, item.firstname, item.lastname, database_salt),
            "role": "user",
            "departement": []
        }
    with engine.begin() as conn:
        result = conn.execute(query, values)
        return result.fetchone()
        
@app.delete("/user/delete/{user_id}")
async def delete_user(user_id : int, jwt_token: dict = Depends(verify_jwt_token)):
    if jwt_token is None or "error" in jwt_token:
        raise HTTPException(status_code=401, detail="Jetons JWT non valides ou non fournis")
    
    else:
        # Vérifiez le rôle de l'utilisateur à partir du jeton JWT
        user_role = jwt_token.get("role", "")

        if user_role == "admin":
            query = text('DELETE FROM "user" WHERE id = :user_id RETURNING *')
            values = {"user_id": user_id}
            with engine.begin() as conn:
                result = conn.execute(query, values)
                deleted_user = result.fetchone()
                if not deleted_user:
                    raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
                return {"message": "Utilisateur supprimé avec succès"}
        else:
            raise HTTPException(status_code=403, detail="Seul un administrateur peut effectuer cette tache")

@app.post("/connect")
async def connection(item: user_connect):
    global jwt_token
    
    role = get_role_by_mail_and_password(item.mail, item.password)

    query = text('SELECT mail, password FROM "user" WHERE mail = :mail')
    values = {"mail": item.mail}
    with engine.begin() as conn:
        result = conn.execute(query, values)
        user = result.fetchone()
        if user:
            db_mail, db_password = user
            hashed_password = hash_password(item.password, database_salt)
            if hashed_password == db_password:
                # Authentification réussie, générez un token JWT

                if role == "admin":
                    jwt_token = gen_jwt_admin(item.mail)
                elif role == "manager":
                    jwt_token = gen_jwt_manager(item.mail)
                else:
                    jwt_token = gen_jwt_user(item.mail)

                return {"access_token": jwt_token, "token_type": "bearer"}
            else:
                raise HTTPException(status_code=401, detail="Mot de passe incorrect")
        else:
            raise HTTPException(status_code=404, detail="Utilisateur non trouvé ou mail incorrect")

@app.get("/user/info/{user_id}", response_model=Union[user_get_admin, user_get_user])
async def get_user_info(user_id: int, jwt_token: dict = Depends(verify_jwt_token)):
    if jwt_token is None or "error" in jwt_token:
        raise HTTPException(status_code=401, detail="Jetons JWT non valides ou non fournis")
    else:
        # Vérifiez le rôle de l'utilisateur à partir du jeton JWT
        user_role = jwt_token.get("role", "")
        user = get_user_by_id(user_id)
        
        if user:
            user_dict = user._asdict() # Convertir l'objet SQLAlchemy en dictionnaire
            if user_role == "admin":
                user_dict.pop("password", None)
                return user_dict
            elif user_role == "user":
                user_dict.pop("password", None)
                user_dict.pop("birthday_date", None)
                user_dict.pop("address", None)
                user_dict.pop("postal_code", None)
                user_dict.pop("meta", None)
                user_dict.pop("token", None)
                return user_dict
            else:
                # Gérer le cas où le rôle n'est ni "admin" ni "user" ou l'utilisateur n'est pas autorisé
                raise HTTPException(status_code=403, detail="Accès non autorisé")
        else:
            raise HTTPException(status_code=404, detail="Utilisateur non trouvé")

PROFILE_IMAGES_DIR = "assets/picture/profiles"
DEFAULT_PROFILE_PICTURE_PATH = "assets/picture/profiles/pdp_base.png"

# Vérifier si le dossier de stockage existe, sinon le créer
if not os.path.exists(PROFILE_IMAGES_DIR):
    os.makedirs(PROFILE_IMAGES_DIR)

@app.post("/upload/picture/user/{user_id}")
async def upload_profile_image(user_id: int, file: UploadFile = File(None)):
    # Logique pour récupérer le token de l'utilisateur basé sur user_id
    user_token = get_user_token_by_id(user_id) 

    # Si l'utilisateur ne renseigne pas de photo, ca lui upload la photo par défaut 
    if file is None:
        saved_image_path = os.path.join(PROFILE_IMAGES_DIR, f"{user_token}.jpg")
        with open(DEFAULT_PROFILE_PICTURE_PATH, "rb") as default_image_file:
            default_image_content = default_image_file.read()
            with open(saved_image_path, "wb") as image_file:
                image_file.write(default_image_content)
        return {
            "message": "Image de profil par défaut enregistrée avec succès.",
            "image_path": saved_image_path,
        }

    # Vérifier si l'extension du fichier est autorisée
    allowed_extensions = {"gif", "png", "jpg"}
    file_extension = file.filename.split(".")[-1]
    if file_extension not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail="Extensions de fichier non autorisées. Utilisez gif, png ou jpg.",
        )

    # Vérifier la taille de l'image (800x800 pixels maximum)
    if file.content_type not in ["image/gif", "image/png", "image/jpeg"]:
        raise HTTPException(status_code=400, detail="Formats d'image non autorisés.")
    if file.file.readable():
        image_content = file.file.read()
        # Obtenir les dimensions de l'image
        image_width, image_height = get_image_dimensions(image_content)
        if image_width > 800 or image_height > 800:
            raise HTTPException(
                status_code=400, detail="L'image ne doit pas dépasser 800x800 pixels."
            )

        # Enregistrer l'image dans le dossier de stockage des images de profil
        saved_image_path = os.path.join(PROFILE_IMAGES_DIR, f"{user_token}.jpg")
        with open(saved_image_path, "wb") as image_file:
            image_file.write(image_content)
        return {
            "message": "Image de profil enregistrée avec succès.",
            "image_path": saved_image_path,
        }

    raise HTTPException(
        status_code=500, detail="Erreur lors de la lecture du fichier image."
    )

@app.get("/picture/user/{user_id}")
async def get_profile_image(user_id: int):

    # Retrieve the user's token based on the provided user_id
    user_token = get_user_token_by_id(user_id)

    # Iterate through allowed image formats and check if the image file exists
    allowed_formats = ["jpg", "jpeg", "png", "gif"]
    for image_format in allowed_formats:
        image_path = os.path.join(PROFILE_IMAGES_DIR, f"{user_token}.{image_format}")
        if os.path.exists(image_path):
            # Return the image file as a response with appropriate media type
            media_type = f"image/{image_format}"
            return FileResponse(image_path, media_type=media_type)
        else:
        # If no custom picture exists, return the default profile picture
            return FileResponse(DEFAULT_PROFILE_PICTURE_PATH, media_type="image/jpeg")

    raise HTTPException(status_code=404, detail={"type": "user_error", "error": "Image de profil non trouvée"})

@app.post("/user/update/{user_id}", response_model=Union[user_update_admin, user_update_user])
async def update_user(user_id: int, item: Union[user_update_admin, user_update_user], jwt_token: dict = Depends(verify_jwt_token)):
    if jwt_token is None or "error" in jwt_token:
        raise HTTPException(status_code=401, detail="Jetons JWT non valides ou non fournis")

    # Vérifiez le rôle de l'utilisateur à partir du jeton JWT
    user_role = jwt_token.get("role", "")

    # Obtenez l'utilisateur à partir de la base de données
    user = get_user_by_id(user_id)

    if user:
        if user_role == "admin":
            query = text('UPDATE "user" SET mail = :mail, firstname = :firstname, lastname = :lastname, birthday_date = :birthday_date, address = :address, postal_code = :postal_code, age = :age, meta = Cast(:meta AS jsonb), registration_date = :registration_date, role = :role, departement = :departement WHERE id = :user_id RETURNING *')
        else:
            # If the user is not an admin, restrict the update fields
            query = text('UPDATE "user" SET mail = :mail, birthday_date = :birthday_date, address = :address, postal_code = :postal_code, age = :age, meta = Cast(:meta AS jsonb), registration_date = :registration_date, departement = :departement WHERE id = :user_id RETURNING *')
            if jwt_token.get("email") != user.mail or user_id != user.id:
                raise HTTPException(status_code=403, detail="Accès non autorisé pour la mise à jour de ce profil.")

        item_dict = item.dict()
        item_dict['meta'] = json.dumps(item_dict['meta'])

        values = {**item_dict, "user_id": user_id}

        with engine.begin() as conn:
            result = conn.execute(query, values)
            updated_user = result.fetchone()
            if not updated_user:
                raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
            return updated_user
    else:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")

@app.post("/user/password")
async def change_password(request: ChangePasswordRequest):

    # Obtenez l'utilisateur à partir de la base de données
    user = get_user_by_email(request.mail)
    
    if user:
        # Vérifiez si le mot de passe actuel est correct
        if hash_password(request.password, database_salt) != user.password:
            raise HTTPException(status_code=401, detail="Mot de passe actuel incorrect")

        # Vérifiez si les nouveaux mots de passe correspondent
        if request.new_password != request.repeat_new_password:
            raise HTTPException(status_code=400, detail="Les nouveaux mots de passe ne correspondent pas")

        # Mettez à jour le mot de passe de l'utilisateur
        new_password_hash = hash_password(request.new_password, database_salt)
        query = text('UPDATE "user" SET password = :new_password WHERE id = :user_id')
        with engine.begin() as conn:
            result = conn.execute(query, {"new_password": new_password_hash, "user_id": user.id})
        
        return {"message": "Mot de passe mis à jour avec succès"}
    else:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")

@app.post("/departement/create/", response_model=departement_create)
async def create_departement(item: departement_create, jwt_token: dict = Depends(verify_jwt_token)):    
    
    if jwt_token is None or "error" in jwt_token:
        raise HTTPException(status_code=401, detail="Jetons JWT non valides ou non fournis")

    # Vérifiez le rôle de l'utilisateur à partir du jeton JWT
    user_role = jwt_token.get("role", "")

    if user_role == "admin":
        query = text('INSERT INTO "departement" (name) VALUES (:name) RETURNING *')

        values = {
            "name": item.name
        }
        with engine.begin() as conn:
            result = conn.execute(query, values)
            return result.fetchone()
    else: 
        raise HTTPException(status_code=403, detail="Seul un manager ou un administrateur peut creer un departement")


@app.post("/departement/{id_departement}/users/add", response_model=List[Union[user_get_admin, user_get_user]])
async def add_users_to_departement(
    request: AddUsersToDepartementRequest,
    id_departement: int = Path(..., title="ID du département"),
    jwt_token: dict = Depends(verify_jwt_token)
):
    # Vérifiez si l'utilisateur a un rôle d'administrateur
    user_role = jwt_token.get("role", "")
    if user_role != "admin":
        raise HTTPException(status_code=403, detail="Seul un administrateur peut ajouter un utilisateur à un département")

    # Vérifiez si le département existe
    departement = get_departement_by_id(id_departement)
    if not departement:
        raise HTTPException(status_code=404, detail="Département non trouvé")

    # Ajoutez les utilisateurs au département
    added_users = []
    with engine.begin() as conn:
        for user_id in request.user_ids:
            # Vérifiez si l'utilisateur existe
            user = get_user_by_id(user_id)
            if user:
                # Vérifiez si l'utilisateur n'est pas déjà dans le département
                if departement.name not in user.departement:
                    # Ajoutez le département auquel l'utilisateur appartient
                    user.departement.append(departement.name)
                    # Enregistrez les modifications dans la base de données
                    query = text('UPDATE "user" SET departement = :departement WHERE id = :user_id')
                    values = {"departement": user.departement, "user_id": user_id}
                    conn.execute(query, values)
                    added_users.append(user)

    return added_users

@app.post("/departements/{id_departement}/users/remove", response_model=List[Union[user_get_user, user_get_admin]])
async def remove_users_from_departement(
    request: RemoveToDepartementRequest,
    id_departement: int = Path(..., title="ID du département"),
    jwt_token: dict = Depends(verify_jwt_token)
):
    # Vérifiez si l'utilisateur a un rôle d'administrateur
    user_role = jwt_token.get("role", "")
    if user_role != "admin":
        raise HTTPException(status_code=403, detail="Seul un administrateur peut retirer un utilisateur d'un département")

    # Vérifiez si le département existe
    departement = get_departement_by_id(id_departement)
    if not departement:
        raise HTTPException(status_code=404, detail="Département non trouvé")

    # Retirez les utilisateurs du département
    removed_users = []
    with engine.begin() as conn:
        for user_id in request.user_ids:
            # Vérifiez si l'utilisateur existe
            user = get_user_by_id(user_id)
            if user:
                # Vérifiez si l'utilisateur est dans le département
                if departement.name in user.departement:
                    # Retirez le département de la liste des départements de l'utilisateur
                    user.departement.remove(departement.name)
                    query = text('UPDATE "user" SET departement = :new_departement WHERE id = :user_id')
                    values = {"new_departement": user.departement, "user_id": user_id}
                    conn.execute(query, values)
                    removed_users.append(user)

    return removed_users

@app.get("/departements/{id_departement}/users", response_model=List[Union[AdminResponse, UserResponse]])
async def get_departement_users(id_departement: int, jwt_token: dict = Depends(verify_jwt_token)):
    if jwt_token is None or "error" in jwt_token:
        raise HTTPException(status_code=401, detail="Jetons JWT non valides ou non fournis")

    user_role = jwt_token.get("role", "")
    
    # Requête pour obtenir le nom du département à partir de l'ID du département
    query_get_departement_name = text('''
        SELECT name
        FROM departement
        WHERE id = :departement_id
    ''')

    with engine.connect() as conn:
        result = conn.execute(query_get_departement_name.bindparams(departement_id=id_departement))
        departement_name = result.scalar()

    if departement_name is None:
        raise HTTPException(status_code=404, detail="Département non trouvé")

    # Requête principale pour récupérer les utilisateurs en utilisant une jointure
    query_get_users = text('SELECT * FROM "user" u WHERE :departement_name = ANY(u.departement)')

    with engine.connect() as conn:
        result = conn.execute(query_get_users.bindparams(departement_name=departement_name))
        users = result.fetchall()

    user_list = []
    for row in users:
        departement_str = ', '.join(row.departement)
        user_dict = {
            "id": row.id,
            "mail": row.mail,
            "firstname": row.firstname,
            "lastname": row.lastname,
            "birthday_date": row.birthday_date,
            "address": row.address,
            "postal_code": row.postal_code,
            "age": row.age,
            "meta": row.meta,
            "registration_date": row.registration_date,
            "token": row.token,
            "role": row.role,
            "departement": [departement_str],
        }

        if user_role == "admin":
            user_list.append(AdminResponse(**user_dict))
        else:
            user_list.append(UserResponse(**user_dict))

    return user_list

@app.post("/rh/msg/add", response_model=RequestRHCreate)
async def create_rh_request(item: RequestRHCreate, jwt_token: dict = Depends(verify_jwt_token)):
    if jwt_token is None or "error" in jwt_token:
        raise HTTPException(status_code=401, detail="Jetons JWT non valides ou non fournis")
    
    user = get_user_by_id(item.id_user)
    if user:

        last_action = registration_date

        initial_content = [
            {
            "author": item.id_user,
            "content": item.content,
            "date": registration_date.isoformat()
            }
        ]

        query = text('INSERT INTO "RequestRH" (id_user, registration_date, visibility, close, last_action, content) VALUES (:id_user, :registration_date, :visibility, :close, :last_action, :content) RETURNING *')

        values = {
            "id_user": item.id_user,
            "registration_date": registration_date,
            "visibility": True,
            "close": False,
            "last_action": last_action,
            "content": json.dumps(initial_content)
        }

        with engine.begin() as conn:
            result = conn.execute(query, values)
            response_data = result.fetchone()
    
            return RequestRHCreate(id_user=item.id_user, content=item.content)
    else:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")

@app.post("/rh/msg/remove")
async def remove_rh_request(item: RequestRHRemove, jwt_token: dict = Depends(verify_jwt_token)):
    if jwt_token is None or "error" in jwt_token:
        raise HTTPException(status_code=401, detail="Jetons JWT non valides ou non fournis")

    user_role = jwt_token.get("role", "")
    if user_role != "admin" and user_role != "manager":
        raise HTTPException(status_code=403, detail="Seul un administrateur ou un manager peut cloturer une demande RH")
    
    existing_request = get_request_by_id(item.id)
    if not existing_request:
        raise HTTPException(status_code=404, detail="Demande RH non trouvée")

    query = text('UPDATE "RequestRH" SET visibility = :visibility, close = :close, delete_date = :delete_date, last_action = :last_action WHERE id = :id')

    values = {
        "id": item.id,
        "visibility": False,
        "close": True,
        "delete_date": datetime.now(),
        "last_action": datetime.now(),
    }

    with engine.begin() as conn:
        conn.execute(query, values)

    return {"message": "Demande RH supprimée avec succès"}

@app.post("/rh/msg/update", response_model=RequestRHCreate)
async def update_rh_request(item: RequestRHCreate, jwt_token: dict = Depends(verify_jwt_token)):
    if jwt_token is None or "error" in jwt_token:
        raise HTTPException(status_code=401, detail="Jetons JWT non valides ou non fournis")

    # Récupérez l'utilisateur par ID
    user = get_user_by_id(item.id_user)

    if user:
        last_action = datetime.now()
        
        # Récupérez la demande RH existante
        existing_request = get_request_by_id(item.id_user)

        # Créez un nouveau contenu pour la demande RH
        new_content = {
            "author": item.id_user,
            "content": item.content,
            "date": last_action.isoformat()
        }

        # Si la demande RH existe, mettez à jour son contenu
        if existing_request:
            existing_content = existing_request.content
            existing_content.append(new_content)

            # Conversion de existing_content en chaine JSON
            existing_content_json = json.dumps(existing_content)
            # Mettez à jour la demande RH existante en base de données
            update_query = text('UPDATE "RequestRH" SET last_action = :last_action, content = :content WHERE id = :id')

            update_values = {
                "id": item.id_user,
                "last_action": last_action,
                "content": existing_content_json
            }

            with engine.begin() as conn:
                conn.execute(update_query, update_values)
                return RequestRHCreate(id_user=item.id_user, content=item.content)

        # Si la demande RH n'existe pas
        else:
            raise HTTPException(status_code=404, detail="Demande RH non trouvée")

    else:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")

@app.get("/rh/msg", response_model=RequestRHGetResponse)
async def get_rh_requests(jwt_token: dict = Depends(verify_jwt_token)):
    if jwt_token is None or "error" in jwt_token:
        raise HTTPException(status_code=401, detail="Jetons JWT non valides ou non fournis")

    user_role = jwt_token.get("role", "")

    if user_role != "manager" and user_role != "admin":
        raise HTTPException(status_code=403, detail="Seul un administrateur ou un manager peut récupérer les différentes demandes RH")

    query = text('''
        SELECT r.id, r.id_user, r.content, r.registration_date, r.visibility, r.close, r.last_action, r.delete_date 
        FROM "RequestRH" r
        INNER JOIN "user" u ON r.id_user = u.id
    ''')

    with engine.connect() as conn:
        result = conn.execute(query)
        requests = result.fetchall()

    # Convertir les objets Row en dictionnaires
    request_list = []
    for row in requests:
        if isinstance(row.content, list):
            content_json = row.content
        else:
            content_json = json.loads(row.content)

        request_dict = {
            "id": row.id,
            "id_user": row.id_user,
            "content": content_json,
            "registration_date": row.registration_date,
            "visibility": row.visibility,
            "close": row.close,
            "last_action": row.last_action,
            "delete_date": row.delete_date
        }
        request_list.append(RequestRHGet(**request_dict))

    return RequestRHGetResponse(requests=request_list)
