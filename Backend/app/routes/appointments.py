from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app import models, schemas

router = APIRouter()

# Get all appointments
@router.get("/")
def get_appointments(db: Session = Depends(get_db)):
    appointments = db.query(models.Appointment).all()
    return appointments

# Book a new appointment
@router.post("/book", status_code=status.HTTP_201_CREATED)
def book_appointment(
    appointment: schemas.AppointmentCreate,
    db: Session = Depends(get_db)
):
    db_appointment = models.Appointment(
        requested_date=appointment.requested_date,
        notes=appointment.notes,
        status="requested"
    )
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    
    return {
        "message": "Appointment requested successfully",
        "id": db_appointment.id
    }