# from fastapi import APIRouter, HTTPException, Form, Depends
# from passlib.context import CryptContext
# from sqlalchemy.orm import Session
# from model.models import User, SessionLocal

# router = APIRouter()

# # Password hashing
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# # Dependency
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# # Hash helpers
# def get_password_hash(password):
#     return pwd_context.hash(password)

# def verify_password(plain_password, hashed_password):
#     return pwd_context.verify(plain_password, hashed_password)

# # User login helper
# def authenticate_user(db: Session, email: str, password: str):
#     user = db.query(User).filter(User.email == email).first()
#     if not user or not verify_password(password, user.password_hash):
#         return None
#     return user

# # ✅ Signup route
# @router.post("/signup")
# def signup(email: str = Form(...), password: str = Form(...), db: Session = Depends(get_db)):
#     try:
#         existing_user = db.query(User).filter(User.email == email).first()
#         if existing_user:
#             raise HTTPException(status_code=400, detail="Email already registered")

#         hashed_password = get_password_hash(password)
#         new_user = User(email=email, password_hash=hashed_password)
#         db.add(new_user)
#         db.commit()
#         db.refresh(new_user)

#         return {"message": "User created successfully", "user_id": new_user.id}
#     except Exception as e:
#         print("🔥 Signup Error:", e)  # Print full error to terminal
#         raise HTTPException(status_code=500, detail="Internal Server Error")

# # ✅ Login route
# @router.post("/login")
# def login(email: str = Form(...), password: str = Form(...), db: Session = Depends(get_db)):
#     try:
#         user = authenticate_user(db, email, password)
#         if not user:
#             raise HTTPException(status_code=401, detail="Invalid credentials")

#         return {"message": "Login successful", "user_id": user.id}
#     except Exception as e:
#         print("🔥 Login Error:", e)
#         raise HTTPException(status_code=500, detail="Internal Server Error")



from fastapi import APIRouter, HTTPException, Form, Depends
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from model.models import User, SessionLocal

router = APIRouter()

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Password hash helpers
def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# User authentication
def authenticate_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.password_hash):
        return None
    return user

# ✅ Signup route
@router.post("/signup")
def signup(email: str = Form(...), password: str = Form(...), db: Session = Depends(get_db)):
    try:
        existing_user = db.query(User).filter(User.email == email).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")

        hashed_password = get_password_hash(password)
        new_user = User(email=email, password_hash=hashed_password)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return {"message": "User created successfully", "user_id": new_user.id}
    except Exception as e:
        print("🔥 Signup Error:", e)
        raise HTTPException(status_code=500, detail="Internal Server Error")

# ✅ Login route (fixed 401 placement)
@router.post("/login")
def login(email: str = Form(...), password: str = Form(...), db: Session = Depends(get_db)):
    user = authenticate_user(db, email, password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    try:
        return {"message": "Login successful", "user_id": user.id}
    except Exception as e:
        print("🔥 Login Error:", e)
        raise HTTPException(status_code=500, detail="Internal Server Error")
