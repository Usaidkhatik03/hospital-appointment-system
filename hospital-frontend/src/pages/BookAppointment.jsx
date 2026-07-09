import { useState } from "react";
import api from "../services/api";
import { useEffect } from "react";
import { getDoctors, getDoctorSlots } from "../services/api";

function BookAppointment() {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [doctor, setDoctor] = useState("");
  const [slots, setSlots] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    try {
      const response = await getDoctors();

      console.log(response.data);

      setDoctors(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ADD THIS
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchSlots = async (doctorId) => {
    try {
      const response = await getDoctorSlots(doctorId);

      console.log(response.data);

      setSlots(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation

    if (fullName.trim() === "") {
      alert("Please enter your full name");
      return;
    }

    if (age === "" || age <= 0) {
      alert("Please enter a valid age");
      return;
    }

    if (gender === "") {
      alert("Please select gender");
      return;
    }

    if (phone.length !== 10) {
      alert("Phone number must be 10 digits");
      return;
    }

    if (email === "") {
      alert("Please enter your email");
      return;
    }

    if (symptoms.trim() === "") {
      alert("Please enter your symptoms");
      return;
    }

    if (doctor === "") {
      alert("Please select a doctor");
      return;
    }

    if (appointmentDate === "") {
      alert("Please select appointment date");
      return;
    }

    if (appointmentTime === "") {
      alert("Please select appointment time");
      return;
    }

    // If all validations pass
    const appointmentData = {
      fullName,
      age,
      gender,
      phone,
      email,
      symptoms,
      doctor,
      appointmentDate,
      appointmentTime,
    };

    try {
      const response = await api.post("/appointment", appointmentData);

      console.log(response.data);

      alert("Appointment Submitted Successfully");
    } catch (error) {
      console.log(error);

      alert("Something went wrong");
    }
  };

  return (
    <div>
      <h1>Book Appointment</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <br />
          <input
            type="text"
            placeholder="Enter your name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Age</label>
          <br />
          <input
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Gender</label>
          <br />

          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <br />

        <div>
          <label>Phone</label>
          <br />
          <input
            type="text"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Symptoms</label>
          <br />
          <textarea
            rows="4"
            placeholder="Describe your symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          ></textarea>
        </div>

        <br />

        <div>
          <label>Preferred Doctor</label>
          <br />

          <select
            value={doctor}
            onChange={(e) => {
              setDoctor(e.target.value);

              fetchSlots(e.target.value);
            }}
          >
            <option value="">Select Doctor</option>

            {doctors.map((doctor) => (
              <option key={doctor.doctor_id} value={doctor.doctor_id}>
                {doctor.doctor_name} - {doctor.specialization}
              </option>
            ))}
          </select>
        </div>

        <br />

        <div>
          <label>Appointment Date</label>
          <br />
          <input
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Available Time Slots</label>

          <br />

          <select
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
          >
            <option value="">Select Time</option>

            {slots.map((slot) => (
              <option key={slot.slot_id} value={slot.slot_id}>
                {slot.slot_time}
              </option>
            ))}
          </select>
        </div>

        <br />

        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
}

export default BookAppointment;
