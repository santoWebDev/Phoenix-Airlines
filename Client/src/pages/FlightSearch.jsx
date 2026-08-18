import { useState } from "react";
import api from "../api/axiosInstance";
import FlightCard from "../components/FlightCard";
import Loader from "../components/Loader";

const CITIES = ["Chennai", "Delhi", "Mumbai", "Bangalore", "Hyderabad", "Kolkata", "Pune", "Goa", "Ahmedabad"];

export default function FlightSearch() {
    const [tripType, setTripType] = useState("oneWay");
    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState("");
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [searched, setSearched] = useState(false);

    const searchFlights = async () => {
        if (source && destination && source === destination) {
            setError("Source and destination cannot be the same");
            return;
        }

        setError("");
        setLoading(true);
        setSearched(true);

        try {
            const res = await api.get("/flights", {
                params: { source, destination, date }
            });
            setFlights(res.data.data);
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong while searching flights");
            setFlights([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Search Flights</h2>

            <div className="flex gap-6 mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name="tripType"
                        checked={tripType === "oneWay"}
                        onChange={() => setTripType("oneWay")}
                    />
                    One Way
                </label>
                <label className="flex items-center gap-2 cursor-not-allowed text-gray-400">
                    <input type="radio" name="tripType" disabled />
                    Round Trip (coming soon)
                </label>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
                <select
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Source City</option>
                    {CITIES.map((city) => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>

                <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Destination City</option>
                    {CITIES.map((city) => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>

                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <button
                onClick={searchFlights}
                className="w-full md:w-48 bg-blue-500 text-white text-lg font-medium py-3 rounded-lg hover:bg-blue-700 transition"
            >
                Search Flight
            </button>

            {error && (
                <p className="text-red-500 mt-4">{error}</p>
            )}

            <hr className="my-8" />

            {loading && <Loader label="Searching flights..." />}

            {!loading && searched && flights.length === 0 && !error && (
                <p className="text-gray-500 text-center py-10">
                    No flights found for the selected criteria. Try different cities or dates.
                </p>
            )}

            {!loading && flights.map((flight) => (
                <FlightCard key={flight._id} flight={flight} />
            ))}
        </div>
    );
}
