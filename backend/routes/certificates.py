from fastapi import APIRouter, UploadFile, Form, HTTPException, Depends
from sqlalchemy.orm import Session
from database.database import get_db
from models.certificates import Certificate
from models.coursesModel import Course
from datetime import datetime
import cloudinary
import cloudinary.uploader
import os

router = APIRouter(prefix="/certificates", tags=["Certificates"])

# ✅ Configure Cloudinary
cloudinary.config(
    cloud_name="dvxcdjnst",
    api_key="175426423172199",
    api_secret="bJajtaEp6M0gfqw_Bc63dMw6gxs"
)

@router.get("/")
def get_certificates(db: Session = Depends(get_db)):
    return db.query(Certificate).all()

@router.get("/courses")
def get_courses(db: Session = Depends(get_db)):
    return db.query(Course).all()

@router.post("/upload")
async def upload_certificate(
    course_id: int = Form(...),
    db: Session = Depends(get_db),
    file: UploadFile = None
):
    if not file:
        raise HTTPException(status_code=400, detail="No file uploaded")

    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    try:
        # ✅ Upload to Cloudinary
        upload_result = cloudinary.uploader.upload(
            file.file,
            folder="certificates",
            resource_type="auto"
        )

        # ✅ Store course name instead of filename
        new_certificate = Certificate(
            course_id=course.id,
            course_name=course.title,
            file_url=upload_result["secure_url"],
            uploaded_at=datetime.utcnow(),
        )

        db.add(new_certificate)
        db.commit()
        db.refresh(new_certificate)

        return {"message": "Certificate uploaded successfully", "certificate": new_certificate}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
