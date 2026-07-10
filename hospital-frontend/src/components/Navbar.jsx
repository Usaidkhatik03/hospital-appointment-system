import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

        <Link
          to="/"
          className="text-3xl font-bold text-blue-700"
        >
          Hospital AI
        </Link>

        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="font-medium text-gray-700 hover:text-blue-700 transition"
          >
            Home
          </Link>

          <Link
            to="/book"
            className="font-medium text-gray-700 hover:text-blue-700 transition"
          >
            Book Appointment
          </Link>

          <Link
            to="/admin"
            className="bg-blue-700 text-white px-5 py-2 rounded-lg hover:bg-blue-800 transition"
          >
            Admin Dashboard
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;