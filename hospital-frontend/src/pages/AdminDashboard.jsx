import { useEffect, useState } from "react";
import { getAppointments } from "../services/api";

function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

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

      <div>
        <input
          type="text"
          placeholder="Search by patient or appointment number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>Status: </label>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <br />

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
          {appointments
            .filter((appointment) => {
              const matchesSearch =
                appointment.patient_name
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                appointment.appointment_number
                  .toLowerCase()
                  .includes(search.toLowerCase());

              const matchesStatus =
                statusFilter === "All" || appointment.status === statusFilter;

              return matchesSearch && matchesStatus;
            })
            .map((appointment) => (
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

export default AdminDashboard;
