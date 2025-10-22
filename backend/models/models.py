from sqlalchemy import Column, Integer, String,DateTime,func,Text,ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from database.database import Base

# -------------------------
# User Model
# -------------------------

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    # bio=Column(String)
    role=Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    enrollments = relationship("Enrollment", back_populates="user", cascade="all, delete-orphan")
    submissions = relationship("Submission", back_populates="student", cascade="all, delete-orphan")  # ✅ ADD THIS BACK
    # assignments = relationship("Assignment", back_populates="student")
    # submissions = relationship("Submission", back_populates="student")

 
    # user_posts = relationship("Post", back_populates="user")
    # likes_id = relationship("PostLike", back_populates="user")
