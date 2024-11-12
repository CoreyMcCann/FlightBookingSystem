const mongoose = require('mongoose');
const request = require('supertest');
const { app, server } = require('../app');
const Flight = require('../models/Flight');
const Seat = require('../models/Seat');

beforeAll(async () => {
  // The server is already running from app.js, no need to start it again
  if (!server) {
    throw new Error('Server is not running');
  }
});

afterAll(async () => {
  // Ensure the server is properly closed
  await mongoose.connection.close(); // Close the database connection

  // Close the server explicitly in the test
  await new Promise((resolve) => {
    server.close(() => {
      console.log("Test server closed");
      resolve();  // Resolve the promise when the server is closed
    });
  });
});

describe('Flight Booking System Tests', () => {
  test('database connection is established', () => {
    expect(mongoose.connection.readyState).toBe(1);
  });

  test('GET / should render home page', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  test('GET /search should render search page', async () => {
    const response = await request(app).get('/search');
    expect(response.status).toBe(200);
  });

  test('GET /search-results should handle flight search', async () => {
    // Create a test flight
    const testFlight = new Flight({
      id: 'TEST123',
      origin: { name: 'Toronto' },
      destination: { name: 'Vancouver' },
      departureTime: new Date('2024-12-01')
    });
    await testFlight.save();

    const response = await request(app)
      .get('/search-results')
      .query({
        from: 'Toronto',
        to: 'Vancouver',
        departure: '2024-12-01'
      });

    expect(response.status).toBe(200);
    expect(response.text).toContain('Toronto');
    expect(response.text).toContain('Vancouver');
  });

  test('GET /search-results should handle errors gracefully', async () => {
    // Mock the Flight.find method to throw an error
    jest.spyOn(Flight, 'find').mockRejectedValueOnce(new Error('Database error'));

    // Mock console.error to suppress logging during the test
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    const response = await request(app)
        .get('/search-results')
        .query({
            from: 'Toronto',
            to: 'Vancouver',
            departure: '2024-12-01'
        });

    // Check that the response has the correct status and error message
    expect(response.status).toBe(500);
    expect(response.text).toContain('Internal Server Error');
    
    // Ensure console.error was called with the error message
    expect(consoleError).toHaveBeenCalledWith(expect.objectContaining({ message: 'Database error' }));
    
    // Restore console.error after the test
    consoleError.mockRestore();
  });

  test('GET /flight-details/:id should render flight details page', async () => {
    const testFlight = new Flight({
      id: 'DETAIL123',
      origin: { name: 'Toronto' },
      destination: { name: 'Vancouver' },
      departureTime: new Date('2024-12-01'),
    });
    await testFlight.save();

    const response = await request(app).get(`/flight-details/${testFlight.id}`);
    expect(response.status).toBe(200);
    expect(response.text).toContain('Toronto');
    expect(response.text).toContain('Vancouver');
  });

  test('GET /flight-details/:id should return 404 if flight not found', async () => {
    // Mock the Flight.findOne method to return null (i.e., flight not found)
    jest.spyOn(Flight, 'findOne').mockResolvedValueOnce(null);
  
    const response = await request(app).get('/flight-details/INVALID_ID');
    
    expect(response.status).toBe(404);
    expect(response.text).toContain('Flight not found');
  });  

  test('GET /flight-details/:id should handle errors gracefully', async () => {
    // Mock the Flight.findOne method to throw an error
    jest.spyOn(Flight, 'findOne').mockRejectedValueOnce(new Error('Database error'));
  
    // Mock console.error to suppress logging during the test
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
  
    const response = await request(app).get('/flight-details/DETAIL123');
  
    expect(response.status).toBe(500);
    expect(response.text).toContain('Internal Server Error');
  
    // Ensure console.error was called with the error message
    expect(consoleError).toHaveBeenCalledWith(expect.objectContaining({ message: 'Database error' }));
    
    // Restore console.error after the test
    consoleError.mockRestore();
  });  

  test('GET /choose-seats/:id should render seat selection page', async () => {
    const testFlight = new Flight({
        id: 'CHOOSE123',
        origin: { name: 'Toronto' },
        destination: { name: 'Vancouver' },
        departureTime: new Date('2024-12-01')
    });
    await testFlight.save();

    const testSeats = new Seat({
        flightId: 'CHOOSE123',
        seats: [{ number: "1A", isAvailable: true }, { number: "1B", isAvailable: false }]
    });
    await testSeats.save();

    const response = await request(app).get(`/choose-seats/${testFlight.id}`);
    expect(response.status).toBe(200);
    expect(response.text).toContain('Choose your seats!');
  });

  test('GET /choose-seats/:id should return 404 if no flight data found', async () => {
    jest.spyOn(Flight, 'findOne').mockResolvedValueOnce(null); // Simulating no flight found
    jest.spyOn(Seat, 'findOne').mockResolvedValueOnce(null); // Simulating no seat data found
    
    const response = await request(app).get('/choose-seats/INVALID_ID');
    
    expect(response.status).toBe(404);
    expect(response.text).toContain('Flight or seats not found');
  });  

  test('POST /booking-summary/:id should handle seat booking and return summary', async () => {
    const testFlight = new Flight({
        id: 'BOOK123',
        origin: { name: 'Toronto' },
        destination: { name: 'Vancouver' },
        departureTime: new Date('2024-12-01')
    });
    await testFlight.save();

    const testSeats = new Seat({
        flightId: 'BOOK123',
        seats: [{ number: "1A", isAvailable: true }, { number: "1B", isAvailable: false }]
    });
    await testSeats.save();

    // Simulate the POST request with selectedSeats in the body
    const response = await request(app)
        .post(`/booking-summary/${testFlight.id}`)
        .send({
            selectedSeats: '1A,1B' // Provide the seat numbers as a comma-separated string
        });

    expect(response.status).toBe(200);
    expect(response.text).toContain('Booking Summary');
  });

  test('POST /booking-summary/:id should return 404 if flight or seats are not found', async () => {
    const response = await request(app)
        .post(`/booking-summary/INVALID_ID`)
        .send({ selectedSeats: '1A' });
    expect(response.status).toBe(404);
    expect(response.text).toContain('Flight or seat information not found');
  });

  test('POST /booking-summary/:id should update seat status when seats are selected', async () => {
    // Create test flight
    const testFlight = new Flight({
        id: 'BOOK123',
        origin: { name: 'Toronto' },
        destination: { name: 'Vancouver' },
        departureTime: new Date('2024-12-01')
    });
    await testFlight.save();

    // Create test seat data with the "seat" field
    const testSeats = new Seat({
        flightId: 'BOOK123',
        seats: [
            { seat: "1A", status: true },
            { seat: "1B", status: true }
        ]
    });
    await testSeats.save();

    // Simulate the POST request with selected seats in the body
    const response = await request(app)
        .post(`/booking-summary/${testFlight.id}`)
        .send({
            selectedSeats: '1A,1B' // Provide the seat numbers as a comma-separated string
        });

    // Fetch the updated seat data to verify if the seat status was updated
    const updatedSeatData = await Seat.findOne({ flightId: 'BOOK123' });

    // Ensure the seats exist before accessing their status
    const selectedSeat1 = updatedSeatData.seats.find(seat => seat.seat === "1A");
    const selectedSeat2 = updatedSeatData.seats.find(seat => seat.seat === "1B");

    expect(selectedSeat1).toBeDefined(); // Ensure the seat exists
    expect(selectedSeat2).toBeDefined(); // Ensure the seat exists

    // Verify the seat status has been updated to false for the selected seats
    expect(selectedSeat1.status).toBe(false);
    expect(selectedSeat2.status).toBe(false);

    // Check if the response is correct
    expect(response.status).toBe(200);
    expect(response.text).toContain('Booking Summary');
  });

  // Simulate a database error by mocking the Flight and Seat models
  test('POST /booking-summary/:id should handle errors gracefully', async () => {
    // Mock the Mongoose methods to throw an error
    jest.spyOn(Flight, 'findOne').mockRejectedValueOnce(new Error('Database error'));
    jest.spyOn(Seat, 'findOne').mockRejectedValueOnce(new Error('Database error'));
    
    // Mock console.error to suppress logging during test
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    const response = await request(app)
        .post(`/booking-summary/BOOK123`)
        .send({ selectedSeats: '1A' });

    expect(response.status).toBe(500);
    expect(response.text).toContain('Internal Server Error');
    
    // Ensure console.error was called
    expect(consoleError).toHaveBeenCalledWith(expect.objectContaining({ message: 'Database error' }));
    
    // Restore console.error after the test
    consoleError.mockRestore();
  });

  test('GET /choose-seats/:id should handle errors gracefully', async () => {
    // Mock the Flight.findOne and Seat.findOne methods to throw an error
    jest.spyOn(Flight, 'findOne').mockRejectedValueOnce(new Error('Database error'));
    jest.spyOn(Seat, 'findOne').mockRejectedValueOnce(new Error('Database error'));

    // Mock console.error to suppress logging during the test
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    const response = await request(app).get('/choose-seats/CHOOSE123');

    expect(response.status).toBe(500);
    expect(response.text).toContain('Internal Server Error');
    
    // Ensure console.error was called with the error message
    expect(consoleError).toHaveBeenCalledWith(expect.objectContaining({ message: 'Database error' }));
    
    // Restore console.error after the test
    consoleError.mockRestore();
  });
});
