/**
 * @jest-environment jsdom
 */

describe('Booking Form Functionality', () => {
    beforeEach(() => {
        // Set up our document body with the necessary elements
        document.body.innerHTML = `
            <div class="btn-group">
                <button class="btn">One Way</button>
                <button class="btn">Return Trip</button>
            </div>
            <input type="date" id="return">
        `;

        // Load the booking.js file
        require('../public/scripts/booking.js');
        
        // Trigger DOMContentLoaded
        document.dispatchEvent(new Event('DOMContentLoaded'));
    });

    afterEach(() => {
        // Clean up
        document.body.innerHTML = '';
        jest.clearAllMocks();
    });

    test('one-way button disables return field and updates button states', () => {
        // Get DOM elements
        const oneWayButton = document.querySelector('.btn-group .btn:first-child');
        const returnTripButton = document.querySelector('.btn-group .btn:last-child');
        const returnField = document.getElementById('return');

        // Simulate click on one-way button
        oneWayButton.click();

        // Check if return field is disabled
        expect(returnField.disabled).toBe(true);

        // Check if correct button is marked as active
        expect(oneWayButton.classList.contains('active')).toBe(true);
        expect(returnTripButton.classList.contains('active')).toBe(false);
    });

    test('return trip button enables return field and updates button states', () => {
        // Get DOM elements
        const oneWayButton = document.querySelector('.btn-group .btn:first-child');
        const returnTripButton = document.querySelector('.btn-group .btn:last-child');
        const returnField = document.getElementById('return');

        // Simulate click on return trip button
        returnTripButton.click();

        // Check if return field is enabled
        expect(returnField.disabled).toBe(false);

        // Check if correct button is marked as active
        expect(returnTripButton.classList.contains('active')).toBe(true);
        expect(oneWayButton.classList.contains('active')).toBe(false);
    });

    test('buttons toggle correctly when clicked in sequence', () => {
        // Get DOM elements
        const oneWayButton = document.querySelector('.btn-group .btn:first-child');
        const returnTripButton = document.querySelector('.btn-group .btn:last-child');
        const returnField = document.getElementById('return');

        // Click sequence: one-way -> return -> one-way
        oneWayButton.click();
        expect(returnField.disabled).toBe(true);
        expect(oneWayButton.classList.contains('active')).toBe(true);

        returnTripButton.click();
        expect(returnField.disabled).toBe(false);
        expect(returnTripButton.classList.contains('active')).toBe(true);

        oneWayButton.click();
        expect(returnField.disabled).toBe(true);
        expect(oneWayButton.classList.contains('active')).toBe(true);
    });

    test('initial state has return field enabled and no active buttons', () => {
        // Get DOM elements
        const oneWayButton = document.querySelector('.btn-group .btn:first-child');
        const returnTripButton = document.querySelector('.btn-group .btn:last-child');
        const returnField = document.getElementById('return');

        // Check initial state
        expect(returnField.disabled).toBe(false);
        expect(oneWayButton.classList.contains('active')).toBe(false);
        expect(returnTripButton.classList.contains('active')).toBe(false);
    });
});
