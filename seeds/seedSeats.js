const mongoose = require('mongoose');
const Seat = require('../models/Seat');
const Flight = require('../models/Flight');

// Connect to the MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/FlightBookingSystem')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Connection error:', err));

// Generate seat layout for a flight
// Default configuration: 6 rows with 4 seats each (A, B, C, D)
const generateSeats = (rows = 6, seatsPerRow = ['A', 'B', 'C', 'D']) => {
    const seats = [];
    for (let i = 1; i <= rows; i++) {
        seatsPerRow.forEach(seatLetter => {
            seats.push({
                seat: `${i}${seatLetter}`, // Creates seat numbers like 1A, 1B, 2A, etc.
                status: Math.random() > 0.5, // Randomly set seats as available (true) or taken (false)
            });
        });
    }
    return seats;
};

const seedSeats = async () => {
    try {
        // Clear existing seat data
        await Seat.deleteMany({});

        // Get all flights to create corresponding seat layouts
        const flights = await Flight.find();

        // Generate seat layouts for each flight
        const seatPromises = flights.map(flight => {
            const seats = generateSeats();
            return new Seat({
                flightId: flight.id,
                seats,
            }).save();
        });

        // Save all seat layouts to database
        await Promise.all(seatPromises);
        console.log('Seats added!');
    } catch (err) {
        console.error('Error seeding seat data:', err);
    } finally {
        mongoose.connection.close();
    }
};

seedSeats();