from fastapi import APIRouter, UploadFile, File, Form, Depends
from sqlalchemy.orm import Session
from model.summary import Summary
from auth.auth import get_db
from model_pipeline import process_pdf_and_summarize
import os, shutil

router = APIRouter()

@router.post("/summarize")
def summarize(file: UploadFile = File(...), user_id: int = Form(...), db: Session = Depends(get_db)):
    uploads_dir = "backend/uploads"
    os.makedirs(uploads_dir, exist_ok=True)
    file_path = os.path.join(uploads_dir, file.filename)

    # Save file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Use your actual LangChain RAG pipeline
    summary_text, sources = process_pdf_and_summarize(file_path)

    # Store summary in DB (you can save sources too if desired)
    with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    summary = Summary(content=content[:1000], result=summary_text, user_id=user_id)  # Optional: truncate raw PDF
    db.add(summary)
    db.commit()

    return {
        "summary": summary_text,
        "sources": sources
    }
