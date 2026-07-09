import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000"
});

export default api;

export const getDoctors = () => api.get("/doctors");

export const getDoctorSlots = (doctorId) =>
    api.get(`/doctor-slots/${doctorId}`);

export const getAppointments = () => api.get("/appointments");

export const updateAppointmentStatus = (appointmentId, status) => {
  return api.put(`/appointments/${appointmentId}/status`, {
    status,
  });
};