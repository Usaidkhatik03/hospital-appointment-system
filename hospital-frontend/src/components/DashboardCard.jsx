function DashboardCards({ appointments }) {
  const totalAppointments = appointments.length;

  const confirmedAppointments = appointments.filter(
    (appointment) => appointment.status === "Confirmed"
  ).length;

  const pendingAppointments = appointments.filter(
    (appointment) => appointment.status === "Pending"
  ).length;

  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "Completed"
  ).length;

  return (
    <div className="grid md:grid-cols-4 gap-6 mb-10">

      <div className="bg-white shadow-lg rounded-xl p-6 text-center">
        <h2 className="text-gray-500">Total Appointments</h2>
        <p className="text-4xl font-bold text-blue-700">
          {totalAppointments}
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-6 text-center">
        <h2 className="text-gray-500">Confirmed</h2>
        <p className="text-4xl font-bold text-green-600">
          {confirmedAppointments}
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-6 text-center">
        <h2 className="text-gray-500">Pending</h2>
        <p className="text-4xl font-bold text-yellow-500">
          {pendingAppointments}
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-6 text-center">
        <h2 className="text-gray-500">Completed</h2>
        <p className="text-4xl font-bold text-purple-600">
          {completedAppointments}
        </p>
      </div>

    </div>
  );
}

export default DashboardCards;