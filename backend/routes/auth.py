from fastapi import APIRouter, Depends, HTTPException, Cookie, Query,Request
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from fastapi.responses import JSONResponse
from jose import jwt, JWTError
from datetime import datetime, timedelta, timezone

from models import models

from  database import database
from  schemas import schemas

# AUTH ROUTER
router = APIRouter(prefix="/auth", tags=["Auth"])


# -------------------------------
# SIMPLE TEST ENDPOINT TO CHECK IF EVERYTHING IS WROKING
# -------------------------------
@router.post('/testing')
def testing():
    print('hello')





SECRET_KEY = "supersecret"    
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 3600

# PASSWORD HASHING CONFIGURATION ->HOW TO HASH PASSWORS
# -------------------------------
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")
def get_password_hash(password: str):
    return pwd_context.hash(password)
def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)


# # -------------------------------
# # SIGNUP ENDPOINT
# # -------------------------------
# @router.post('/signup')
# async def SignUp(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
#     db_user = db.query(models.User).filter(models.User.email == user.email).first()
#     if db_user:
#         raise HTTPException(status_code=400, detail="Email already registered")
#     hashed_password = get_password_hash(user.password)
#     new_user = models.User(
#         name=user.name,
#         email=user.email,
#         password_hash=hashed_password,
#         role='student',
#         created_at=datetime.utcnow()
#     )
#     db.add(new_user)
#     db.commit()
#     db.refresh(new_user)
#     return {"msg": "User created successfully"}



@router.post("/signin")
def signin(user: schemas.UserLogin, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Set token expiry
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    token_data = {
        "id": int(db_user.id),  
        "email": db_user.email,   
        "role": db_user.role,    
        "exp": int(expire.timestamp())
    }
    token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)
    # Attach token to response as cookie
    response = JSONResponse({"msg": "Login successful"})
    response.set_cookie(
    key="access_token",
    value=token,
    httponly=True,          # protects from JavaScript access (XSS)
    samesite="none",        # required if frontend + backend are on different domains
    secure=True,            # ensures cookie is sent only over HTTPS
    max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,  # lifetime in seconds
    expires=int(expire.timestamp()),           # exact expiry
    path="/",               # restricts cookie to your API path
    # domain="socialhub-backend-se80.onrender.com" # set this to your backend domain (or leave None on localhost)
)
    return response



@router.get("/session")
def check_session(request: Request):
    token = request.cookies.get("access_token")
    if not token:
        return {"authenticated": False}

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return {"authenticated": True, "user": payload}
    except:
        return {"authenticated": False}