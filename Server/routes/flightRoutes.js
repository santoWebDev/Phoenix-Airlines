const express = require("express");
const router = express.Router();

const { getFlights, getFlightById } = require("../controllers/flightController");

router.get("/flights", getFlights);
router.get("/flights/:id", getFlightById);

module.exports = router;
