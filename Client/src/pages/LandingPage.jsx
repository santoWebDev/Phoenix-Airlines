import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-b from-blue-50 to-white min-h-[80vh]">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Fly Smarter with Phoenix Airlines
            </h2>
            <p className="text-lg text-gray-600 max-w-xl mb-8">
                Search flights across major Indian cities, compare prices, and book your
                seat in just a few clicks.
            </p>
            <button
                onClick={() => navigate("/flights")}
                className="border rounded-lg text-white bg-blue-500 px-8 py-4 text-lg font-medium hover:bg-blue-700 transition shadow-md"
            >
                Search Flights
            </button>
        </div>
    );
}
