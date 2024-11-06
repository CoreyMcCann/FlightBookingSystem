# Flight Booking System 

## Getting Started with Flight Booking System

Welcome to the FlightBookingSystem project! Follow these steps to set up the project on your local machine. 

### Prerequisites
Before you begin, make sure you have the following installed on your machine:

1. **Node.js**: Node.js is required to run our server. You can download it here: [Node.js Download](https://nodejs.org/).
2. **Git**: Git is needed to clone the project from GitHub. You can download it here: [Git Download](https://git-scm.com/).
3. **MongoDB**: You will need to install MongoDB on your local machine to use as the database server. You can download MongoDB from the [official MongoDB website](https://www.mongodb.com/try/download/community) and follow the installation instructions.

### Step-by-Step Setup Instructions

#### 1. Clone the Project from GitHub
First, you need to get a copy of the project on your local machine. Open a terminal (or Command Prompt on Windows) and run the following command:

```bash
git clone https://github.com/CoreyMcCann/FlightBookingSystem.git
```

This will create a folder called `FlightBookingSystem` with all the project files.

#### 2. Navigate to the Project Directory
Change into the project directory by running the following command:

```bash
cd InsertChosenPathHere
```

#### 3. Install Project Dependencies
The project uses some third-party libraries that need to be installed. Run the following command to install all necessary dependencies:

```bash
npm install
```

This will install all the libraries and tools required to run the project (listed in the `package.json` file).

#### 4. Install and Setup MongoDB
Ensure you have MongoDB installed and running on your local machine. The project connects to a MongoDB instance running at `mongodb://127.0.0.1:27017/FlightBookingSystem`. You can modify the connection string in the code if you need to use a different setup.

#### 5. Seed the Database
We have included seed scripts to populate the database with initial data for flights and seats. Run the following commands to seed your local MongoDB instance:

```bash
node seeds/seedFlights.js
node seeds/seedSeats.js
```

These commands will create random flights and seat maps, which are necessary for testing the application.

#### 6. Start the Server
To run the project, you need to start the server. Run the following command:

```bash
node app.js 
```

If everything is set up correctly, you should see a message like:

```
Serving on port 3000
```

#### 7. Open the Application in Your Browser
Once the server is running, open your browser and navigate to:

```
http://localhost:3000
```

You should see the home page of the Group-43-CD.

### Common Issues and Troubleshooting
- **Port in Use**: If you get an error that the port is already in use, you can change the port in the `app.js` file or stop whatever is using the port.
- **Node.js Not Recognized**: If the `npm` command is not recognized, make sure you installed Node.js correctly and added it to your system's PATH.

## Functionality Implemented
We have implemented several features as outlined in our requirements specification in Assignment 1:

1. **Flight Search Functionality**: Users can search for flights by providing origin, destination, departure date, and return trip information.
2. **Flight Selection**: Users can view the list of available flights based on their search criteria and select a flight to proceed.
3. **Seat Selection**: Users can choose their seats from the available seating map after selecting a flight.

## Simplifications Made
To simplify the current version of our project, the following modifications have been made:

- **Flight Search Functionality**:
  - During a flight search, users can toggle between **one-way** and **return-trip** options. This only affects the ability to select a return date; the actual logic to select a return flight has not yet been implemented. However, there is some error checking in place: users cannot select a departure date in the past, and if they choose a return trip, they cannot select a return date that is before the departure date.
  - Users can also select the number of passengers, but this does not impact the behavior of the system after the search. In other words, users are not required to select as many seats as they indicated in the passenger count. There is also error checking to ensure that users cannot select zero or a negative number of passengers.

## Project Structure Overview
- **views/**: Contains the HTML (EJS) templates for the different pages of the website.
- **public/**: Contains CSS files and other static resources.
- **seeds/**: Contains seed scripts used to populate the MongoDB database with initial data.
- **app.js**: The main server file that runs the backend logic.
- **scripts/**: Contains JavaScript files that handle front-end logic (e.g., seat selection, form validation).

## Backend Information
The backend functionality has been updated to use **MongoDB** for persistent data storage. We now connect to a MongoDB instance running locally to store flight and seat data. Previously, the data was dynamically generated and not saved, which meant it was different every time the program ran. Now, data is persistent, allowing for a more realistic application experience. 

## Testing Search Functionality
Since flight data is now persisted in MongoDB, we have included seed scripts to add some random flights. However to facilitate testing we have kept the same guaranteed 
flights from assignment 2:
- **Dallas to Miami** on **November 15th, 2024**.
- **Two flights from Chicago to Paris** on **November 20th, 2024**.

These guaranteed flights are always available when performing a search, which allows for consistent testing of the search functionality.

## Testing Instructions
For instructions on running the tests, refer to the bottom of [readme-first](./Assignment-3/readme-first.md).

Feel free to reach out if you have any questions or issues while setting up or testing the project. 









