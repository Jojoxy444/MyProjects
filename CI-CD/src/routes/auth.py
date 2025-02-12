from fastapi import APIRouter, Depends, Request, Response
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field

import src.models as models
import src.utils.exceptions as exceptions
from src.middlewares.auth import auth_required
from src.utils.webtokens import (
    create_access_token,
    retrieve_access_token,
    verify_password,
    hash_password,
)
from src.database import get_db


router = APIRouter()


class AuthenticateModel(BaseModel):
    username: str
    password: str


class CreateUserModel(BaseModel):
    username: str = Field(..., min_length=3, max_length=255)
    password: str


@router.post("/register", status_code=201)
def register(body: CreateUserModel, db: Session = Depends(get_db)):
    user = db.query(models.Users).filter(models.Users.username == body.username).first()
    if user is not None:
        raise exceptions.conflict()

    db.add(models.Users(username=body.username, password=hash_password(body.password)))
    db.commit()


@router.post("/")
def authenticate(
    body: AuthenticateModel,
    request: Request,
    response: Response,
    db: Session = Depends(get_db),
):
    user = db.query(models.Users).filter(models.Users.username == body.username).first()

    if user is None:
        raise exceptions.notFound()

    if not verify_password(body.password, user.password):
        raise exceptions.permissionDenied()

    response.set_cookie(
        key="access_token", value=create_access_token(user), max_age=3600
    )


@router.delete("/", status_code=204)
@auth_required()
def logout(request: Request, response: Response):
    response.delete_cookie("access_token")
