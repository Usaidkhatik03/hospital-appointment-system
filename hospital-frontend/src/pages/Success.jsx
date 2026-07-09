import { useLocation } from "react-router-dom";

function Success() {

    const location = useLocation();

    const appointment = location.state?.appointment;

    return (

        <div>

            <h1>Appointment Booked Successfully ✅</h1>

            <br />

            <h3>Appointment Number</h3>

            <p>{appointment?.appointment_number}</p>

            <br />

            <h3>Appointment ID</h3>

            <p>{appointment?.appointment_id}</p>

            <br />

            <h3>Status</h3>

            <p>{appointment?.message}</p>

        </div>

    );

}

export default Success;