const request = require('supertest');
const mongoose = require('mongoose');
const { app, server } = require('../app');
const { seedFlights } = require('../seeds/seedFlights');
const Flight = require('../models/Flight');
const Seat = require('../models/Seat');

// Existing Flight Search and Retrieval Flow tests

describe('Flight and Seat Data Integrity', () => {
    let testFlightId;

    // Close the server after all tests
    afterAll(done => {
        server.close(done);
    });

    // Seed the database before each test
    beforeEach(async () => {
        await seedFlights();
        // Insert a flight without seat data
        const flightWithoutSeats = {
            id: 'FL300',
            origin: { name: 'New York', code: 'JFK' },
            destination: { name: 'Los Angeles', code: 'LAX' },
            airline: 'Test Airlines',
            departureTime: new Date('2024-12-25T14:00:00'),
            price: 300
        };
        const createdFlight = await Flight.create(flightWithoutSeats);
        testFlightId = createdFlight.id;
    });

    test('handles missing seat data gracefully', async () => {
        const response = await request(app)
            .get(`/choose-seats/${testFlightId}`);

        expect(response.status).toBe(404);
        expect(response.text).toContain('Flight or seats not found');
    });

    test('creates flight without seat data and verifies response for missing seats', async () => {
        // Attempt to retrieve seat information for the flight without seats
        const response = await request(app)
            .get(`/choose-seats/${testFlightId}`);

        expect(response.status).toBe(404);
        expect(response.text).toContain('Flight or seats not found');
    });
});
