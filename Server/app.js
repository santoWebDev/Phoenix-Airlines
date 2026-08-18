require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/flightDatabase");
const flightRoutes = require("./routes/flightRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Phoenix Airlines API is running...");
});

app.use("/api", flightRoutes);
app.use("/api", bookingRoutes);

// 404 handler for unmatched routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});

// Centralized error handler — must be registered last
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
