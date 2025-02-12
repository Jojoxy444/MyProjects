import pytest
import src.models as models

from sqlalchemy.orm import Session
from src.tests import engine

from src.database import Base
from src.utils.webtokens import hash_password


class Dataset:
    def __init__(self):
        Base.metadata.drop_all(bind=engine)
        Base.metadata.create_all(bind=engine)
        self.session: Session = Session(bind=engine)

    def create_user(self, username: str, password: str):
        user = models.Users(username=username, password=hash_password(password))
        user.__setattr__("password_nonhashed", password)
        self.session.add(user)
        return user

    def create_department(self, name: str):
        department = models.Department(name=name)
        self.session.add(department)
        self.session.commit()
        return department


@pytest.fixture
def dataset():
    ds = Dataset()

    # Creating multiple users for testing
    ds.user_1 = ds.create_user(username="user1", password="00agh!&à")
    ds.user_2 = ds.create_user(username="user2", password="Pa$$w0rd")
    ds.user_3 = ds.create_user(username="user3", password="12345")

    ds.session.commit()
    return ds
