import { Link } from "react-router-dom";

function Home() {

    return (

        <div>

            <section>

                <h1>Hospital AI Booking System</h1>

                <p>
                    Book your hospital appointment online in just a few minutes.
                </p>

                <Link to="/book">
                    <button>
                        Book Appointment
                    </button>
                </Link>

            </section>

            <section>

                <h2>Our Doctors</h2>

                <ul>

                    <li>General Physician</li>

                    <li>Cardiologist</li>

                    <li>Dermatologist</li>

                    <li>Orthopedic</li>

                    <li>Neurologist</li>

                </ul>

            </section>

            <section>

                <h2>Why Choose Us?</h2>

                <ul>

                    <li>AI Doctor Recommendation</li>

                    <li>Online Appointment Booking</li>

                    <li>Secure Online Payment</li>

                    <li>Email & SMS Confirmation</li>

                </ul>

            </section>

        </div>

    )

}

export default Home;