from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from database.database import Base
from datetime import datetime

class Certificate(Base):
    __tablename__ = "certificates"

    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.id", ondelete="SET NULL"), nullable=False)
    course_name = Column(String(255), nullable=False)  # ✅ added this field
    file_url = Column(String(1024), nullable=False)
    uploaded_at = Column(DateTime, default=datetime.utcnow)

    course = relationship("Course", backref="certificates")
