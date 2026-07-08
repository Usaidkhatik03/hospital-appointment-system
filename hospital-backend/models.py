from sqlalchemy import Column, Integer, String
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