from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from database import database
from models.models import User
from models.enrollmentsModel import Enrollment
from models.coursesModel import Course

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.get("/students")
def get_all_students(db: Session = Depends(database.get_db)):
    try:
        # Fetch all students (users with role = student)
        students = db.query(User).filter(User.role == "student").all()

        result = []
        for student in students:
            # Get all enrollments for this student
            enrollments = (
                db.query(Enrollment)
                .join(Course, Course.id == Enrollment.course_id)
                .filter(Enrollment.user_id == student.id)
                .all()
            )

            enrolled_courses = [
                {
                    "id": e.course_id,
                    "title": db.query(Course.title).filter(Course.id == e.course_id).scalar(),
                    "status": e.status,
                }
                for e in enrollments
            ]

            # Determine student overall status (if any completed course exists)
            overall_status = (
                "completed"
                if any(e.status == "completed" for e in enrollments)
                else "active" if enrollments else "inactive"
            )

            result.append({
                "id": student.id,
                "name": student.name,
                "email": student.email,
                "courses": [c["title"] for c in enrolled_courses],
                "status": overall_status,
            })

        return {"students": result}
    except Exception as e:
        print("❌ ERROR in get_all_students:", str(e))
        raise HTTPException(status_code=500, detail=f"Error fetching students: {str(e)}")
