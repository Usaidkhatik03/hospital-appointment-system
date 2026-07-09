from sqlalchemy import Column, Integer, String,Date,Time,Boolean
from database import Base

class Patient(Base):

    __tablename__ = "patients"

    patient_id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String(100))

    age = Column(Integer)

    gender = Column(String(20))

    phone = Column(String(15), unique=True)

    email = Column(String(100))
    

class Doctor(Base):

    __tablename__ = "doctors"

    doctor_id = Column(Integer, primary_key=True, index=True)

    doctor_name = Column(String(100))

    specialization = Column(String(100))

    consultation_fee = Column(Integer)


class DoctorSlot(Base):

    __tablename__ = "doctor_slots"

    slot_id = Column(Integer, primary_key=True, index=True)

    doctor_id = Column(Integer)

    appointment_date = Column(Date)

    slot_time = Column(Time)

    is_booked = Column(Boolean)


class Appointment(Base):

    __tablename__ = "appointments"

    appointment_id = Column(Integer, primary_key=True, index=True)

    appointment_number = Column(String(30))

    patient_id = Column(Integer)

    doctor_id = Column(Integer)

    slot_id = Column(Integer)

    symptoms = Column(String(500))

    appointment_status = Column(String(50))