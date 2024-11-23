const request = require('supertest');
const mongoose = require('mongoose');
const { app, server } = require('../app');  // Note: importing server as well
const { seedFlights } = require('../seeds/seedFlights');
const Flight = require('../models/Flight');

describe('Flight Search and Retrieval Flow', () => {
    // Close the server after all tests
    afterAll(done => {
        server.close(done);
    });

    // Seed the database before each test
    beforeEach(async () => {
        await seedFlights();
    });

    test('should return correct flight data based on origin, destination, and departure date', async () => {
        // First verify the data was seeded correctly
        const seededFlights = await Flight.find({
            'origin.name': 'Chicago',
            'destination.name': 'Paris',
            departureTime: new Date('2024-12-20T14:00:00')
        });
        expect(seededFlights.length).toBeGreaterThan(0);

        const response = await request(app)
            .get('/search-results')
            .query({
                from: 'Chicago',
                to: 'Paris',
                departure: '2024-12-20'
            });

        expect(response.status).toBe(200);
        expect(response.text).toContain('Chicago');
        expect(response.text).toContain('Paris');
        // Use .toContain instead of .toMatch for exact string matching
        expect(response.text).toContain('Skyways');
    });

    test('should handle searches with no matching flights gracefully', async () => {
        const response = await request(app)
            .get('/search-results')
            .query({
                from: 'UnknownCity',
                to: 'AnotherCity',
                departure: '2024-12-25'
            });

        expect(response.status).toBe(200);
        expect(response.text).toContain('No flights found');
    });

    test('should handle invalid parameters gracefully', async () => {
        const response = await request(app)
            .get('/search-results')
            .query({
                from: '',
                to: '',
                departure: ''
            });

        expect(response.status).toBe(200);
        expect(response.text).toContain('Please try a different search');
    });
});