// Wait for the DOM to fully load before executing the script
document.addEventListener('DOMContentLoaded', function () {
    // Get references to the seat map container and the hidden input for storing selected seats
    const seatMap = document.getElementById('seatMap');
    const selectedSeatsInput = document.getElementById('selectedSeats');
    let selectedSeats = []; // Array to store the selected seats

    // Event listener for seat selection
    seatMap.addEventListener('click', function (event) {
        // Check if the clicked element is an available seat
        if (event.target.classList.contains('available')) {
            // Toggle the 'selected' class to visually mark the seat as selected or deselected
            event.target.classList.toggle('selected');
            const seat = event.target.dataset.seat; // Get the seat identifier (e.g., '1A')

            if (event.target.classList.contains('selected')) {
                // Add the seat to the selectedSeats array if it's being selected
                selectedSeats.push(seat);
            } else {
                // Remove the seat from the selectedSeats array if it's being deselected
                selectedSeats = selectedSeats.filter(s => s !== seat);
            }

            // Update the hidden input field with the selected seats as a comma-separated string
            selectedSeatsInput.value = selectedSeats.join(',');
        }
    });
});
