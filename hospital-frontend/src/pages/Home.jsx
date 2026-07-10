import { Link } from "react-router-dom";
import doctorImage from "../assets/doctor.png";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <section className="bg-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-12">
          {/* Left Side */}
          <div>
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Book Hospital Appointments <br /> in Minutes
            </h1>

            <p className="text-lg mb-8">
              AI-powered hospital appointment booking system with instant
              scheduling, doctor availability, and seamless patient management.
            </p>

            <div className="flex gap-4">
              <Link
                to="/book"
                className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
              >
                Book Appointment
              </Link>

              <Link
                to="/admin"
                className="bg-green-500 px-6 py-3 rounded-lg font-semibold hover:bg-green-600"
              >
                Admin Dashboard
              </Link>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex justify-center">
            <img src={doctorImage} alt="Doctor" className="w-full max-w-md" />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us?</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-xl p-6 text-center">
            <h3 className="text-2xl font-semibold mb-3">🩺 Expert Doctors</h3>

            <p>Consult experienced specialists across multiple departments.</p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 text-center">
            <h3 className="text-2xl font-semibold mb-3">⚡ Instant Booking</h3>

            <p>Book appointments in seconds without waiting in long queues.</p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 text-center">
            <h3 className="text-2xl font-semibold mb-3">🤖 AI Powered</h3>

            <p>Smart appointment management powered by modern AI automation.</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Trusted By Thousands
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-5xl font-bold text-blue-700">50+</h3>

              <p className="mt-2 text-gray-600">Expert Doctors</p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-blue-700">1000+</h3>

              <p className="mt-2 text-gray-600">Happy Patients</p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-blue-700">24/7</h3>

              <p className="mt-2 text-gray-600">Emergency Support</p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-blue-700">98%</h3>

              <p className="mt-2 text-gray-600">Patient Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
