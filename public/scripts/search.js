// Wait for the DOM to fully load before executing the script
document.addEventListener('DOMContentLoaded', function () {
    const departureInput = document.getElementById('departure');
    const returnInput = document.getElementById('return');
    const today = new Date().toISOString().split('T')[0];

    // Set minimum departure date to today to prevent selecting past dates
    departureInput.setAttribute('min', today);

    // Set minimum return date based on selected departure date
    departureInput.addEventListener('change', function () {
        const departureDate = departureInput.value;
        returnInput.setAttribute('min', departureDate); // Ensure return date is after or on the same day as departure
    });
});

// Add event listener for the search button to handle form submission logic
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('searchButton').addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        const origin = document.getElementById('from').value;
        const destination = document.getElementById('to').value;
        const departureDate = document.getElementById('departure').value;
        const today = new Date().toISOString().split('T')[0];

        // Check if the departure date is in the past and alert the user
        if (departureDate < today) {
            alert("Departure date cannot be in the past. Please select a valid date.");
            return;
        }

        // Continue with the search logic if date is valid
        // Assuming `flights` is a global variable or fetched from the server.
        const filteredFlights = flights.filter(flight => {
            return flight.origin === origin &&
                flight.destination === destination &&
                flight.departureTime === departureDate;
        });

        // Display results to the user (implement the display logic)
        displaySearchResults(filteredFlights);
    });
});

// Function to display search results (basic example)
function displaySearchResults(filteredFlights) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = ''; // Clear previous results

    // If no flights are found, display a message
    if (filteredFlights.length === 0) {
        resultsContainer.innerHTML = '<p>No flights found.</p>';
    } else {
        // Display each filtered flight in the results container
        filteredFlights.forEach(flight => {
            const flightElement = document.createElement('div');
            flightElement.className = 'flight-result';
            flightElement.innerHTML = `
                <p><strong>${flight.airline}</strong> from ${flight.origin} to ${flight.destination}</p>
                <p>Departure: ${flight.departureTime} | Price: $${flight.price}</p>
            `;
            resultsContainer.appendChild(flightElement);
        });
    }
}
