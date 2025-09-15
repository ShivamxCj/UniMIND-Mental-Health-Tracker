from sqlalchemy import Column, Integer, String, DateTime, Text, JSON
from sqlalchemy.sql import func
from app.database import Base

class TestResult(Base):
    __tablename__ = "test_results"
    id = Column(Integer, primary_key=True, index=True)
    test_type = Column(String)  # 'PHQ-9' or 'GAD-7'
    score = Column(Integer)
    answers = Column(JSON)  # Store as JSON
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Appointment(Base):
    __tablename__ = "appointments"
    id = Column(Integer, primary_key=True, index=True)
    requested_date = Column(DateTime)
    notes = Column(Text)
    status = Column(String, default="requested")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class WellnessResource(Base):
    __tablename__ = "wellness_resources"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    resource_type = Column(String)
    link = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())