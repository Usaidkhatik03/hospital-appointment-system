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
          <th>Patient</th>
          <th>Doctor</th>
          <th>Date</th>
          <th>Time</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {appointments.map((appointment) => (
          <tr key={appointment.appointment_id}>
            <td>{appointment.appointment_number}</td>
            <td>{appointment.patient_name}</td>
            <td>{appointment.doctor_name}</td>
            <td>{appointment.appointment_date}</td>
            <td>{appointment.appointment_time}</td>
            <td>{appointment.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}

export default AdminDashboard