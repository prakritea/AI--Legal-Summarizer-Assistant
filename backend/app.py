from fastapi import FastAPI, HTTPException, Depends, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from fastapi.responses import JSONResponse
import shutil
import os

from models import Base, User, Summary  # ✅ includes Summary model
from model_pipeline import process_pdf_and_summarize  # ✅ match actual function
from auth.auth import router as auth_router
from auth.auth import get_db  # ✅ use single definition

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # Allow your frontend's origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include auth routes (signup/login)
app.include_router(auth_router)

# CORS for frontend (Builder.io or localhost)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database setup
DATABASE_URL = "sqlite:///./users.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine, autoflush=False)
Base.metadata.create_all(bind=engine)

# ✅ Login route
def login(email: str = Form(...), password: str = Form(...), db: Session = Depends(get_db)):
    try:
        user = authenticate_user(db, email, password)
        if not user:
            raise HTTPException(status_code=401, detail="Invalid credentials")

        return {"message": "Login successful", "user_id": user.id}
    except Exception as e:
        print("🔥 Login Error:", e)
        raise HTTPException(status_code=500, detail="Internal Server Error")

# ✅ File upload + summarize PDF
@app.post("/summarize")
def summarize(file: UploadFile = File(...), user_id: int = Form(...), db: Session = Depends(get_db)):
    uploads_dir = "backend/uploads"
    os.makedirs(uploads_dir, exist_ok=True)
    file_path = os.path.join(uploads_dir, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        summary_text, sources = process_pdf_and_summarize(file_path)

        new_summary = Summary(filename=file.filename, summary=summary_text, user_id=user_id)
        db.add(new_summary)
        db.commit()
        db.refresh(new_summary)

        return {
            "summary": summary_text,
            "sources": sources,
            "summary_id": new_summary.id
        }
    except Exception as e:
        print("🔥 Summarization Error:", e)
        raise HTTPException(status_code=500, detail="Failed to process and summarize PDF.")

# ✅ Summary History
@app.get("/history/{user_id}")
def get_history(user_id: int, db: Session = Depends(get_db)):
    summaries = db.query(Summary).filter(Summary.user_id == user_id).order_by(Summary.uploaded_at.desc()).all()
    return [{"id": s.id, "result": s.summary, "timestamp": s.uploaded_at} for s in summaries]

