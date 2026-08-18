const Flight = require("../models/flights");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

// GET /api/flights?source=&destination=&date=
exports.getFlights = asyncHandler(async (req, res) => {
    const { source, destination, date } = req.query;
    const filter = {};

    if (source) filter.source = source;
    if (destination) filter.destination = destination;
    if (date) filter.date = date;

    const flights = await Flight.find(filter).sort({ date: 1, departureTime: 1 });

    res.status(200).json({
        success: true,
        count: flights.length,
        data: flights
    });
});

// GET /api/flights/:id
exports.getFlightById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new AppError("Invalid flight id", 400);
    }

    const flight = await Flight.findById(id);

    if (!flight) {
        throw new AppError("Flight not found", 404);
    }

    res.status(200).json({
        success: true,
        data: flight
    });
});
