import { useEffect, useState } from "react";
import { getAppointments } from "../services/api";

function AdminDashboard() {
    const [appointments, setAppointments] = useState([]);

    const fetchAppointments = async () => {

        try {

            const response = await getAppointments();

            console.log(response.data);

            setAppointments(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

    fetchAppointments();

}, []);

    return (
  <div>
    <h1>Admin Dashboard</h1>

    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th>Appointment No</th>
          <th>Patient ID</th>
          <th>Doctor ID</th>
          <th>Symptoms</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {appointments.map((appointment) => (
          <tr key={appointment.appointment_id}>
            <td>{appointment.appointment_number}</td>
            <td>{appointment.patient_id}</td>
            <td>{appointment.doctor_id}</td>
            <td>{appointment.symptoms}</td>
            <td>{appointment.appointment_status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}

export default AdminDashboard