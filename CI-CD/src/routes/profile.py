from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.database import get_db
from src.models import Users
from src.schemas.user import UserCreate, UserUpdate

router = APIRouter()


@router.get("/{user_id}", response_model=UserCreate)
def read_user_profile(user_id: int, db: Session = Depends(get_db)):
    user = db.query(Users).filter(Users.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.put("/{user_id}", response_model=UserCreate)
def update_user_profile(
    user_id: int, user_update: UserUpdate, db: Session = Depends(get_db)
):
    db_user = db.query(Users).filter(Users.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")

    db_user.username = user_update.username
    db_user.password = user_update.password
    db.commit()
    db.refresh(db_user)
    return db_user
