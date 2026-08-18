export default function Loader({ label = "Loading..." }) {
    return (
        <div className="flex flex-col items-center justify-center py-10 text-gray-500">
            <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-3" />
            <p>{label}</p>
        </div>
    );
}
