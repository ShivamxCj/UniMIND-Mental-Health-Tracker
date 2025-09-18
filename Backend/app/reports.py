from datetime import datetime

def categorize_score(score: int) -> str:
    if score <= 5:
        return "Good"
    elif score <= 10:
        return "Okay"
    elif score <= 15:
        return "Poor"
    else:
        return "Critical"


def generate_report(student, tests):
    if not tests:
        return {"status": "No tests taken yet", "trend": None, "details": []}

    # Sort tests by date
    tests_sorted = sorted(tests, key=lambda t: t.taken_at)

    details = []
    for t in tests_sorted:
        details.append({
            "score": t.score,
            "category": categorize_score(t.score),
            "taken_at": t.taken_at.strftime("%Y-%m-%d %H:%M"),
        })

    # Trend detection
    scores = [t.score for t in tests_sorted]
    trend = "Improving" if scores[-1] < scores[0] else "Declining" if scores[-1] > scores[0] else "Stable"

    return {
        "student": {
            "id": student.id,
            "name": student.name,
            "email": student.email,
            "phone": student.phone,
            "college": student.college,
            "year": student.year,
        },
        "trend": trend,
        "latest_status": categorize_score(scores[-1]),
        "details": details
    }
