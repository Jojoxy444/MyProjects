from sqlalchemy import ForeignKey, Column, Integer, String
from sqlalchemy.orm import relationship
from src.database import Base


class Users(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)

    _files = relationship("UserHasFiles", viewonly=True)

    @property
    def files(self):
        return [object.file for object in self._files]


class Files(Base):
    __tablename__ = "files"

    id = Column(Integer, primary_key=True, index=True)
    label = Column(String(255), nullable=False)
    extension = Column(String(255), nullable=False)


class UserHasFiles(Base):
    __tablename__ = "user_has_files"

    user_id = Column(ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    file_id = Column(
        ForeignKey("files.id", ondelete="CASCADE"), primary_key=True, index=True
    )

    user = relationship("Users")
    file = relationship("Files")


class Department(Base):
    __tablename__ = "departments"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True, nullable=False)
