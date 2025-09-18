from sqlalchemy import Column, Integer, String, DateTime, Text, JSON, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base


class Student(Base):
    __tablename__ = "students"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True)
    phone = Column(String, unique=True)
    college = Column(String, default="MANIT Bhopal")
    year = Column(String, default="B.Tech")

    # Relationship to tests
    tests = relationship("TestResult", back_populates="student", cascade="all, delete-orphan")


class TestResult(Base):
    __tablename__ = "test_results"
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id", ondelete="CASCADE"))
    test_type = Column(String)  # 'PHQ-9' or 'GAD-7'
    score = Column(Integer)
    answers = Column(JSON)  # Store as JSON
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    student = relationship("Student", back_populates="tests")


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
