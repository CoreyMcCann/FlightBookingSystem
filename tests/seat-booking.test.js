const request = require('supertest');
const mongoose = require('mongoose');
const { app, server } = require('../app');
const { seedFlights } = require('../seeds/seedFlights');
const Flight = require('../models/Flight');
const Seat = require('../models/Seat');

describe('Seat Selection and Booking Flow', () => {
    let testFlightId;

    // Close the server after all tests
    afterAll(done => {
        server.close(done);
    });

    // Seed the database before each test
    beforeEach(async () => {
        await seedFlights();
        // We know FL201 exists from the guaranteed flights in seedFlights.js
        testFlightId = 'FL201';

        // Create test seat data for this flight
        const seatData = {
            flightId: testFlightId,
            seats: [
                { seat: '1A', status: true },  // Available
                { seat: '1B', status: true },  // Available
                { seat: '1C', status: false }, // Already taken
                { seat: '2A', status: true },  // Available
            ]
        };

        // Clear existing seats and insert test seats
        await Seat.deleteMany({});
        await Seat.create(seatData);
    });

    test('complete seat selection and booking flow', async () => {
        // Step 1: Get the seat selection page
        const seatSelectionResponse = await request(app)
            .get(`/choose-seats/${testFlightId}`);

        expect(seatSelectionResponse.status).toBe(200);
        expect(seatSelectionResponse.text).toContain('1A'); // Should show seat 1A

        // Step 2: Book selected seats
        const seatsToBook = ['1A', '1B'];
        const bookingResponse = await request(app)
            .post(`/booking-summary/${testFlightId}`)
            .send({ selectedSeats: seatsToBook.join(',') })
            .type('form');

        expect(bookingResponse.status).toBe(200);
        expect(bookingResponse.text).toContain('1A'); // Booking summary should show selected seats
        expect(bookingResponse.text).toContain('1B');

        // Step 3: Verify seats are marked as unavailable in database
        const updatedSeatData = await Seat.findOne({ flightId: testFlightId });

        // Check that booked seats are now unavailable
        const seat1A = updatedSeatData.seats.find(seat => seat.seat === '1A');
        const seat1B = updatedSeatData.seats.find(seat => seat.seat === '1B');
        const seat2A = updatedSeatData.seats.find(seat => seat.seat === '2A');

        expect(seat1A.status).toBe(false); // Should be unavailable
        expect(seat1B.status).toBe(false); // Should be unavailable
        expect(seat2A.status).toBe(true);  // Should still be available
    });

    test('handles booking already taken seats', async () => {
        // Attempt to book a seat that's already taken (1C from our test data)
        const bookingResponse = await request(app)
            .post(`/booking-summary/${testFlightId}`)
            .send({ selectedSeats: '1C' })
            .type('form');

        expect(bookingResponse.status).toBe(200);

        // Verify the seat is still marked as unavailable
        const seatData = await Seat.findOne({ flightId: testFlightId });
        const seat1C = seatData.seats.find(seat => seat.seat === '1C');
        expect(seat1C.status).toBe(false);
    });

    test('handles invalid flight ID for seat selection', async () => {
        const response = await request(app)
            .get('/choose-seats/INVALID_ID');

        expect(response.status).toBe(404);
        expect(response.text).toContain('Flight or seats not found');
    });
});