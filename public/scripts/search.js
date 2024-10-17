// public/scripts/search.js

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('searchButton').addEventListener('click', function (event) {
        event.preventDefault(); // Prevent form submission

        const origin = document.getElementById('from').value;
        const destination = document.getElementById('to').value;
        const departureDate = document.getElementById('departure').value;

        // Fetch flights from the server or use mock data if available in client-side
        // Assuming that `flights` is a global variable or fetched from the server.
        const filteredFlights = flights.filter(flight => {
            return flight.origin === origin &&
                flight.destination === destination &&
                flight.departureTime === departureDate;
        });

        // Display results to the user (you would implement the display logic)
        displaySearchResults(filteredFlights);
    });
});

// Function to display search results (basic example)
function displaySearchResults(filteredFlights) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';

    if (filteredFlights.length === 0) {
        resultsContainer.innerHTML = '<p>No flights found.</p>';
    } else {
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
