from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import tests, appointments, resources
from app.database import engine, Base

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AetherMinds API", version="1.0.0")

# Configure CORS
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers (no auth router)
app.include_router(tests.router, prefix="/tests", tags=["Mental Health Tests"])
app.include_router(appointments.router, prefix="/appointments", tags=["Appointments"])
app.include_router(resources.router, prefix="/resources", tags=["Wellness Resources"])

@app.get("/")
def root():
    return {"message": "Welcome to AetherMinds API - No Authentication Mode"}