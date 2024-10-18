// Import required modules
const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const dynamicFlights = require("./data/flights"); // Import flight data
const flightSeats = require("./data/seats"); // Import seats data

// Set up EJS as the templating engine
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Parse URL-encoded data sent in POST requests
app.use(express.urlencoded({ extended: true }));

// Home route - render the home page
app.get("/", (req, res) => {
    res.render("home");
});

// Search route - render the search page
app.get("/search", (req, res) => {
    res.render("search");
});

// Search results route - display flights based on search criteria
app.get("/search-results", (req, res) => {
    const { from, to, departure } = req.query;

    // Filter flights that match the search criteria
    const filteredFlights = dynamicFlights.filter(flight => {
        return (
            flight.origin.name.toLowerCase() === from.toLowerCase() &&
            flight.destination.name.toLowerCase() === to.toLowerCase() &&
            flight.departureTime.split('T')[0] === departure // Only compare the date part
        );
    });

    // Render search-results.ejs with filtered flights
    res.render("search-results", { flights: filteredFlights });
});

// Flight details route - render details for a specific flight
app.get("/flight-details/:id", (req, res) => {
    const flightId = req.params.id;
    const flight = dynamicFlights.find(flight => flight.id === flightId);

    if (flight) {
        res.render("flight-details", { flight });
    } else {
        res.status(404).send("Flight not found");
    }
});

// Choose seats route - render seat selection page for a specific flight
app.get("/choose-seats/:id", (req, res) => {
    const flightId = req.params.id;
    const flight = dynamicFlights.find(flight => flight.id === flightId);
    const seats = flightSeats[flightId];

    if (flight && seats) {
        res.render("choose-seats", { flight, seats });
    } else {
        res.status(404).send("Flight or seats not found");
    }
});

// Booking summary route - update seat status and render booking summary
app.post("/booking-summary/:id", (req, res) => {
    const flightId = req.params.id;
    const flight = dynamicFlights.find(flight => flight.id === flightId);
    const selectedSeats = req.body.selectedSeats.split(","); // Retrieve selected seats from the form

    if (flight) {
        // Update seat status in flightSeats
        selectedSeats.forEach(seatNumber => {
            const seatIndex = flightSeats[flightId].findIndex(seat => seat.seat === seatNumber);
            if (seatIndex !== -1) {
                flightSeats[flightId][seatIndex].status = false; // Mark seat as taken
            }
        });

        // Render booking summary page with updated seats
        res.render("booking-summary", { flight, selectedSeats });
    } else {
        res.status(404).send("Flight not found");
    }
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log("Serving on port 3000");
});

