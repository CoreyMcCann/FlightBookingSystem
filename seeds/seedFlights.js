const mongoose = require('mongoose');
const Flight = require('../models/Flight');
const airportsData = require('./airports_sample.json');

mongoose.connect('mongodb://127.0.0.1:27017/FlightBookingSystem')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Connection error:', err));

const airlines = ['Air Express', 'Skyways', 'Global Airlines', 'FlyHigh', 'Continental Flights'];

const seedFlights = async () => {
    try {
        await Flight.deleteMany({});

        const airports = airportsData.airports;
        const flights = [];

        // Add guaranteed flights
        const guaranteedFlights = [
            {
                id: 'FL200',
                origin: {
                    name: 'Dallas',
                    code: 'DFW'
                },
                destination: {
                    name: 'Miami',
                    code: 'MIA'
                },
                airline: 'Air Express',
                departureTime: new Date('2024-11-15T08:00:00'),
                price: '300.00'
            },
            {
                id: 'FL201',
                origin: {
                    name: 'Chicago',
                    code: 'ORD'
                },
                destination: {
                    name: 'Paris',
                    code: 'CDG'
                },
                airline: 'Global Airlines',
                departureTime: new Date('2024-11-20T10:00:00'),
                price: '450.00'
            },
            {
                id: 'FL202',
                origin: {
                    name: 'Chicago',
                    code: 'ORD'
                },
                destination: {
                    name: 'Paris',
                    code: 'CDG'
                },
                airline: 'Skyways',
                departureTime: new Date('2024-11-20T14:00:00'),
                price: '475.00'
            }
        ];

        flights.push(...guaranteedFlights);

        // Generate 100 random flights
        for (let i = 0; i < 100; i++) {
            const randomOrigin = airports[Math.floor(Math.random() * airports.length)];
            let randomDestination;
            do {
                randomDestination = airports[Math.floor(Math.random() * airports.length)];
            } while (randomOrigin.iata_code === randomDestination.iata_code);

            const departureDate = new Date();
            departureDate.setDate(departureDate.getDate() + Math.floor(Math.random() * 30)); // Random date within 30 days
            const departureTime = `${departureDate.toISOString().split('T')[0]}T${Math.floor(Math.random() * 24).toString().padStart(2, '0')}:00:00`; // Random hour

            flights.push({
                id: `FL${i + 300}`,
                origin: {
                    name: randomOrigin.name,
                    code: randomOrigin.iata_code,
                },
                destination: {
                    name: randomDestination.name,
                    code: randomDestination.iata_code,
                },
                airline: airlines[Math.floor(Math.random() * airlines.length)],
                departureTime: new Date(departureTime),
                price: (Math.random() * 500 + 100).toFixed(2), // Random price between $100 and $600
            });
        }

        await Flight.insertMany(flights);
        console.log('Flights added!');
    } catch (err) {
        console.error('Error seeding data:', err);
    } finally {
        mongoose.connection.close();
    }
};

seedFlights();
