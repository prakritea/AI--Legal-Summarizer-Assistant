from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from auth.auth import get_db
from model.summary import Summary
from schemas.summary import SummaryOut

router = APIRouter()

@router.get("/history/{user_id}", response_model=list[SummaryOut])
def get_history(user_id: int, db: Session = Depends(get_db)):
    return db.query(Summary).filter(Summary.user_id == user_id).all()
