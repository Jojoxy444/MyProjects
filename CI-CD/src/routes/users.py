from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session

import src.models as models
import src.utils.exceptions as exceptions
from src.database import get_db
from src.middlewares.auth import auth_required

router = APIRouter()


@router.get("/{user_id}")
@auth_required()
def get_user(user_id: int, request: Request, db: Session = Depends(get_db)):
    user = db.query(models.Users).filter(models.Users.id == user_id).first()
    if user is None:
        raise exceptions.notFound()
    return user


@router.delete("/{user_id}", status_code=204)
@auth_required()
def delete_user(user_id: int, request: Request, db: Session = Depends(get_db)):
    user = db.query(models.Users).filter(models.Users.id == user_id).first()
    if user is None:
        raise exceptions.notFound()

    db.delete(user)
    db.commit()


@router.get("/", status_code=200)
@auth_required()
def get_all_users(request: Request, db: Session = Depends(get_db)):
    users = db.query(models.Users).all()
    return users
