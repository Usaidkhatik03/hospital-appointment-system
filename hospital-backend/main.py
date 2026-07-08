from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from schemas import PatientCreate

from fastapi import Depends
from sqlalchemy.orm import Session

from database import get_db
import crud

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Hospital AI Backend Running"}

@app.post("/appointment")
def create_appointment(
    data: PatientCreate,
    db: Session = Depends(get_db)
):

    patient = crud.get_patient_by_phone(
        db,
        data.phone
    )

    if patient is None:

        patient = crud.create_patient(
        db,
        data
    )

    return {
        "message": "Patient saved successfully",
        "patient_id": patient.patient_id
    }

@app.get("/doctors")
def get_doctors(
    db: Session = Depends(get_db)
):

    doctors = crud.get_all_doctors(db)

    return doctors