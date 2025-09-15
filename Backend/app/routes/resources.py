from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app import models, schemas

router = APIRouter()

# Sample wellness resources
SAMPLE_RESOURCES = [
    {
        "id": 1,
        "title": "Breathing Exercises for Stress",
        "description": "Learn simple breathing techniques to reduce stress and anxiety",
        "resource_type": "article",
        "link": "/resources/breathing-exercises"
    },
    {
        "id": 2,
        "title": "Mindfulness Meditation Guide",
        "description": "A beginner's guide to mindfulness meditation practices",
        "resource_type": "video",
        "link": "/resources/mindfulness-meditation"
    },
    {
        "id": 3,
        "title": "Coping with Academic Pressure",
        "description": "Strategies to manage academic stress and maintain balance",
        "resource_type": "article",
        "link": "/resources/academic-pressure"
    },
    {
        "id": 4,
        "title": "Building Healthy Sleep Habits",
        "description": "Tips for improving sleep quality and establishing a routine",
        "resource_type": "article",
        "link": "/resources/sleep-habits"
    }
]

@router.get("/")
def get_wellness_resources(db: Session = Depends(get_db)):
    # For now, return sample resources
    return SAMPLE_RESOURCES