from sqlalchemy import Column, Integer, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from .models import Base

class Summary(Base):
    __tablename__ = "summaries"
    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text)
    result = Column(Text)
    timestamp = Column(DateTime, default=datetime.utcnow)

    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="summaries")
