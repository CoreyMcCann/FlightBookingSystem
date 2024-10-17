document.addEventListener('DOMContentLoaded', function () {
    const seatMap = document.getElementById('seatMap');
    const selectedSeatsInput = document.getElementById('selectedSeats');
    let selectedSeats = [];

    seatMap.addEventListener('click', function (event) {
        if (event.target.classList.contains('available')) {
            event.target.classList.toggle('selected');
            const seat = event.target.dataset.seat;
            if (event.target.classList.contains('selected')) {
                selectedSeats.push(seat);
            } else {
                selectedSeats = selectedSeats.filter(s => s !== seat);
            }
            selectedSeatsInput.value = selectedSeats.join(',');
        }
    });
});