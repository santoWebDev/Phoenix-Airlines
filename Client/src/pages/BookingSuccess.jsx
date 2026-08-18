import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

export default function BookingSuccess() {
    const location = useLocation();
    const navigate = useNavigate();
    const bookingFromState = location.state?.booking;

    const [booking, setBooking] = useState(bookingFromState || null);
    const [lookupRef, setLookupRef] = useState("");
    const [lookupError, setLookupError] = useState("");

    // If the user refreshed the page, location.state is lost — let them
    // recover their booking details by entering the reference manually.
    const lookupBooking = async () => {
        setLookupError("");
        try {
            const res = await api.get(`/bookings/${lookupRef.trim()}`);
            setBooking(res.data.data);
        } catch (err) {
            setLookupError(err.response?.data?.message || "Booking not found");
        }
    };

    if (!booking) {
        return (
            <div className="max-w-md mx-auto px-6 py-16 text-center">
                <h2 className="text-2xl font-semibold mb-4">Find Your Booking</h2>
                <p className="text-gray-500 mb-6">
                    Enter your booking reference to view your confirmation.
                </p>
                <input
                    type="text"
                    placeholder="e.g. PX-7K2N9Q"
                    value={lookupRef}
                    onChange={(e) => setLookupRef(e.target.value)}
                    className="w-full border rounded-lg p-3 mb-3 text-center uppercase"
                />
                <button
                    onClick={lookupBooking}
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                >
                    Find Booking
                </button>
                {lookupError && <p className="text-red-500 mt-3">{lookupError}</p>}
            </div>
        );
    }

    const { flight } = booking;

    return (
        <div className="max-w-2xl mx-auto px-6 py-16 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-2">Booking Confirmed!</h2>
            <p className="text-gray-500 mb-8">
                A confirmation has been generated for {booking.firstName} {booking.lastName}.
            </p>

            <div className="bg-gray-50 border rounded-xl p-6 text-left">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-500">Booking Reference</span>
                    <span className="text-xl font-bold text-blue-700">{booking.bookingRef}</span>
                </div>
                <hr className="mb-4" />
                <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Flight</span>
                    <span className="font-medium">{flight.flightNumber} • {flight.airline}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Route</span>
                    <span className="font-medium">{flight.source} → {flight.destination}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Date & Time</span>
                    <span className="font-medium">{flight.date} • {flight.departureTime}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Seats Booked</span>
                    <span className="font-medium">{booking.seatsBooked}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500">Total Paid</span>
                    <span className="font-semibold text-lg">₹{booking.totalPrice}</span>
                </div>
            </div>

            <button
                onClick={() => navigate("/")}
                className="mt-8 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
                Back to Home
            </button>
        </div>
    );
}
