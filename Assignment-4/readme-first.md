# Assignment 4: Coverage Testing - README-FIRST

## Introduction
Welcome to Assignment 4 of our project! In this phase, we have tested the code coverage of our test cases that we wrote in assignment-2. Also we created some tests for our backend routes and ran the coverage tests on those as well. This README-FIRST file outlines the new steps needed to set up and run the test scripts.

Please note that the steps here are additional to those mentioned in the main `README.md` file that you followed to get the project up and running for Assignment 2 and 3. Make sure you have already completed the Assignment 2 and 3 setup before proceeding with the steps below.

## New Steps for Assignment 4 Setup

### 1. Install Dependencies
We have added a few dependencies to help with coverage testing. To install the new dependencies, run:

```bash
npm install 
```

### 2. How to Run Tests

### To run all tests at once:
```bash
npm test
```
This will run all of the tests as well as show the code coverage for all of the tests

### To run a specific test file:
```bash
npm test <name of test file>
```
This will run the specific test as well as give you the code coverage for that specific test

## Test Files
The test files are located in the `tests/` directory:
- **`search.test.js`**: Tests front-end flight search functionality.
- **`booking.test.js`**: Tests front-end booking form interaction (i.e., round trip vs one-way selection).
- **`choose-seats.test.js`**: Tests choosing seats page UI logic.
- **`app.test.js`**: Tests back-end routes.
