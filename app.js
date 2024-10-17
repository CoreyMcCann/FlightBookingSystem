const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const dynamicFlights = require("./data/flights"); // Import flight data
const flightSeats = require("./data/seats"); // Import seats data

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/search", (req, res) => {
    res.render("search");
});

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

// Flight details route
app.get("/flight-details/:id", (req, res) => {
    const flightId = req.params.id;
    const flight = dynamicFlights.find(flight => flight.id === flightId);

    if (flight) {
        res.render("flight-details", { flight });
    } else {
        res.status(404).send("Flight not found");
    }
});

// Choose seats route
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

// Booking summary route with seat update
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


app.listen(3000, () => {
    console.log("Serving on port 3000");
});
