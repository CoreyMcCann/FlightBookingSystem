// Overall Program Information:
// This program is a flight booking system that provides the functionality to search for flights, view flight details and choose seats.
// The program connects to a MongoDB database to store and retrieve flight and seat information.
// Input: User inputs are collected via a web interface, including search criteria for flights and seat selection.
// Output: The program displays available flights, seat maps, and booking details to the user.
// To run the program please follow all instructions in the readme-first file in the Assignment-3 directory on github


// Import required modules
const express = require("express");
const app = express();

const path = require("path");
const ejsMate = require("ejs-mate");

const mongoose = require("mongoose");
const Flight = require("./models/Flight");
const Seat = require("./models/Seat");

// Added body parsing middleware for testing purposes
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Connect to MongoDB using the local database URL
mongoose.connect('mongodb://127.0.0.1:27017/FlightBookingSystem');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// Set up EJS as the templating engine
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Parse URL-encoded data sent in POST requests
app.use(express.urlencoded({ extended: true }));

// Route Handlers

// Home route - render the home page
app.get("/", (req, res) => {
    res.render("home");
});

// Search route - render the search page
app.get("/search", (req, res) => {
    res.render("search");
});

// Search results route - display flights based on search criteria
app.get('/search-results', async (req, res) => {
    try {
        const { from, to, departure } = req.query;

        // Validate required parameters
        if (!from || !to || !departure) {
            return res.render("search-results", {
                flights: [],
                error: "All search fields are required"
            });
        }

        const departureDate = new Date(departure);

        // Check for invalid date
        if (isNaN(departureDate.getTime())) {
            return res.render("search-results", {
                flights: [],
                error: "Invalid departure date"
            });
        }

        // Create date range for the entire day
        const nextDay = new Date(departureDate);
        nextDay.setDate(departureDate.getDate() + 1);

        // Use regular expressions to match city names case-insensitively
        const filteredFlights = await Flight.find({
            'origin.name': { $regex: new RegExp(`^${from}$`, 'i') },
            'destination.name': { $regex: new RegExp(`^${to}$`, 'i') },
            departureTime: {
                $gte: departureDate,
                $lt: nextDay,
            },
        });

        res.render("search-results", { flights: filteredFlights });
    } catch (err) {
        res.status(500).render("search-results", {
            flights: [],
            error: "An error occurred while searching for flights"
        });
    }

});


// Flight details route - render details for a specific flight
// Uses custom string 'id' field instead of MongoDB's _id
app.get("/flight-details/:id", async (req, res) => {
    try {
        const flight = await Flight.findOne({ id: req.params.id });
        if (flight) {
            res.render("flight-details", { flight });
        } else {
            res.status(404).send("Flight not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

// Choose seats route - render seat selection page for a specific flight
// Retrieves both flight and seat information for the selection interface
app.get("/choose-seats/:id", async (req, res) => {
    try {
        const flight = await Flight.findOne({ id: req.params.id });
        const seatData = await Seat.findOne({ flightId: req.params.id });

        if (flight && seatData) {
            res.render("choose-seats", { flight, seats: seatData.seats });
        } else {
            res.status(404).send("Flight or seats not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

// Booking summary route - update seat status and render booking summary
// Handles the seat reservation process and displays booking confirmation
app.post("/booking-summary/:id", async (req, res) => {
    const flightId = req.params.id;
    // Convert comma-separated string of seat numbers back to array
    const selectedSeats = req.body.selectedSeats.split(",");

    try {
        const flight = await Flight.findOne({ id: flightId });
        const seatData = await Seat.findOne({ flightId });

        if (flight && seatData) {
            // Update status of each selected seat to false (taken)
            selectedSeats.forEach(seatNumber => {
                const seatIndex = seatData.seats.findIndex(seat => seat.seat === seatNumber);
                if (seatIndex !== -1) {
                    seatData.seats[seatIndex].status = false;
                }
            });

            await seatData.save();
            res.render("booking-summary", { flight, selectedSeats });
        } else {
            res.status(404).send("Flight or seat information not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

// For the app.test.js file to work with no open handles
const server = app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
  
  // Export both app and server for use in tests
  module.exports = { app, server };