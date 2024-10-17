const dynamicFlights = require('./flights');

let flightSeats = {};

// Generate seat maps for each flight
dynamicFlights.forEach(flight => {
    let seats = [];
    const rows = 6; // 6 rows of seats
    const seatsPerRow = ['A', 'B', 'C', 'D']; // 4 seats per row

    for (let i = 1; i <= rows; i++) {
        seatsPerRow.forEach(seatLetter => {
            seats.push({
                seat: `${i}${seatLetter}`,
                status: Math.random() > 0.5 // Randomly assign True (available) or False (taken)
            });
        });
    }

    flightSeats[flight.id] = seats;
});

module.exports = flightSeats;
