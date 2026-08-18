import { useNavigate } from "react-router-dom";

export default function FlightCard({ flight }) {
    const navigate = useNavigate();

    return (
        <div className="border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition mb-4 bg-white">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h3 className="text-xl font-semibold text-blue-700">{flight.airline}</h3>
                    <p className="text-sm text-gray-500">{flight.flightNumber} • {flight.date}</p>
                </div>

                <div className="text-center">
                    <p className="text-lg font-medium">{flight.source} → {flight.destination}</p>
                    <p className="text-sm text-gray-500">
                        {flight.departureTime} — {flight.arrivalTime}
                    </p>
                </div>

                <div className="text-right">
                    <p className="text-2xl font-bold text-gray-800">₹{flight.price}</p>
                    <p className={`text-sm ${flight.availableSeats < 5 ? "text-red-500" : "text-green-600"}`}>
                        {flight.availableSeats > 0
                            ? `${flight.availableSeats} seats left`
                            : "Sold out"}
                    </p>
                </div>

                <button
                    disabled={flight.availableSeats === 0}
                    onClick={() => navigate(`/book/${flight._id}`)}
                    className={`px-6 py-3 rounded-lg text-white font-medium transition
                        ${flight.availableSeats === 0
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-700"}`}
                >
                    {flight.availableSeats === 0 ? "Sold Out" : "Book Flight"}
                </button>
            </div>
        </div>
    );
}
