# FlightBookingSystem - Final Project Documentation

## Getting Started with FlightBookingSystem

Welcome to the FlightBookingSystem project! Follow these steps to set up the project on your local machine. 

### Prerequisites
Before you begin, make sure you have the following installed on your machine:

1. **Node.js**: Node.js is required to run our server. You can download it here: [Node.js Download](https://nodejs.org/).
2. **Git**: Git is needed to clone the project from GitHub. You can download it here: [Git Download](https://git-scm.com/).

### Step-by-Step Setup Instructions

#### 1. Clone the Project from GitHub
First, you need to get a copy of the project on your local machine. Open a terminal (or Command Prompt on Windows), navigate to a directory where you want the project to be, and run the following command:

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

#### 4. Start the Server
To run the project, you need to start the server. Run the following command:

```bash
node app.js 
```

If everything is set up correctly, you should see a message like:

```
Serving on port 3000
```

#### 5. Open the Application in Your Browser
Once the server is running, open your browser and navigate to:

```
http://localhost:3000
```

You should see the home page of the FlightBookingSystem.

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
- **data/**: Contains the flight and seat data used by the application.
- **app.js**: The main server file that runs the backend logic.
- **scripts/**: Contains JavaScript files that handle front-end logic (e.g., seat selection, form validation).

## Backend Information
The backend functionality implemented is minimal and is limited to the necessary routing. All of the data is **dynamically created** and **not saved**, which means that most of the data changes each time you run the program. In the future, we plan to make this data persistent by using a database and replacing the current in-memory logic with database queries.

## Testing Search Functionality
Since flight data is dynamically generated, we have included some guaranteed flights to facilitate testing:
- **Dallas to Miami** on **November 15th, 2024**.
- **Two flights from Chicago to Paris** on **November 20th, 2024**.

These guaranteed flights are always available when performing a search, which allows for consistent testing of the search functionality.

## Testing Instructions
We have also written test scripts for the system, including both success and failure cases. Instructions to run these tests can be found in the `readme-first` file inside the **Assignment-2** directory.

Feel free to reach out if you have any questions or issues while setting up or testing the project. 











