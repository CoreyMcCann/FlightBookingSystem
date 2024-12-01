// Wait for the DOM to fully load before executing the script
document.addEventListener('DOMContentLoaded', function () {
    const departureInput = document.getElementById('departure');
    const returnInput = document.getElementById('return');
    const today = new Date().toISOString().split('T')[0];

    // Set minimum departure date to today to prevent selecting past dates
    if (departureInput) {
        departureInput.setAttribute('min', today);

        // Set minimum return date based on selected departure date
        departureInput.addEventListener('change', function () {
            const departureDate = departureInput.value;
            if (returnInput) {
                returnInput.setAttribute('min', departureDate);
            }
        });
    }
});

// Remove the search button event listener and displaySearchResults function 
// since we're using server-side form submission