import subprocess, uvicorn
from fastapi import FastAPI, HTTPException, UploadFile, Depends, status, File, Path
from fastapi.security import OAuth2PasswordBearer
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

load_dotenv("protorh.env")
database_salt = os.getenv("salt")
database_host = os.getenv("DATABASE_HOST")
database_port = os.getenv("DATABASE_PORT")
database_name = os.getenv("DATABASE_NAME")
database_user = os.getenv("DATABASE_USER")
database_password = os.getenv("DATABASE_PASSWORD")
secret_key = os.getenv("SECRET_KEY")

DATABASE_URL = "postgresql://{user}:{password}@localhost/{database}".format(
    user=database_user,
    password=database_password,
    database=database_name
)

engine = create_engine(DATABASE_URL)
if not database_exists(engine.url):
    create_database(engine.url, template="template0")
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def calculate_age(birthday_date):
    if birthday_date:
        today = date.today()
        age = today.year - birthday_date.year - ((today.month, today.day) < (birthday_date.month, birthday_date.day))
        return age
    else:
        return None

def hash_password(password, sel):
    password_salt = (password + sel).encode()
    password_hashed = hashlib.md5(password_salt).hexdigest()
    return password_hashed

def hash_djb2(s):
    hash_value = 5381
    for char in s:
        hash_value = ((hash_value << 5) + hash_value) + ord(char)
    return hash_value

def generate_token(mail, firstname, lastname, sel):
    # Concaténez le mail, firstname, lastname, et sel en une seule chaîne
    data_to_hash = f"{mail}{firstname}{lastname}{sel}"
    # Calculez le hachage en utilisant la fonction djb2
    token = hash_djb2(data_to_hash)
    return token 

def gen_jwt_user(email: str, role="user", expiration_minutes=5):
    current_time = datetime.utcnow()
    expiration_time = current_time + timedelta(minutes=expiration_minutes)

    payload = {
        "email": email,
        "exp": expiration_time,
        "role": role
    }

    jwt_token = jwt.encode(payload, secret_key, algorithm="HS256")
    return jwt_token

def gen_jwt_manager(email: str, role="manager", expiration_minutes=5):
    current_time = datetime.utcnow()
    expiration_time = current_time + timedelta(minutes=expiration_minutes)

    payload = {
        "email": email,
        "exp": expiration_time,
        "role": role
    }

    jwt_token = jwt.encode(payload, secret_key, algorithm="HS256")
    return jwt_token

def gen_jwt_admin(email: str, role="admin", expiration_minutes=5):
    current_time = datetime.utcnow()
    expiration_time = current_time + timedelta(minutes=expiration_minutes)

    payload = {
        "email": email,
        "exp": expiration_time,
        "role": role
    }

    jwt_token = jwt.encode(payload, secret_key, algorithm="HS256")
    return jwt_token

def verify_jwt_token(jwt_token: str, algorithm="HS256"):
    try:
        decoded_token = jwt.decode(jwt_token, secret_key, algorithms=[algorithm])
        # Si la vérification réussit, la fonction retourne le contenu du jeton (payload)
        return decoded_token
    except jwt.ExpiredSignatureError:
        # Le jeton a expiré
        return {"error": "Jeton expiré"}
    except jwt.DecodeError:
        # Le jeton est invalide
        return {"error": "Jeton invalide"}
    except PyJWTError as error:
        # Gérer toutes les autres exceptions liées aux jetons JWT
        return {"error": str(error)}
    
def get_user_by_id(user_id: int):
    query = text('SELECT * FROM "user" WHERE id = :user_id')
    values = {"user_id": user_id}
    with engine.connect() as conn:
        result = conn.execute(query, values)
        user = result.fetchone()
        if user:
            return user
        else:
            raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
        
def get_mail_by_id(user_id: int):
    query = text('SELECT mail FROM "user" WHERE id = :user_id')
    values = {"user_id": user_id}
    with engine.connect() as conn:
        result = conn.execute(query, values)
        user = result.fetchone()
        if user:
            return user
        else:
            raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
        
def get_user_token_by_id(user_id: int):
    # Recuperer le token d'un utilisateur en fonction de son id 
    query = text('SELECT token FROM "user" WHERE id = :user_id')
    values = {"user_id": user_id}
    with engine.connect() as conn:
        result = conn.execute(query, values)
        user_token_row = result.fetchone()
        if user_token_row:
            user_token1 = str(user_token_row).replace("(", "")
            user_token_2 = user_token1.replace(")", "")
            user_token_3 = user_token_2.replace("'", "")
            user_token_final = user_token_3.replace(",", "")
            return user_token_final
        else:
            raise HTTPException(status_code=400, detail="Utilisateur non trouvé")

def get_user_by_email(email: str):
    query = text('SELECT * FROM "user" WHERE mail = :email')
    with engine.connect() as conn:
        result = conn.execute(query, {"email": email})
        user = result.fetchone()
        return user
    
def get_role_by_id(user_id: int):
    query = text('SELECT role FROM "user" WHERE id = :user_id')
    values = {"user_id": user_id}
    with engine.connect() as conn:
        result = conn.execute(query, values)
        user = result.scalar()
        if user:
            return user
        else:
            raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
        
def get_role_by_mail_and_password(mail: str, password: str):
    query = text('SELECT role FROM "user" WHERE mail = :mail AND password = :password')
    values = {"mail": mail, "password": hash_password(password, database_salt)}
    with engine.connect() as conn:
        result = conn.execute(query, values)
        role = result.scalar()
        if role:
            return role
        else:
            raise HTTPException(status_code=404, detail="Utilisateur non trouvé")