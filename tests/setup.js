const { TextEncoder, TextDecoder } = require('util');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod;

// Disconnect from any existing connection (important!)
beforeAll(async () => {
  try {
    // Disconnect from any existing connection
    await mongoose.disconnect();
    
    // Create the in-memory database
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    
    // Connect to the in-memory database without deprecated options
    await mongoose.connect(uri);
  } catch (error) {
    console.error('Error in test setup:', error);
  }
});

afterAll(async () => {
  try {
    await mongoose.connection.close();
    await mongod.stop();
  } catch (error) {
    console.error('Error in test teardown:', error);
  }
});

beforeEach(async () => {
  try {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany();
    }
  } catch (error) {
    console.error('Error in test cleanup:', error);
  }
});
