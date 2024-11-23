const { TextEncoder, TextDecoder } = require('util');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod;

// Add console mocking at the very beginning
beforeAll(async () => {
  // Silence console outputs during tests
  jest.spyOn(console, 'log').mockImplementation(() => { });
  jest.spyOn(console, 'error').mockImplementation(() => { });
  jest.spyOn(console, 'warn').mockImplementation(() => { });

  try {
    // Disconnect from any existing connection
    await mongoose.disconnect();

    // Create the in-memory database
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    // Connect to the in-memory database without deprecated options
    await mongoose.connect(uri);
  } catch (error) {
    // This error won't be logged due to console.error being mocked
    throw error; // Still throw the error to fail the test
  }
});

afterAll(async () => {
  try {
    await mongoose.connection.close();
    await mongod.stop();

    // Restore console functionality
    console.log.mockRestore();
    console.error.mockRestore();
    console.warn.mockRestore();
  } catch (error) {
    throw error;
  }
});

beforeEach(async () => {
  try {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany();
    }
  } catch (error) {
    throw error;
  }
});
