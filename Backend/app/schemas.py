from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

# Test Schemas
class Answer(BaseModel):
    question_id: int
    value: int  # 0, 1, 2, 3

class TestSubmission(BaseModel):
    test_type: str  # "PHQ-9" or "GAD-7"
    answers: List[Answer]

# Appointment Schemas
class AppointmentCreate(BaseModel):
    requested_date: datetime
    notes: Optional[str] = None