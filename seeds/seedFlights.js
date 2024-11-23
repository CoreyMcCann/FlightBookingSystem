// seeds/seedFlights.js
const mongoose = require('mongoose');
const Flight = require('../models/Flight');
const airportsData = require('./airports_sample.json');

const airlines = ['Air Express', 'Skyways', 'Global Airlines', 'FlyHigh', 'Continental Flights'];

const seedFlights = async () => {
    try {
        // Clear existing flights
        await Flight.deleteMany({});

        // These are our test flights - always insert these
        const guaranteedFlights = [
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
                departureTime: new Date('2024-12-20T10:00:00'),
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
                departureTime: new Date('2024-12-20T14:00:00'),
                price: '475.00'
            }
        ];

        // Insert the guaranteed flights
        await Flight.insertMany(guaranteedFlights);

        // If we're not in a test environment, add additional random flights
        if (process.env.NODE_ENV !== 'test') {
            const airports = airportsData.airports;
            const additionalFlights = [];

            // Generate additional random flights
            for (let i = 0; i < 100; i++) {
                const randomOrigin = airports[Math.floor(Math.random() * airports.length)];
                let randomDestination;

                do {
                    randomDestination = airports[Math.floor(Math.random() * airports.length)];
                } while (randomOrigin.iata_code === randomDestination.iata_code);

                const departureDate = new Date();
                departureDate.setDate(departureDate.getDate() + Math.floor(Math.random() * 30));
                departureDate.setHours(Math.floor(Math.random() * 24), 0, 0, 0);

                additionalFlights.push({
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
                    departureTime: departureDate,
                    price: (Math.random() * 500 + 100).toFixed(2),
                });
            }

            await Flight.insertMany(additionalFlights);
        }

        console.log('Database seeded!');
    } catch (err) {
        console.error('Error seeding data:', err);
        throw err;
    }
};

module.exports = { seedFlights };