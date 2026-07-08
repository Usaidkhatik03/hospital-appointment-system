import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>Hospital AI</h2>

      <Link to="/">Home</Link>

      <Link to="/book">Book Appointment</Link>

      <Link to="/admin">Admin</Link>
    </nav>
  );
}

export default Navbar;