const express = require("express");
const router = express.Router();

const { createBooking, getBookingByRef } = require("../controllers/bookingController");

router.post("/bookings", createBooking);
router.get("/bookings/:ref", getBookingByRef);

module.exports = router;
