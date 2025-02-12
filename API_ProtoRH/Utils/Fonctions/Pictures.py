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

PROFILE_IMAGES_DIR = "assets/picture/profiles"

def save_profile_image(user_token: str, file_extension: str, file_content: bytes):
    # Chemin d'accès complet pour enregistrer l'image de profil
    image_path = os.path.join(PROFILE_IMAGES_DIR, f"{user_token}.{file_extension}")

    # Écrire les données binaires de l'image dans le fichier
    with open(image_path, "wb") as image_file:
        image_file.write(file_content)

    return image_path

def get_image_dimensions(image_content: bytes):
    """
    Get the dimensions (width and height) of an image from its binary content.

    Args:
        image_content (bytes): The binary content of the image.

    Returns:
        tuple: A tuple containing the width and height of the image.
    """
    with BytesIO(image_content) as image_stream:
        image = Image.open(image_stream)
        width, height = image.size
        return width, height