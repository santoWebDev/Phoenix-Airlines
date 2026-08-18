// Generates a human-friendly booking reference, e.g. "PX-7K2N9Q"
const generateBookingRef = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I to avoid confusion
    let code = "";
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `PX-${code}`;
};

module.exports = generateBookingRef;
