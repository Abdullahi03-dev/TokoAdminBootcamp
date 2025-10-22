from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from database.database import Base
from datetime import datetime

class Assignment(Base):
    __tablename__ = "assignments"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    # description = Column(Text, nullable=False)
    instructions = Column(Text, nullable=True)
    # due_date = Column(DateTime, default=datetime.utcnow)
    course_id = Column(Integer, ForeignKey("courses.id", ondelete="CASCADE"), nullable=False)

    # ✅ Optional if you assign to specific students
    # student_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=True)

    # ✅ Relationships
    course = relationship("Course", back_populates="assignments")
    submissions = relationship("Submission", back_populates="assignment", cascade="all, delete-orphan")

    # course = relationship("Course", back_populates="assignments")
    # student = relationship("User", back_populates="assignments")
    # submissions = relationship("Submission", back_populates="assignment", cascade="all, delete-orphan")
