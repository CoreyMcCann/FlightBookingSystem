
// Wait for the DOM to fully load before executing the script
document.addEventListener('DOMContentLoaded', function () {
    // Get references to the one-way and return trip buttons
    const oneWayButton = document.querySelector('.btn-group .btn:first-child');
    const returnTripButton = document.querySelector('.btn-group .btn:last-child');
    const returnField = document.getElementById('return');

    // Event listener for one-way button
    oneWayButton.addEventListener('click', () => {
        // Disable the return date field when one-way is selected
        returnField.disabled = true;
        // Mark the one-way button as active and remove active state from return trip button
        oneWayButton.classList.add('active');
        returnTripButton.classList.remove('active');
    });

    // Event listener for return trip button
    returnTripButton.addEventListener('click', () => {
        // Enable the return date field when return trip is selected
        returnField.disabled = false;
        // Mark the return trip button as active and remove active state from one-way button
        returnTripButton.classList.add('active');
        oneWayButton.classList.remove('active');
    });
});

