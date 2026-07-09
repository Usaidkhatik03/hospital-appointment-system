from pydantic import BaseModel


class PatientCreate(BaseModel):

    fullName: str
    age: int
    gender: str
    phone: str
    email: str
    symptoms: str
    doctor: str
    appointmentDate: str
    appointmentTime: str


class AppointmentStatusUpdate(BaseModel):
    status: str