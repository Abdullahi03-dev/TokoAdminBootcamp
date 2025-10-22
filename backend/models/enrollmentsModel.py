# from sqlalchemy import Column, Integer, ForeignKey, String, DateTime, func
# from sqlalchemy.orm import relationship
# from database.database import Base

# class Enrollment(Base):
#     __tablename__ = "enrollments"

#     id = Column(Integer, primary_key=True, index=True)
#     user_id = Column(Integer, ForeignKey("users.id"))
#     course_id = Column(Integer, ForeignKey("courses.id"))
#     status = Column(String, default="active")  # active | completed
#     enrolled_at = Column(DateTime(timezone=True), default=func.now())

#     user = relationship("User", back_populates="enrollments")
#     course = relationship("Course", back_populates="enrollments")


from sqlalchemy import Column, Integer, ForeignKey, String, DateTime, func
from sqlalchemy.orm import relationship
from database.database import Base

class Enrollment(Base):
    __tablename__ = "enrollments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    course_id = Column(Integer, ForeignKey("courses.id", ondelete="CASCADE"))
    status = Column(String, default="active")  # active | completed
    enrolled_at = Column(DateTime(timezone=True), default=func.now())

    user = relationship("User", back_populates="enrollments")
    course = relationship("Course", back_populates="enrollments")
