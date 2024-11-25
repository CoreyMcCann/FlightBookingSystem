# Assignment 5: Integration Testing - README-FIRST

## Introduction
Welcome to Assignment 5 of our project! In this phase, we have implemented three integration tests that are explained in the integration_tests.pdf file in the Assignment-5 directory.

Please note that the steps here are additional to those mentioned in the main `README.md` file that you followed to get the project up and running for previous assignments. Make sure you have already completed the Assignment 4 setup located in the Assignment-4 directory before proceeding with the steps below.

## New Steps for Assignment 5 Setup

### 1. Install Dependencies
There are no new dependencies to install.

### 2. How to Run Tests

### To run a specific test file:
```bash
npx jest tests/<name of test file>
```
If you want to remove any deprecation warnings, add ```NODE_NO_WARNINGS=1``` at the start of the command, for example if you wanted to run the  ```flight-search.test.js``` file you would write:
```bash
NODE_NO_WARNINGS=1 npx jest tests/flight-search.test.js
```

## Test Files
The test files are located in the `tests/` directory:
- **`flight-search.test.js`**
- **`seat-booking.test.js`**
- **`flight-seat-integrity.test.js`**
