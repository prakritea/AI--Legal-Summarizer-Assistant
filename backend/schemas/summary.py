from pydantic import BaseModel
from datetime import datetime

class SummaryOut(BaseModel):
    id: int
    result: str
    timestamp: datetime

    class Config:
        orm_mode = True
