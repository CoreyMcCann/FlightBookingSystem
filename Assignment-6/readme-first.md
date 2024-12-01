# End-to-End Testing Assignment

This assignment implements end-to-end testing using Cypress for our flight booking system. The tests cover three main functionalities:
- Flight Search
- Flight Selection
- Seat Selection

## Setup Instructions

1. Make sure you are in the project directory
2. Install Cypress and other dependencies:

```bash
npm install
```
## Important Notes
* Make sure your MongoDB server is running before starting the tests 
* Make sure your Express server is running on port 3000 
    * as usual, type `node app.js` to start both the express server and mongodb server. 
* The database should be seeded with test data before running the tests. Use:

```bash
node seeds/seedFlights.js
node seeds/seedSeats.js
```
* To run the tests, open up another terminal, change into the project directory and follow the steps below.

## Running the Tests

You have two options for running the tests:
### Option 1: Cypress GUI (Recommended for first run)

```bash
npx cypress open
```

When the Cypress GUI opens:

1. Click on "E2E Testing"
2. Choose your preferred browser
3. Click "Specs" in the left side bar if not already selected
4. Click on any of the following test files to run them:
- **`flight-search.cy.js`**
- **`flight-selection.cy.js`**
- **`seat-selection.cy.js`**


### Option 2: Command Line

```bash
npx cypress run
```

This will run all tests headlessly in the console and provide a detailed output of all test results.

## Test Files Location
All test files are located in:
`cypress/e2e/`

## Test Scripts
All explanations for the test scripts are in the `end-to-end.pdf` file located in the Assignment-6 directory

* `flight-search.cy.js`: Tests the search functionality including valid searches, invalid searches, and form validation 
* `flight-selection.cy.js`: Tests the flight selection process and details page navigation
* `seat-selection.cy.js`: Tests the seat selection process and booking summary verification

If you encounter any issues running the tests, please ensure all dependencies are properly installed and both the MongoDB and Express servers are running.



