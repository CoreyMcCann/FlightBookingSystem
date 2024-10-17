/* all logic inside service modules will be replaced to use Mongoose
models instead of mock data */

const flights = require('../data/flights');

function getAllFlights() {
    return flights;
}

function getFlightById(id) {
    return flights.find((flight) => flight.id === id);
}

// Add more functions as needed

module.exports = {
    getAllFlights,
    getFlightById,
    // Export other functions
};
