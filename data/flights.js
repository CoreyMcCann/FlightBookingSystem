// data/flights.js

// Generate dynamic flights and store in an array
const destinations = [
    { name: 'New York', code: 'JFK' },
    { name: 'London', code: 'LHR' },
    { name: 'Tokyo', code: 'NRT' },
    { name: 'Los Angeles', code: 'LAX' },
    { name: 'Paris', code: 'CDG' }
];
const origins = [
    { name: 'Chicago', code: 'ORD' },
    { name: 'Miami', code: 'MIA' },
    { name: 'Dallas', code: 'DFW' },
    { name: 'San Francisco', code: 'SFO' },
    { name: 'Toronto', code: 'YYZ' }
];
const airlines = ['Air Express', 'Skyways', 'Global Airlines', 'FlyHigh', 'Continental Flights'];
let dynamicFlights = [];

// Create guaranteed flights for testing purposes
dynamicFlights.push({
    id: 'FL100',
    origin: origins[2], // Dallas
    destination: destinations[1], // Miami
    airline: 'Air Express',
    departureTime: '2024-11-15T08:00:00', // Specific date and time for testing
    price: '300.00'
});

dynamicFlights.push({
    id: 'FL101',
    origin: origins[0], // Chicago
    destination: destinations[4], // Paris
    airline: 'Skyways',
    departureTime: '2024-11-20T09:30:00', // Specific date and time for testing
    price: '700.00'
});

dynamicFlights.push({
    id: 'FL102',
    origin: origins[0], // Chicago
    destination: destinations[4], // Paris
    airline: 'Global Airlines',
    departureTime: '2024-11-20T11:00:00', // Same specific date and different time for testing
    price: '750.00'
});

// Generate random flights
defineRandomFlights();

function defineRandomFlights() {
    for (let i = 0; i < 100; i++) {
        const randomOrigin = origins[Math.floor(Math.random() * origins.length)];
        const randomDestination = destinations[Math.floor(Math.random() * destinations.length)];
        const randomAirline = airlines[Math.floor(Math.random() * airlines.length)];
        const departureDate = new Date();
        departureDate.setDate(departureDate.getDate() + Math.floor(Math.random() * 30)); // Random date within 30 days
        const departureTime = `${departureDate.toISOString().split('T')[0]}T${Math.floor(Math.random() * 24).toString().padStart(2, '0')}:00:00`; // Random hour

        dynamicFlights.push({
            id: `FL${i + 103}`,
            origin: randomOrigin,
            destination: randomDestination,
            airline: randomAirline,
            departureTime: departureTime, // Date and time format
            price: (Math.random() * 500 + 100).toFixed(2), // Random price between $100 and $600
        });
    }
}

module.exports = dynamicFlights;

