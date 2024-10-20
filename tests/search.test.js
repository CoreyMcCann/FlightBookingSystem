/**
 * @jest-environment jsdom
 */

describe('Flight Search Functionality', () => {
    let mockFlights;

    beforeEach(() => {
        document.body.innerHTML = `
            <form id="searchForm">
                <input id="from" type="text" required>
                <input id="to" type="text" required>
                <input id="departure" type="date" required>
                <input id="return" type="date">
                <button id="searchButton" type="submit">Search</button>
                <div id="searchResults"></div>
            </form>
        `;

        mockFlights = [
            {
                airline: 'Test Airlines',
                origin: 'NYC',
                destination: 'LAX',
                departureTime: '2024-12-25',
                price: 299.99
            },
            {
                airline: 'Mock Airways',
                origin: 'SFO',
                destination: 'CHI',
                departureTime: '2024-12-26',
                price: 199.99
            }
        ];

        global.flights = mockFlights;
        global.alert = jest.fn();

        require('../public/scripts/search.js');
        
        // Trigger DOMContentLoaded
        document.dispatchEvent(new Event('DOMContentLoaded'));
    });

    afterEach(() => {
        jest.clearAllMocks();
        document.body.innerHTML = '';
    });

    test('prevents search when required fields are empty', () => {
        const searchButton = document.getElementById('searchButton');
        const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        });
        
        searchButton.dispatchEvent(clickEvent);

        const resultsContainer = document.getElementById('searchResults');
        expect(resultsContainer.innerHTML).toBe('');
    });

    test('allows search when all required fields are filled', () => {
        // Fill in all required fields
        document.getElementById('from').value = 'NYC';
        document.getElementById('to').value = 'LAX';
        document.getElementById('departure').value = '2024-12-25';
        
        // Get form and button
        const searchButton = document.getElementById('searchButton');
        
        // Create a click event
        const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        });
        
        // Dispatch click event on the button
        searchButton.dispatchEvent(clickEvent);
        
        // Verify search results are shown
        const resultsContainer = document.getElementById('searchResults');
        expect(resultsContainer.innerHTML).toContain('Test Airlines');
    });

    test('sets minimum departure date to today', () => {
        const today = new Date().toISOString().split('T')[0];
        const departureInput = document.getElementById('departure');
        expect(departureInput.getAttribute('min')).toBe(today);
    });

    test('sets minimum return date based on selected departure date', () => {
        const departureInput = document.getElementById('departure');
        const returnInput = document.getElementById('return');
        const testDate = '2024-12-25';
        
        departureInput.value = testDate;
        departureInput.dispatchEvent(new Event('change'));
        
        expect(returnInput.getAttribute('min')).toBe(testDate);
    });

    test('performs search with valid inputs', () => {
        document.getElementById('from').value = 'NYC';
        document.getElementById('to').value = 'LAX';
        document.getElementById('departure').value = '2024-12-25';
        
        const searchButton = document.getElementById('searchButton');
        const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        });
        
        searchButton.dispatchEvent(clickEvent);
        
        const resultsContainer = document.getElementById('searchResults');
        expect(resultsContainer.innerHTML).toContain('Test Airlines');
        expect(resultsContainer.innerHTML).toContain('NYC');
        expect(resultsContainer.innerHTML).toContain('LAX');
        expect(resultsContainer.innerHTML).toContain('299.99');
    });

    test('prevents search with past dates', () => {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 1);
        const pastDateString = pastDate.toISOString().split('T')[0];
        
        document.getElementById('from').value = 'NYC';
        document.getElementById('to').value = 'LAX';
        document.getElementById('departure').value = pastDateString;
        
        const searchButton = document.getElementById('searchButton');
        const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        });
        
        searchButton.dispatchEvent(clickEvent);
        
        expect(global.alert).toHaveBeenCalledWith(
            'Departure date cannot be in the past. Please select a valid date.'
        );
    });
});
