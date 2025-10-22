from sqlalchemy import Column, Integer, String, Text, Enum, ForeignKey
from sqlalchemy.orm import relationship
from database.database import Base
import enum

class CourseTypeEnum(str, enum.Enum):
    free = "free"
    paid = "paid"

class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    duration = Column(Integer, nullable=False)   # number of days
    type = Column(Enum(CourseTypeEnum), nullable=False, default=CourseTypeEnum.free)
    price = Column(String(100), nullable=True)
    image = Column(String(255), nullable=True)  # ✅ Added image field

    modules = relationship("Module", back_populates="course", cascade="all, delete-orphan")
    # enrollments = relationship("Enrollment", back_populates="course", cascade="all, delete-orphan")
    assignments = relationship("Assignment", back_populates="course", cascade="all, delete-orphan")
    # submissions = relationship("Submission", back_populates="student")
    enrollments = relationship("Enrollment", back_populates="course", cascade="all, delete-orphan")
    
    



class Module(Base):
    __tablename__ = "modules"

    id = Column(Integer, primary_key=True, index=True)
    day = Column(Integer, nullable=False)
    course_id = Column(Integer, ForeignKey("courses.id", ondelete="CASCADE"), nullable=False)

    course = relationship("Course", back_populates="modules")
    submodules = relationship("Submodule", back_populates="module", cascade="all, delete-orphan")


# class Submodule(Base):
#     __tablename__ = "submodules"

#     id = Column(Integer, primary_key=True, index=True)
#     title = Column(String(255), nullable=False)
#     link = Column(Text, nullable=False)
#     module_id = Column(Integer, ForeignKey("modules.id", ondelete="CASCADE"), nullable=False)

#     module = relationship("Module", back_populates="submodules")


class Submodule(Base):
    __tablename__ = "submodules"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    link = Column(Text, nullable=True)  # ✅ make this optional
    content = Column(Text, nullable=True)  # ✅ new field for text notes
    module_id = Column(Integer, ForeignKey("modules.id", ondelete="CASCADE"), nullable=False)

    module = relationship("Module", back_populates="submodules")
