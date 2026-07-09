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

    appointment_number = f"APT-{patient.patient_id:06d}"

    appointment = crud.create_appointment(

        db=db,

        appointment_number=appointment_number,

        patient_id=patient.patient_id,

        doctor_id=int(data.doctor),

        slot_id=int(data.appointmentTime),

        symptoms=data.symptoms

    )

    crud.book_slot(

        db,

        int(data.appointmentTime)

    )

    return {

        "message": "Appointment Booked Successfully",

        "appointment_number": appointment.appointment_number,

        "appointment_id": appointment.appointment_id

    }




@app.get("/doctors")
def get_doctors(
    db: Session = Depends(get_db)
):

    doctors = crud.get_all_doctors(db)

    return doctors


@app.get("/doctor-slots/{doctor_id}")
def get_doctor_slots(
    doctor_id: int,
    db: Session = Depends(get_db)
):

    slots = crud.get_available_slots(
        db,
        doctor_id
    )

    return slots


@app.get("/appointments")
def get_appointments(
    db: Session = Depends(get_db)
):

    appointments = crud.get_all_appointments(db)

    return appointments