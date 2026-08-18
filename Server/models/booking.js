const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        bookingRef: {
            type: String,
            required: true,
            unique: true
        },
        flight: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Flight",
            required: true
        },
        firstName: {
            type: String,
            required: [true, "First name is required"],
            trim: true
        },
        lastName: {
            type: String,
            required: [true, "Last name is required"],
            trim: true
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"]
        },
        mobileNumber: {
            type: String,
            required: [true, "Mobile number is required"],
            match: [/^\d{10}$/, "Mobile number must be exactly 10 digits"]
        },
        seatsBooked: {
            type: Number,
            required: true,
            min: [1, "At least 1 seat must be booked"],
            default: 1
        },
        totalPrice: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ["confirmed", "cancelled"],
            default: "confirmed"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
