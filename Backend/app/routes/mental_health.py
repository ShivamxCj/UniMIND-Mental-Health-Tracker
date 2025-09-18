from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app import models, schemas
from app.reports import generate_report

router = APIRouter()

# List students
@router.get("/students", response_model=list[schemas.StudentOut])
def list_students(db: Session = Depends(get_db)):
    return db.query(models.Student).all()


# Get student details + report
@router.get("/students/{student_id}", response_model=schemas.StudentReport)
def student_report(student_id: int, db: Session = Depends(get_db)):
    student = db.query(models.Student).filter(models.Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    report = generate_report(student, student.tests)
    return report


# Add a student
@router.post("/students", response_model=schemas.StudentOut)
def add_student(student: schemas.StudentCreate, db: Session = Depends(get_db)):
    new_student = models.Student(
        name=student.name,
        email=student.email,
        phone=student.phone,
        college=student.college,
        year=student.year,
    )
    db.add(new_student)
    db.commit()
    db.refresh(new_student)
    return new_student


# Add a test result
@router.post("/students/{student_id}/tests", response_model=schemas.TestResultOut)
def add_test(student_id: int, test: schemas.TestResultCreate, db: Session = Depends(get_db)):
    student = db.query(models.Student).filter(models.Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    new_test = models.TestResult(
        student_id=student_id,
        score=test.score,
        test_type=test.test_type,
        answers=test.answers
    )
    db.add(new_test)
    db.commit()
    db.refresh(new_test)
    return new_test
