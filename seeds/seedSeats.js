// seeds/seedSeats.js
const mongoose = require('mongoose');
const Seat = require('../models/Seat');
const Flight = require('../models/Flight');

mongoose.connect('mongodb://127.0.0.1:27017/FlightBookingSystem')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Connection error:', err));


const generateSeats = (rows = 6, seatsPerRow = ['A', 'B', 'C', 'D']) => {
    const seats = [];
    for (let i = 1; i <= rows; i++) {
        seatsPerRow.forEach(seatLetter => {
            seats.push({
                seat: `${i}${seatLetter}`,
                status: Math.random() > 0.5, // Randomly assign True (available) or False (taken)
            });
        });
    }
    return seats;
};

const seedSeats = async () => {
    try {
        await Seat.deleteMany({});
        const flights = await Flight.find();

        const seatPromises = flights.map(flight => {
            const seats = generateSeats();
            return new Seat({
                flightId: flight.id,
                seats,
            }).save();
        });

        await Promise.all(seatPromises);
        console.log('Seats added!');
    } catch (err) {
        console.error('Error seeding seat data:', err);
    } finally {
        mongoose.connection.close();
    }
};

seedSeats();
