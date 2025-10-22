

# from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
# from sqlalchemy.orm import Session
# from typing import Optional, List
# import json
# import cloudinary.uploader

# from database.database import get_db
# import models.coursesModel
# import schemas.coursesSchema
# from cloudinary_config import cloudinary  # Your Cloudinary setup

# router = APIRouter(prefix="/courses", tags=["Courses"])

# # ✅ Get all courses
# @router.get("/", response_model=List[schemas.coursesSchema.CourseOut])
# def get_courses(db: Session = Depends(get_db)):
#     try:
#         courses = db.query(models.coursesModel.Course).all()
#         return courses
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Failed to retrieve courses: {str(e)}")


# # ✅ Get single course by ID
# @router.get("/{course_id}", response_model=schemas.coursesSchema.CourseOut)
# def get_course(course_id: int, db: Session = Depends(get_db)):
#     course = db.query(models.coursesModel.Course).filter(models.coursesModel.Course.id == course_id).first()
#     if not course:
#         raise HTTPException(status_code=404, detail="Course not found")
#     return course


# # ✅ Create new course with optional image & modules
# @router.post("/", response_model=schemas.coursesSchema.CourseOut)
# async def create_course(
#     title: str = Form(...),
#     description: str = Form(...),
#     duration: str = Form(...),
#     type: str = Form(...),
#     price: Optional[str] = Form(None),
#     modules: Optional[str] = Form(None),
#     image: Optional[UploadFile] = File(None),
#     db: Session = Depends(get_db),
# ):
#     try:
#         image_url = None

#         # 🔹 Upload image to Cloudinary
#         if image:
#             try:
#                 upload_result = cloudinary.uploader.upload(
#                     image.file,
#                     folder="courses",
#                     public_id=title.replace(" ", "_"),
#                     overwrite=True,
#                     resource_type="image"
#                 )
#                 image_url = upload_result.get("secure_url")
#             except Exception as e:
#                 raise HTTPException(status_code=500, detail=f"Image upload failed: {str(e)}")

#         # 🔹 Create course
#         new_course = models.coursesModel.Course(
#             title=title,
#             description=description,
#             duration=int(duration),
#             type=type,
#             price=price,
#             image=image_url,
#         )
#         db.add(new_course)
#         db.commit()
#         db.refresh(new_course)

#         # 🔹 Add modules and submodules if provided
#         if modules:
#             try:
#                 modules_data = json.loads(modules)
#                 for m in modules_data:
#                     module = models.coursesModel.Module(day=m["day"], course_id=new_course.id)
#                     db.add(module)
#                     db.commit()
#                     db.refresh(module)

#                     for s in m.get("submodules", []):
#                         sub = models.coursesModel.Submodule(
#                             title=s["title"],
#                             link=s["link"],
#                             module_id=module.id
#                         )
#                         db.add(sub)
#                 db.commit()
#             except json.JSONDecodeError:
#                 raise HTTPException(status_code=400, detail="Invalid JSON format in modules.")
#             except KeyError:
#                 raise HTTPException(status_code=400, detail="Missing 'day' or 'submodules' key in module data.")
#             except Exception as e:
#                 raise HTTPException(status_code=500, detail=f"Error saving modules: {str(e)}")

#         db.refresh(new_course)
#         return new_course

#     except HTTPException:
#         raise
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Unexpected error while creating course: {str(e)}")


# # ✅ Update course (with optional new image)
# @router.put("/{course_id}", response_model=schemas.coursesSchema.CourseOut)
# async def update_course(
#     course_id: int,
#     title: str = Form(...),
#     description: str = Form(...),
#     duration: str = Form(...),
#     type: str = Form(...),
#     price: Optional[str] = Form(None),
#     image: Optional[UploadFile] = File(None),
#     db: Session = Depends(get_db),
# ):
#     course = db.query(models.coursesModel.Course).filter(models.coursesModel.Course.id == course_id).first()
#     if not course:
#         raise HTTPException(status_code=404, detail="Course not found")

#     try:
#         # 🔹 Update Cloudinary image if new one uploaded
#         if image:
#             try:
#                 upload_result = cloudinary.uploader.upload(
#                     image.file,
#                     folder="courses",
#                     public_id=title.replace(" ", "_"),
#                     overwrite=True,
#                     resource_type="image"
#                 )
#                 course.image = upload_result.get("secure_url")
#             except Exception as e:
#                 raise HTTPException(status_code=500, detail=f"Image update failed: {str(e)}")

#         # 🔹 Update other fields
#         course.title = title
#         course.description = description
#         course.duration = int(duration)
#         course.type = type
#         course.price = price

#         db.commit()
#         db.refresh(course)
#         return course

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Failed to update course: {str(e)}")


# # ✅ Delete course (with Cloudinary cleanup)
# @router.delete("/{course_id}")
# def delete_course(course_id: int, db: Session = Depends(get_db)):
#     course = db.query(models.coursesModel.Course).filter(models.coursesModel.Course.id == course_id).first()
#     if not course:
#         raise HTTPException(status_code=404, detail="Course not found")

#     try:
#         db.delete(course)
#         db.commit()

#         # 🔹 Delete Cloudinary image (optional)
#         if course.image:
#             try:
#                 public_id = f"courses/{course.title.replace(' ', '_')}"
#                 cloudinary.uploader.destroy(public_id, resource_type="image")
#             except Exception as e:
#                 print(f"⚠️ Warning: Failed to delete image from Cloudinary: {e}")

#         return {"status": "success", "message": "Course deleted successfully"}

#     except Exception as e:
#         # Handle foreign key constraint errors gracefully
#         if "foreign key constraint fails" in str(e).lower():
#             raise HTTPException(
#                 status_code=400,
#                 detail="Cannot delete this course because one or more students are enrolled."
#             )
#         raise HTTPException(status_code=500, detail=f"Error deleting course: {str(e)}")

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import Optional, List
import json
import cloudinary.uploader
from database.database import get_db
import models.coursesModel
import schemas.coursesSchema
from cloudinary_config import cloudinary

router = APIRouter(prefix="/courses", tags=["Courses"])

# ✅ Get all courses
@router.get("/", response_model=List[schemas.coursesSchema.CourseOut])
def get_courses(db: Session = Depends(get_db)):
    try:
        return db.query(models.coursesModel.Course).all()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve courses: {str(e)}")

# ✅ Get single course
@router.get("/{course_id}", response_model=schemas.coursesSchema.CourseOut)
def get_course(course_id: int, db: Session = Depends(get_db)):
    course = db.query(models.coursesModel.Course).filter(models.coursesModel.Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course

# ✅ Create course
# ✅ Create course
@router.post("/", response_model=schemas.coursesSchema.CourseOut)
async def create_course(
    title: str = Form(...),
    description: str = Form(...),
    duration: str = Form(...),
    type: str = Form(...),
    price: Optional[str] = Form(None),
    modules: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
):
    try:
        image_url = None
        if image:
            upload = cloudinary.uploader.upload(
                image.file,
                folder="courses",
                public_id=title.replace(" ", "_"),
                overwrite=True,
                resource_type="image"
            )
            image_url = upload.get("secure_url")

        new_course = models.coursesModel.Course(
            title=title,
            description=description,
            duration=int(duration),
            type=type,
            price=price,
            image=image_url
        )
        db.add(new_course)
        db.commit()
        db.refresh(new_course)

        # ✅ Add modules/submodules
        if modules:
            modules_data = json.loads(modules)
            for m in modules_data:
                module = models.coursesModel.Module(day=m["day"], course_id=new_course.id)
                db.add(module)
                db.commit()
                db.refresh(module)

                for s in m.get("submodules", []):
                    sub = models.coursesModel.Submodule(
                        title=s["title"],
                        link=s.get("link"),
                        content=s.get("content", s.get("title")),  # 👈 Fallback to 'title' if 'content' missing
                        module_id=module.id
                    )
                    db.add(sub)
            db.commit()

        db.refresh(new_course)
        return new_course

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating course: {str(e)}")

# ✅ Update course
@router.put("/{course_id}", response_model=schemas.coursesSchema.CourseOut)
async def update_course(
    course_id: int,
    title: str = Form(...),
    description: str = Form(...),
    duration: str = Form(...),
    type: str = Form(...),
    price: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
):
    course = db.query(models.coursesModel.Course).filter(models.coursesModel.Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    try:
        if image:
            upload = cloudinary.uploader.upload(
                image.file,
                folder="courses",
                public_id=title.replace(" ", "_"),
                overwrite=True,
                resource_type="image"
            )
            course.image = upload.get("secure_url")

        course.title = title
        course.description = description
        course.duration = int(duration)
        course.type = type
        course.price = price

        db.commit()
        db.refresh(course)
        return course

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update course: {str(e)}")

# ✅ Delete course
@router.delete("/{course_id}")
def delete_course(course_id: int, db: Session = Depends(get_db)):
    course = db.query(models.coursesModel.Course).filter(models.coursesModel.Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    db.delete(course)
    db.commit()
    return {"status": "success", "message": "Course deleted successfully"}
