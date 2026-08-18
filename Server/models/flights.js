const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema(
    {
        flightNumber: {
            type: String,
            required: [true, "Flight number is required"],
            unique: true,
            trim: true
        },
        airline: {
            type: String,
            required: [true, "Airline name is required"],
            trim: true
        },
        source: {
            type: String,
            required: [true, "Source city is required"],
            trim: true
        },
        destination: {
            type: String,
            required: [true, "Destination city is required"],
            trim: true
        },
        departureTime: {
            type: String,
            required: [true, "Departure time is required"]
        },
        arrivalTime: {
            type: String,
            required: [true, "Arrival time is required"]
        },
        date: {
            type: String,
            required: [true, "Flight date is required"]
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [0, "Price cannot be negative"]
        },
        availableSeats: {
            type: Number,
            required: [true, "Available seats is required"],
            min: [0, "Available seats cannot be negative"]
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Flight", flightSchema);
