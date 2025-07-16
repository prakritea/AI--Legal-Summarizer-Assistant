from sqlalchemy import Column, Integer, String
from .models import Base
from .summary import Summary

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    summaries = relationship("Summary", back_populates="user")
