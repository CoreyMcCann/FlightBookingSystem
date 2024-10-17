# Getting Started with FlightBookingSystem

Follow these steps to set up the project on your local machine.

## Prerequisites
Before you begin, make sure you have the following installed on your machine:

1. **Node.js**: Node.js is required to run our server. You can download it here: [Node.js Download](https://nodejs.org/).
2. **Git**: Git is needed to clone the project from GitHub. You can download it here: [Git Download](https://git-scm.com/).

## Step-by-Step Setup Instructions

### 1. Clone the Project from GitHub
First, you need to get a copy of the project on your local machine. Open a terminal (or Command Prompt on Windows), navigate to a directory where you want the project to be, and run the following command:

```bash
git clone https://github.com/CoreyMcCann/FlightBookingSystem.git
```

This will create a folder called `FlightBookingSystem` with all the project files.

### 2. Navigate to the Project Directory
Change into the project directory by running the following command:

```bash
cd InsertChosenPathHere
```

### 3. Install Project Dependencies
The project uses some third-party libraries that need to be installed. Run the following command to install all necessary dependencies:

```bash
npm install
```

This will install all the libraries and tools required to run the project (listed in the `package.json` file).

### 4. Start the Server
To run the project, you need to start the server. Run the following command:

```bash
npm start
```

If everything is set up correctly, you should see a message like:

```
Serving on port 3000
```

### 5. Open the Application in Your Browser
Once the server is running, open your browser and navigate to:

```
http://localhost:3000
```

You should see the home page of the FlightBookingSystem.

## Common Issues and Troubleshooting
- **Port in Use**: If you get an error that the port is already in use, you can change the port in the `app.js` file or stop whatever is using the port.
- **Node.js Not Recognized**: If the `npm` command is not recognized, make sure you installed Node.js correctly and added it to your system's PATH.

## Project Structure Overview
- **views/**: Contains the HTML (EJS) templates for the different pages of the website.
- **public/**: Contains CSS files and other static resources.
- **data/**: Contains the flight and seat data used by the application.
- **app.js**: The main server file that runs the backend logic.

## How to Make Changes
If you need to make changes to the project:
1. Open the project in a code editor (e.g., **VS Code**).
2. Edit the files as needed.
3. Save your changes and refresh the browser to see the updates.

## Running Tests (Optional)
If you want to run tests to verify that everything works correctly:
1. **Install Mocha** (a testing framework) by running:
   ```bash
   npm install mocha --save-dev
   ```
2. **Run Tests**:
   ```bash
   npm test
   ```

## Additional Resources
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Express.js Documentation](https://expressjs.com/)
