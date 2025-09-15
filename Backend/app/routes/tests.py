from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app import models, schemas
from app.questions_data import PHQ9_QUESTIONS, GAD7_QUESTIONS

router = APIRouter()

# Wellness resources recommendations based on scores
WELLNESS_RESOURCES = {
    "minimal": [
        {"id": 1, "title": "Daily Mindfulness Practice", "type": "article", "link": "/resources/mindfulness", "tag": "optional"},
        {"id": 2, "title": "5-Minute Breathing Exercise", "type": "video", "link": "/resources/breathing", "tag": "optional"},
        {"id": 3, "title": "Maintaining Mental Wellness", "type": "article", "link": "/resources/wellness-tips", "tag": "optional"}
    ],
    "mild": [
        {"id": 4, "title": "Coping with Stress", "type": "article", "link": "/resources/stress-management", "tag": "recommended"},
        {"id": 5, "title": "Guided Meditation for Anxiety", "type": "video", "link": "/resources/meditation", "tag": "recommended"},
        {"id": 6, "title": "Building Healthy Habits", "type": "article", "link": "/resources/healthy-habits", "tag": "optional"},
        {"id": 7, "title": "Talk to a Counselor", "type": "action", "link": "/appointments", "tag": "optional"}
    ],
    "moderate": [
        {"id": 8, "title": "Understanding Depression", "type": "article", "link": "/resources/understanding-depression", "tag": "recommended"},
        {"id": 9, "title": "Cognitive Behavioral Techniques", "type": "video", "link": "/resources/cbt-techniques", "tag": "recommended"},
        {"id": 10, "title": "Crisis Management Strategies", "type": "article", "link": "/resources/crisis-management", "tag": "important"},
        {"id": 11, "title": "Consult a Mental Health Professional", "type": "action", "link": "/appointments", "tag": "recommended"}
    ],
    "severe": [
        {"id": 12, "title": "Immediate Support Resources", "type": "article", "link": "/resources/immediate-help", "tag": "important"},
        {"id": 13, "title": "Emergency Contact Information", "type": "article", "link": "/resources/emergency-contacts", "tag": "critical"},
        {"id": 14, "title": "Urgent Professional Help", "type": "action", "link": "/appointments", "tag": "recommended"}
    ]
}

def get_recommendations(severity_level):
    """Get wellness recommendations based on severity level"""
    return WELLNESS_RESOURCES.get(severity_level.lower(), [])

# Get PHQ-9 questions
@router.get("/phq9-questions")
def get_phq9_questions():
    return PHQ9_QUESTIONS

# Get GAD-7 questions
@router.get("/gad7-questions")
def get_gad7_questions():
    return GAD7_QUESTIONS

# Get all test results
@router.get("/results")
def get_test_results(db: Session = Depends(get_db)):
    results = db.query(models.TestResult).all()
    return results

# Submit a new test (PHQ-9 or GAD-7)
@router.post("/submit", status_code=status.HTTP_201_CREATED)
def submit_test(
    submission: schemas.TestSubmission,
    db: Session = Depends(get_db)
):
    # Calculate total score
    total_score = sum(answer.value for answer in submission.answers)

    # Store the test result in the database
    db_test_result = models.TestResult(
        test_type=submission.test_type,
        score=total_score,
        answers=[a.dict() for a in submission.answers]
    )
    db.add(db_test_result)
    db.commit()
    db.refresh(db_test_result)

    # Determine severity based on score
    severity = ""
    severity_level = ""
    
    if submission.test_type == "PHQ-9":
        if total_score >= 0 and total_score <= 4:
            severity = "Minimal depression"
            severity_level = "minimal"
        elif total_score <= 9:
            severity = "Mild depression"
            severity_level = "mild"
        elif total_score <= 14:
            severity = "Moderate depression"
            severity_level = "moderate"
        elif total_score <= 19:
            severity = "Moderately severe depression"
            severity_level = "moderate"
        else:
            severity = "Severe depression"
            severity_level = "severe"
    else:  # GAD-7
        if total_score >= 0 and total_score <= 4:
            severity = "Minimal anxiety"
            severity_level = "minimal"
        elif total_score <= 9:
            severity = "Mild anxiety"
            severity_level = "mild"
        elif total_score <= 14:
            severity = "Moderate anxiety"
            severity_level = "moderate"
        else:
            severity = "Severe anxiety"
            severity_level = "severe"

    # Get recommendations based on severity
    recommendations = get_recommendations(severity_level)

    return {
        "message": f"{submission.test_type} test submitted successfully.",
        "score": total_score,
        "severity": severity,
        "severity_level": severity_level,
        "recommendations": recommendations,
        "id": db_test_result.id
    }