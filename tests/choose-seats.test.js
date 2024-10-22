/**
 * @jest-environment jsdom
 */

describe('Seat Selection Functionality', () => {
    beforeEach(() => {
        // Set up our document body with the necessary elements
        document.body.innerHTML = `
            <div id="seatMap">
                <div class="seat available" data-seat="1A">1A</div>
                <div class="seat available" data-seat="1B">1B</div>
                <div class="seat taken" data-seat="1C">1C</div>
                <div class="seat available" data-seat="1D">1D</div>
            </div>
            <input type="hidden" id="selectedSeats" />
        `;

        // Load the choose-seats.js file
        require('../public/scripts/choose-seats');  // Adjust the path as necessary

        // Trigger DOMContentLoaded
        document.dispatchEvent(new Event('DOMContentLoaded'));
    });

    afterEach(() => {
        // Clean up
        document.body.innerHTML = '';
        jest.clearAllMocks();
    });

    test('should select a seat when clicked', () => {
        const seat1A = document.querySelector('[data-seat="1A"]');

        // Simulate click on seat 1A
        seat1A.click();

        // Check if the seat is selected
        expect(seat1A.classList.contains('selected')).toBe(true);
        
        // Check if the selected seats input is updated
        const selectedSeatsInput = document.getElementById('selectedSeats');
        expect(selectedSeatsInput.value).toBe('1A');
    });

    test('should deselect a seat when clicked again', () => {
        const seat1A = document.querySelector('[data-seat="1A"]');

        // Select the seat first
        seat1A.click();

        // Deselect the seat
        seat1A.click();

        // Check if the seat is deselected
        expect(seat1A.classList.contains('selected')).toBe(false);
        
        // Check if the selected seats input is updated
        const selectedSeatsInput = document.getElementById('selectedSeats');
        expect(selectedSeatsInput.value).toBe('');
    });

    test('should allow multiple seat selections', () => {
        const seat1A = document.querySelector('[data-seat="1A"]');
        const seat1B = document.querySelector('[data-seat="1B"]');

        // Select multiple seats
        seat1A.click();
        seat1B.click();

        // Check if both seats are selected
        expect(seat1A.classList.contains('selected')).toBe(true);
        expect(seat1B.classList.contains('selected')).toBe(true);

        // Check if the selected seats input is updated
        const selectedSeatsInput = document.getElementById('selectedSeats');
        expect(selectedSeatsInput.value).toBe('1A,1B');
    });

    test('should deselect a seat when multiple seats are selected', () => {
        const seat1A = document.querySelector('[data-seat="1A"]');
        const seat1B = document.querySelector('[data-seat="1B"]');

        // Select multiple seats
        seat1A.click();
        seat1B.click();

        // Deselect one seat
        seat1A.click();

        // Check if the first seat is deselected
        expect(seat1A.classList.contains('selected')).toBe(false);
        expect(seat1B.classList.contains('selected')).toBe(true);

        // Check if the selected seats input is updated
        const selectedSeatsInput = document.getElementById('selectedSeats');
        expect(selectedSeatsInput.value).toBe('1B');
    });

    test('should not select a taken seat when clicked', () => {
        const seat1C = document.querySelector('[data-seat="1C"]');

        // Attempt to click on the taken seat
        seat1C.click();

        // Check if the seat remains deselected
        expect(seat1C.classList.contains('selected')).toBe(false);
        
        // Check if the selected seats input is still empty
        const selectedSeatsInput = document.getElementById('selectedSeats');
        expect(selectedSeatsInput.value).toBe('');
    });

    test('initial state should have no selected seats', () => {
        // Get the selected seats input
        const selectedSeatsInput = document.getElementById('selectedSeats');

        // Check initial state
        expect(selectedSeatsInput.value).toBe('');
        const seats = document.querySelectorAll('.seat');
        seats.forEach(seat => {
            expect(seat.classList.contains('selected')).toBe(false);
        });
    });
});
