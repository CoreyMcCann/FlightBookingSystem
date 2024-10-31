const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    flightId: String,
    seats: [
        {
            seat: String,
            status: Boolean,
        },
    ],
});

module.exports = mongoose.model('Seat', seatSchema);

