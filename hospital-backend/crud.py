from sqlalchemy.orm import Session
from models import Patient
from models import Doctor
from models import DoctorSlot
from models import Appointment

def create_patient(db: Session, data):

    patient = Patient(
        full_name=data.fullName,
        age=data.age,
        gender=data.gender,
        phone=data.phone,
        email=data.email
    )

    db.add(patient)
    db.commit()
    db.refresh(patient)

    return patient

def get_patient_by_phone(db: Session, phone: str):

    return db.query(Patient).filter(
        Patient.phone == phone
    ).first()


def get_all_doctors(db: Session):

    return db.query(Doctor).all()


def get_available_slots(db: Session, doctor_id: int):

    return (
        db.query(DoctorSlot)
        .filter(
            DoctorSlot.doctor_id == doctor_id,
            DoctorSlot.is_booked == False
        )
        .all()
    )


def create_appointment(
    db: Session,
    appointment_number,
    patient_id,
    doctor_id,
    slot_id,
    symptoms
):

    appointment = Appointment(

        appointment_number=appointment_number,

        patient_id=patient_id,

        doctor_id=doctor_id,

        slot_id=slot_id,

        symptoms=symptoms,

        appointment_status="Confirmed"

    )

    db.add(appointment)

    db.commit()

    db.refresh(appointment)

    return appointment


def book_slot(db: Session, slot_id: int):

    slot = db.query(DoctorSlot).filter(
        DoctorSlot.slot_id == slot_id
    ).first()

    if slot:

        slot.is_booked = True

        db.commit()

    return slot



def get_all_appointments(db: Session):

    return db.query(Appointment).all()