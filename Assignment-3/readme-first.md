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

### 5. Start the Server
After completing the above steps, you can start the server as before:

```bash
node app.js
```

### 6. How to Run Tests
Instructions for running tests will be added here once the test scripts are created.

