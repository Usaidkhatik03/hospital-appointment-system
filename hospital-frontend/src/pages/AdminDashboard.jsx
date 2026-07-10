import { useEffect, useState } from "react";
import { getAppointments, updateAppointmentStatus } from "../services/api";
import DashboardCards from "../components/DashboardCard";

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

  const handleStatusUpdate = async (appointmentId, status) => {
    try {
      await updateAppointmentStatus(appointmentId, status);

      alert(`Appointment ${status} successfully.`);

      fetchAppointments();
    } catch (error) {
      console.log(error);
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
        Admin Dashboard
      </h1>

      <DashboardCards appointments={appointments} />

      {/* Search & Filter */}

      <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
        <div className="grid md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="🔍 Search by patient or appointment number"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table */}

      <div className="bg-white shadow-xl rounded-xl overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="px-6 py-4 text-left">Appointment No</th>
              <th className="px-6 py-4 text-left">Patient</th>
              <th className="px-6 py-4 text-left">Doctor</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Time</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
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
                <tr
                  key={appointment.appointment_id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 p-4">{appointment.appointment_number}</td>
                  <td className="px-6 p-4">{appointment.patient_name}</td>
                  <td className="px-6 p-4">{appointment.doctor_name}</td>
                  <td className="px-6 p-4">{appointment.appointment_date}</td>
                  <td className="px-6 p-4">{appointment.appointment_time}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold
                      ${
                        appointment.status === "Confirmed"
                          ? "bg-green-100 text-green-700"
                          : appointment.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : appointment.status === "Completed"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-red-100 text-red-700"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </td>

                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => {
                        if (
                          window.confirm("Mark this appointment as completed?")
                        ) {
                          handleStatusUpdate(
                            appointment.appointment_id,
                            "Completed",
                          );
                        }
                      }}
                      className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700"
                    >
                      Complete
                    </button>

                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to cancel this appointment?",
                          )
                        ) {
                          handleStatusUpdate(
                            appointment.appointment_id,
                            "Cancelled",
                          );
                        }
                      }}
                      className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
