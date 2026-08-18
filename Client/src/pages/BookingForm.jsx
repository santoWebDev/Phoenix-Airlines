import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import Loader from "../components/Loader";

export default function BookingForm() {
    const { flightId } = useParams();
    const navigate = useNavigate();

    const [flight, setFlight] = useState(null);
    const [loadingFlight, setLoadingFlight] = useState(true);
    const [loadError, setLoadError] = useState("");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [seatsBooked, setSeatsBooked] = useState(1);

    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState("");

    useEffect(() => {
        const fetchFlight = async () => {
            try {
                const res = await api.get(`/flights/${flightId}`);
                setFlight(res.data.data);
            } catch (err) {
                setLoadError(err.response?.data?.message || "Could not load flight details");
            } finally {
                setLoadingFlight(false);
            }
        };
        fetchFlight();
    }, [flightId]);

    const confirmBooking = async () => {
        if (!firstName || !lastName || !email || !mobileNumber) {
            setFormError("Please fill in all the fields before confirming");
            return;
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setFormError("Please enter a valid email address");
            return;
        }
        if (!/^\d{10}$/.test(mobileNumber)) {
            setFormError("Mobile number must be exactly 10 digits");
            return;
        }

        setFormError("");
        setSubmitting(true);

        try {
            const res = await api.post("/bookings", {
                flightId,
                firstName,
                lastName,
                email,
                mobileNumber,
                seatsBooked
            });

            navigate("/booking-success", { state: { booking: res.data.data } });
        } catch (err) {
            setFormError(err.response?.data?.message || "Booking failed. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loadingFlight) return <Loader label="Loading flight details..." />;

    if (loadError) {
        return (
            <div className="text-center py-16">
                <p className="text-red-500 mb-4">{loadError}</p>
                <button
                    onClick={() => navigate("/flights")}
                    className="text-blue-600 underline"
                >
                    Back to search
                </button>
            </div>
        );
    }

    const maxSeats = Math.min(flight.availableSeats, 6);

    return (
        <div className="max-w-2xl mx-auto px-6 py-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Confirm Your Booking</h2>
            <p className="text-gray-500 mb-6">Flight {flight.flightNumber} • {flight.airline}</p>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-8">
                <div className="flex justify-between text-lg font-medium">
                    <span>{flight.source} → {flight.destination}</span>
                    <span>₹{flight.price} / seat</span>
                </div>
                <p className="text-gray-500 text-sm mt-1">
                    {flight.date} • {flight.departureTime} – {flight.arrivalTime}
                </p>
            </div>

            <div className="flex flex-col gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 text-gray-700">First Name</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full border rounded-lg p-3"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-gray-700">Last Name</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full border rounded-lg p-3"
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-1 text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded-lg p-3"
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 text-gray-700">Mobile Number</label>
                        <input
                            type="text"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            className="w-full border rounded-lg p-3"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-gray-700">Seats</label>
                        <select
                            value={seatsBooked}
                            onChange={(e) => setSeatsBooked(Number(e.target.value))}
                            className="w-full border rounded-lg p-3"
                        >
                            {Array.from({ length: maxSeats }, (_, i) => i + 1).map((n) => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <p className="text-right text-lg font-semibold text-gray-800">
                    Total: ₹{flight.price * seatsBooked}
                </p>
            </div>

            {formError && <p className="text-red-500 mt-4">{formError}</p>}

            <button
                onClick={confirmBooking}
                disabled={submitting}
                className="w-full bg-blue-500 text-white px-5 py-3 rounded-lg mt-6 text-lg font-medium hover:bg-blue-700 transition disabled:opacity-60"
            >
                {submitting ? "Confirming..." : "Confirm Booking"}
            </button>
        </div>
    );
}
