import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="flex justify-center items-center h-20 bg-blue-600 shadow-md">
            <Link to="/">
                <h1 className="text-3xl text-white font-semibold tracking-wide">
                    ✈ Phoenix Airlines
                </h1>
            </Link>
        </div>
    );
}
