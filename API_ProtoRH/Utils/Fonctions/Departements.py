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

def get_departement_by_id(departement_id: int):
    query = text('SELECT * FROM "departement" WHERE id = :departement_id')
    values = {"departement_id": departement_id}
    with engine.connect() as conn:
        result = conn.execute(query, values)
        departement = result.fetchone()
        return departement