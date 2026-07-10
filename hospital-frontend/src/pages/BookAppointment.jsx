import { useState } from "react";
import api from "../services/api";
import { useEffect } from "react";
import { getDoctors, getDoctorSlots } from "../services/api";
import { useNavigate } from "react-router-dom";

function BookAppointment() {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [doctor, setDoctor] = useState("");
  const [slots, setSlots] = useState([]);
  const navigate = useNavigate();
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

      navigate("/success", {
        state: {
          appointment: response.data,
        },
      });
    } catch (error) {
      console.log(error);

      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-10">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-3">
          Book Your Appointment
        </h1>

        <p className="text-center text-gray-600 mb-10">
          Fill in your details to schedule your hospital visit.
        </p>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-semibold">
              Full Name
            </label>
           
            <input
              type="text"
              placeholder="Enter your name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
</div>

<div className="mt-6 grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold">Age</label>
            
              <input
                type="number"
                placeholder="Enter your age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">
                Gender
              </label>
              
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-3"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold">Phone</label>
              
              <input
                type="text"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Email</label>
              
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
        </div>

<div className="mt-6">
            <label className="block text-gray-700 font-semibold">
              Symptoms
            </label>
            
            <textarea
              rows="4"
              placeholder="Describe your symptoms"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
       </div>

<div className="mt-6">
            <label className="block text-gray-700 font-semibold">
              Preferred Doctor
            </label>
           

            <select
              className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-3"
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

<div className="mt-6 grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold">
                Appointment Date
              </label>
              
              <input
                type="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">
                Available Time Slots
              </label>
              
              <select
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
                className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-3"
              >
                <option value="">Select Time</option>

                {slots.map((slot) => (
                  <option key={slot.slot_id} value={slot.slot_id}>
                    {slot.slot_time}
                  </option>
                ))}
              </select>
            </div>
        </div>

<div className="mt-8">
  <button
    type="submit"
    className="w-full bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-800 transition duration-300"
  >
    Book Appointment
  </button>
</div>

</form>
      </div>
    </div>
  );
}

export default BookAppointment;
