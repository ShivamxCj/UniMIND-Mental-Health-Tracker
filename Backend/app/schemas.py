from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime


# ---------- Test Schemas ----------
class TestResultBase(BaseModel):
    score: int
    test_type: str   # "PHQ-9" or "GAD-7"
    answers: dict    # JSON answers


class TestResultCreate(TestResultBase):
    pass


class TestResultOut(TestResultBase):
    id: int
    student_id: int
    created_at: datetime

    class Config:
        from_attributes = True  # replaces orm_mode=True in Pydantic v2


# ---------- Student Schemas ----------
class StudentBase(BaseModel):
    name: str
    email: EmailStr
    phone: str
    college: Optional[str] = "MANIT Bhopal"
    year: Optional[str] = "B.Tech"


class StudentCreate(StudentBase):
    pass


class StudentOut(StudentBase):
    id: int
    created_at: datetime
    tests: List[TestResultOut] = []

    class Config:
        from_attributes = True  # replaces orm_mode=True in Pydantic v2

class TestSubmission(BaseModel):
    test_type: str            # "PHQ-9" or "GAD-7"
    answers: dict             # JSON answers
    student_id: Optional[int] # if linked directly to a student

# ---------- Appointment Schemas ----------
class AppointmentBase(BaseModel):
    student_id: int
    consultant_id: int
    scheduled_at: datetime
    status: Optional[str] = "pending"  # pending, confirmed, cancelled


class AppointmentCreate(AppointmentBase):
    pass


class AppointmentOut(AppointmentBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True


# ---------- Report Schema ----------
class StudentReport(BaseModel):
    student: StudentOut
    report: str
