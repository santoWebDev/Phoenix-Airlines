import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import FlightSearch from "./pages/FlightSearch";
import BookingForm from "./pages/BookingForm";
import BookingSuccess from "./pages/BookingSuccess";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/flights" element={<FlightSearch />} />
                <Route path="/book/:flightId" element={<BookingForm />} />
                <Route path="/booking-success" element={<BookingSuccess />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
