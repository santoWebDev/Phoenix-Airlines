require("dotenv").config();
const mongoose = require("mongoose");
const Flight = require("./models/flights");
const flights = require("./flightsData");   // ← import the 50 flights

const seed = async () => {
    try {
        const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/FlightDB";
        await mongoose.connect(uri);

        await Flight.deleteMany({});
        await Flight.insertMany(flights);

        console.log(`Seed complete — ${flights.length} flights inserted.`);
    } catch (error) {
        console.error("Seeding failed:", error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
};

seed();