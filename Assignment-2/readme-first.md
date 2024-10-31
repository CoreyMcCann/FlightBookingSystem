# FlightBookingSystem - Test Instructions

## Authors
- **Corey McCann** - 21ccm12@queensu.ca
- **Aatif Mohammad** - 22am37@queensu.ca
- **Benjamin Leray** - 21bl45@queensu.ca

## Overview
This document provides instructions on how to run the test cases for the Flight Booking System. For detailed instructions on getting the application up and running, as well as other information about the project, please refer to the main README file.

## Setup

All the dependencies should be covered by `npm install` since they are included in the `package.json` file.

## Running Tests
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
