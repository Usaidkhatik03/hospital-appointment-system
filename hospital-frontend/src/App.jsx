import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import BookAppointment from "./pages/BookAppointment";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import AdminDashboard from "./pages/AdminDashboard";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/book" element={<BookAppointment />} />

        <Route path="/payment" element={<Payment />} />

        <Route path="/success" element={<Success />} />

        <Route path="/admin" element={<AdminDashboard />} />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;