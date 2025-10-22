# from fastapi import APIRouter, HTTPException, Depends
# from sqlalchemy.orm import Session
# from sqlalchemy import Column, Integer, String, DateTime
# from datetime import datetime
# from pydantic import BaseModel
# from database.database import get_db, Base

# router = APIRouter(prefix="/announcements", tags=["Announcements"])

# # 🧱 MODEL
# class Announcement(Base):
#     __tablename__ = "announcements"

#     id = Column(Integer, primary_key=True, index=True)
#     title = Column(String(255), nullable=False)
#     description = Column(String, nullable=False)
#     link = Column(String(255), nullable=True)
#     date = Column(DateTime, default=datetime.utcnow)

# # 🧾 SCHEMAS
# class AnnouncementBase(BaseModel):
#     title: str
#     description: str
#     link: str | None = None

# class AnnouncementCreate(AnnouncementBase):
#     pass

# class AnnouncementUpdate(AnnouncementBase):
#     pass

# class AnnouncementResponse(AnnouncementBase):
#     id: int
#     date: datetime
#     class Config:
#         orm_mode = True

# # 🚀 CREATE ANNOUNCEMENT
# @router.post("/", response_model=AnnouncementResponse)
# def create_announcement(data: AnnouncementCreate, db: Session = Depends(get_db)):
#     new_announcement = Announcement(**data.dict())
#     db.add(new_announcement)
#     db.commit()
#     db.refresh(new_announcement)
#     return new_announcement

# # 📜 GET ALL ANNOUNCEMENTS
# @router.get("/", response_model=list[AnnouncementResponse])
# def get_announcements(db: Session = Depends(get_db)):
#     return db.query(Announcement).order_by(Announcement.date.desc()).all()

# # 🧩 UPDATE ANNOUNCEMENT
# @router.put("/{announcement_id}", response_model=AnnouncementResponse)
# def update_announcement(announcement_id: int, data: AnnouncementUpdate, db: Session = Depends(get_db)):
#     announcement = db.query(Announcement).filter(Announcement.id == announcement_id).first()
#     if not announcement:
#         raise HTTPException(status_code=404, detail="Announcement not found")
    
#     announcement.title = data.title
#     announcement.description = data.description
#     announcement.link = data.link
#     db.commit()
#     db.refresh(announcement)
#     return announcement

# # ❌ DELETE ANNOUNCEMENT
# @router.delete("/{announcement_id}")
# def delete_announcement(announcement_id: int, db: Session = Depends(get_db)):
#     announcement = db.query(Announcement).filter(Announcement.id == announcement_id).first()
#     if not announcement:
#         raise HTTPException(status_code=404, detail="Announcement not found")

#     db.delete(announcement)
#     db.commit()
#     return {"message": "Announcement deleted successfully"}




from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime
from pydantic import BaseModel
from database.database import get_db, Base
from models.coursesModel import Course  # make sure this path matches your setup

router = APIRouter(prefix="/announcements", tags=["Announcements"])

# 🧱 MODEL
class Announcement(Base):
    __tablename__ = "announcements"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(String, nullable=False)
    link = Column(String(255), nullable=True)
    date = Column(DateTime, default=datetime.utcnow)
    course_id = Column(Integer, ForeignKey("courses.id", ondelete="CASCADE"), nullable=False)

# 🧾 SCHEMAS
class AnnouncementBase(BaseModel):
    title: str
    description: str
    link: str | None = None
    course_id: int

class AnnouncementCreate(AnnouncementBase):
    pass

class AnnouncementUpdate(BaseModel):
    title: str
    description: str
    link: str | None = None

class AnnouncementResponse(AnnouncementBase):
    id: int
    date: datetime

    model_config = {
        "from_attributes": True
    }

# 🚀 CREATE ANNOUNCEMENT
@router.post("/", response_model=AnnouncementResponse)
def create_announcement(data: AnnouncementCreate, db: Session = Depends(get_db)):
    # Ensure course exists
    course = db.query(Course).filter(Course.id == data.course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    new_announcement = Announcement(**data.dict())
    db.add(new_announcement)
    db.commit()
    db.refresh(new_announcement)
    return new_announcement

# 📜 GET ALL ANNOUNCEMENTS (OPTIONAL COURSE FILTER)
@router.get("/", response_model=list[AnnouncementResponse])
def get_announcements(course_id: int | None = None, db: Session = Depends(get_db)):
    query = db.query(Announcement)
    if course_id:
        query = query.filter(Announcement.course_id == course_id)
    return query.order_by(Announcement.date.desc()).all()

# 🧩 UPDATE ANNOUNCEMENT
@router.put("/{announcement_id}", response_model=AnnouncementResponse)
def update_announcement(announcement_id: int, data: AnnouncementUpdate, db: Session = Depends(get_db)):
    announcement = db.query(Announcement).filter(Announcement.id == announcement_id).first()
    if not announcement:
        raise HTTPException(status_code=404, detail="Announcement not found")

    for field, value in data.dict().items():
        setattr(announcement, field, value)
    db.commit()
    db.refresh(announcement)
    return announcement

# ❌ DELETE ANNOUNCEMENT
@router.delete("/{announcement_id}")
def delete_announcement(announcement_id: int, db: Session = Depends(get_db)):
    announcement = db.query(Announcement).filter(Announcement.id == announcement_id).first()
    if not announcement:
        raise HTTPException(status_code=404, detail="Announcement not found")

    db.delete(announcement)
    db.commit()
    return {"message": "Announcement deleted successfully"}
