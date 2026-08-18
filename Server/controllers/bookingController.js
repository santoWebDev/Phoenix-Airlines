const Flight = require("../models/flights");
const Booking = require("../models/booking");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const generateBookingRef = require("../utils/generateBookingRef");

// POST /api/bookings
// body: { flightId, firstName, lastName, email, mobileNumber, seatsBooked }
exports.createBooking = asyncHandler(async (req, res) => {
    const { flightId, firstName, lastName, email, mobileNumber, seatsBooked = 1 } = req.body;

    if (!flightId || !firstName || !lastName || !email || !mobileNumber) {
        throw new AppError(
            "flightId, firstName, lastName, email and mobileNumber are required",
            400
        );
    }

    if (!flightId.match(/^[0-9a-fA-F]{24}$/)) {
        throw new AppError("Invalid flight id", 400);
    }

    const seats = Number(seatsBooked);
    if (!Number.isInteger(seats) || seats < 1) {
        throw new AppError("seatsBooked must be a positive integer", 400);
    }

    // Confirm the flight exists first, so we can give a clear 404 vs a
    // "not enough seats" message rather than one generic failure.
    const flight = await Flight.findById(flightId);
    if (!flight) {
        throw new AppError("Flight not found", 404);
    }

    // Atomically decrement seats only if enough are still available.
    // This prevents a race condition where two bookings both pass a
    // separate "seats available?" check and overbook the flight.
    const updatedFlight = await Flight.findOneAndUpdate(
        { _id: flightId, availableSeats: { $gte: seats } },
        { $inc: { availableSeats: -seats } },
        { new: true }
    );

    if (!updatedFlight) {
        throw new AppError(
            `Only ${flight.availableSeats} seat(s) left on this flight`,
            409
        );
    }

    // Generate a unique booking reference, retrying on the rare collision.
    let bookingRef;
    let booking;
    for (let attempt = 0; attempt < 5; attempt++) {
        bookingRef = generateBookingRef();
        try {
            booking = await Booking.create({
                bookingRef,
                flight: flightId,
                firstName,
                lastName,
                email,
                mobileNumber,
                seatsBooked: seats,
                totalPrice: flight.price * seats
            });
            break;
        } catch (err) {
            if (err.code === 11000 && attempt < 4) continue; // ref collision, retry
            // Roll back the seat decrement if booking creation ultimately fails
            await Flight.findByIdAndUpdate(flightId, { $inc: { availableSeats: seats } });
            throw err;
        }
    }

    const populatedBooking = await booking.populate("flight");

    res.status(201).json({
        success: true,
        message: "Booking confirmed",
        data: populatedBooking
    });
});

// GET /api/bookings/:ref
exports.getBookingByRef = asyncHandler(async (req, res) => {
    const { ref } = req.params;

    const booking = await Booking.findOne({ bookingRef: ref }).populate("flight");

    if (!booking) {
        throw new AppError("Booking not found", 404);
    }

    res.status(200).json({
        success: true,
        data: booking
    });
});
