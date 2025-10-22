# routes/assignments.py
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from database.database import get_db
from models.AssignmentModel import Assignment
from models.SubmissionModel import Submission
from models.coursesModel import Course

router = APIRouter(prefix="/assignments", tags=["Assignments"])

# 🧾 Fetch all assignments
@router.get("/")
def get_all_assignments(db: Session = Depends(get_db)):
    try:
        assignments = db.query(Assignment).all()
        return {"assignments": assignments}
    except Exception as e:
        print("❌ Error fetching assignments:", str(e))
        raise HTTPException(status_code=500, detail="Error fetching assignments")


# 📚 Fetch all courses (for dropdown)
@router.get("/courses")
def get_courses(db: Session = Depends(get_db)):
    try:
        courses = db.query(Course.id, Course.title).all()
        return {"courses": [{"id": c.id, "title": c.title} for c in courses]}
    except Exception as e:
        print("❌ Error fetching courses:", str(e))
        raise HTTPException(status_code=500, detail="Error fetching courses")


# 📤 Fetch all submissions
@router.get("/submissions")
def get_all_submissions(db: Session = Depends(get_db)):
    try:
        submissions = db.query(Submission).all()
        return {"submissions": submissions}
    except Exception as e:
        print("❌ Error fetching submissions:", str(e))
        raise HTTPException(status_code=500, detail="Error fetching submissions")


# 📝 Create a new assignment
@router.post("/")
def create_assignment(
    course_id: int = Query(...),
    title: str = Query(...),
    instructions: str = Query(...),
    db: Session = Depends(get_db)
):
    try:
        # Ensure course exists
        course = db.query(Course).filter(Course.id == course_id).first()
        if not course:
            raise HTTPException(status_code=404, detail="Course not found")

        new_assignment = Assignment(course_id=course_id, title=title, instructions=instructions)
        db.add(new_assignment)
        db.commit()
        db.refresh(new_assignment)
        return {"message": "Assignment created successfully", "assignment": new_assignment}
    except Exception as e:
        print("❌ Error creating assignment:", str(e))
        raise HTTPException(status_code=500, detail="Error creating assignment")


# 🧮 Grade a submission
@router.put("/grade/{submission_id}")
def grade_submission(submission_id: int, grade: str, db: Session = Depends(get_db)):
    try:
        submission = db.query(Submission).filter(Submission.id == submission_id).first()
        if not submission:
            raise HTTPException(status_code=404, detail="Submission not found")

        submission.grade = grade
        db.commit()
        db.refresh(submission)
        return {"message": f"Submission graded as {grade}", "submission": submission}
    except Exception as e:
        print("❌ Error grading submission:", str(e))
        raise HTTPException(status_code=500, detail="Error grading submission")
