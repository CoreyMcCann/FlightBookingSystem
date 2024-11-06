# Assignment 3: Backend Database Integration - README-FIRST

## Introduction
Welcome to Assignment 3 of our project! In this phase, we have integrated a backend database using MongoDB to replace the mocked data used in Assignment 2. This README-FIRST file outlines the new steps needed to set up and run the project with the database integration.

Please note that the steps here are additional to those mentioned in the main `README.md` file that you followed to get the project up and running for Assignment 2. Make sure you have already completed the Assignment 2 setup before proceeding with the steps below.

## New Steps for Assignment 3 Setup

### 1. Install Dependencies
We have added `mongoose` for database connectivity in Assignment 3. To install the new dependencies, run:

```bash
npm install mongoose
```

### 2. Install MongoDB
You will need to install MongoDB on your local machine to use as the database server. You can download MongoDB from the official MongoDB website and follow the installation instructions.

### 3. Setup MongoDB
Ensure you have MongoDB installed and running on your local machine. The project connects to a MongoDB instance running at `mongodb://127.0.0.1:27017/FlightBookingSystem`. You can modify the connection string in the code if you need to use a different setup.

### 4. Seed the Database
We have included seed scripts to populate the database with initial data for flights and seats. Run the following commands to seed your local MongoDB instance:

```bash
node seeds/seedFlights.js
node seeds/seedSeats.js
```

These commands will create random flights and seat maps, which are necessary for testing the application.

**Note on MongoDB Atlas**

We chose not to use MongoDB Atlas for this project because of complications with sharing credentials securely. Hosting credentials on GitHub could lead to security vulnerabilities, and we want to ensure that the project setup remains simple and secure for everyone involved.

### 5. Guaranteed Flights for Testing
In seedFlights.js, we have ensured that certain flights are guaranteed to be created, allowing you to test with specific data as in Assignment 2:

- **Dallas to Miami** on **November 15th, 2024**.
- **Two flights from Chicago to Paris** on **November 20th, 2024**.

These flights are included so you can easily verify the functionality that was implemented in Assignment 2.

### 6. Navigating the Database
If you wish to explore the database and inspect the seeded data, follow these steps:

1. Open a Terminal: Open a terminal window.

2. Start the MongoDB Shell: Type mongosh to open the MongoDB shell.

3. Connect to the Database: Use the following command to switch to the correct database:

```bash
use FlightBookingSystem
```

View Flights: To view all the flights in the database, run:

```bash
db.flights.find().pretty()
```

This command will display all the flights, including the guaranteed flights for testing and the randomly generated ones.

View Seats: To view seat information for a specific flight, run:

```bash
db.seats.find({ flightId: "FL100" }).pretty()
```

Replace FL100 with the appropriate flight ID to see the seat map for that flight.

### 7. Start the Server
After completing the above steps, you can start the server as before:

```bash
node app.js
```

If everything is set up correctly, you should see a message like:

```
Serving on port 3000
Database connected
```

#### 5. Open the Application in Your Browser
Once the server is running, open your browser and navigate to:

```
http://localhost:3000
```

You should see the home page of the Flight Booking System.

### 6. How to Run Tests

### To run all tests at once:
```bash
npm test
```

### To run a specific test file:
```bash
npm test <name of test file>
```

## Test Files
The test files are located in the `tests/` directory:
- **`search.test.js`**: Tests front-end flight search functionality.
- **`booking.test.js`**: Tests front-end booking form interaction (i.e., round trip vs one-way selection).
- **`choose-seats.test.js`**: Tests choosing seats page UI logic.
