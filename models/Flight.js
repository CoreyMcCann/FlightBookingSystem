const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    id: String,
    origin: {
        name: String,
        code: String,
    },
    destination: {
        name: String,
        code: String,
    },
    airline: String,
    departureTime: Date,
    price: Number,
});

module.exports = mongoose.model('Flight', flightSchema);