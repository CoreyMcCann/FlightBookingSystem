describe('Seat Selection Functionality', () => {
    beforeEach(() => {
        // Start from the search page and perform a search
        cy.visit('/search');
        cy.get('form').should('be.visible');

        // Search for the guaranteed Chicago to Paris flight
        cy.get('#from').should('be.visible').type('Chicago');
        cy.get('#to').should('be.visible').type('Paris');
        cy.get('#departure').should('be.visible').type('2024-12-20');
        cy.get('button[type="submit"]').click();

        // Select the Global Airlines flight
        cy.get('#results').within(() => {
            cy.contains('.card', 'Global Airlines').within(() => {
                cy.get('.btn-primary').click();
            });
        });

        // On flight details page, click Choose Seats
        cy.url().should('include', '/flight-details');
        cy.contains('.btn-primary', 'Choose Seats').click();
    });

    it('should allow selecting available seats and proceed to booking summary', () => {
        // Verify we're on the choose seats page
        cy.url().should('include', '/choose-seats');

        // Get first available seat and store its number
        let selectedSeatNumbers = [];

        // Select two available seats and store their numbers
        cy.get('button.seat.available').first().then($button => {
            selectedSeatNumbers.push($button.text().trim());
            cy.wrap($button).click();
        });

        cy.get('button.seat.available').eq(1).then($button => {
            selectedSeatNumbers.push($button.text().trim());
            cy.wrap($button).click();
        });

        // Click confirm button
        cy.get('#confirmButton').click();

        // Verify booking summary page
        cy.url().should('include', '/booking-summary');

        // Verify flight details and selected seats appear in summary
        cy.get('.card-body').within(() => {
            cy.contains('Global Airlines').should('exist');
            cy.contains('From: Chicago').should('exist');
            cy.contains('To: Paris').should('exist');
            cy.contains('Selected Seats:').should('exist');
            // Verify each selected seat number appears
            selectedSeatNumbers.forEach(seatNumber => {
                cy.contains(seatNumber).should('exist');
            });
        });
    });

    it('should not allow selecting taken seats', () => {
        cy.url().should('include', '/choose-seats');
        cy.get('button.seat.taken').should('have.attr', 'disabled');
    });

    it('should allow deselecting a selected seat', () => {
        cy.url().should('include', '/choose-seats');

        // Get the first available seat's number
        let seatNumber;

        cy.get('button.seat.available').first().then($button => {
            seatNumber = $button.text().trim();
            cy.wrap($button).click();
            // Verify seat is now selected
            cy.wrap($button).should('have.class', 'selected');
            // Click again to deselect
            cy.wrap($button).click();
            // Verify seat is no longer selected
            cy.wrap($button).should('not.have.class', 'selected');
        });
    });

    it('should maintain seat selection state while selecting multiple seats', () => {
        cy.url().should('include', '/choose-seats');

        let selectedSeatNumbers = [];

        // Select three seats and verify they stay selected
        cy.get('button.seat.available').first().then($button => {
            selectedSeatNumbers.push($button.text().trim());
            cy.wrap($button).click().should('have.class', 'selected');
        });

        cy.get('button.seat.available').eq(1).then($button => {
            selectedSeatNumbers.push($button.text().trim());
            cy.wrap($button).click().should('have.class', 'selected');
            // Verify first seat is still selected
            cy.get('button.seat').contains(selectedSeatNumbers[0]).should('have.class', 'selected');
        });

        cy.get('button.seat.available').eq(2).then($button => {
            selectedSeatNumbers.push($button.text().trim());
            cy.wrap($button).click().should('have.class', 'selected');
            // Verify previous seats are still selected
            cy.get('button.seat').contains(selectedSeatNumbers[0]).should('have.class', 'selected');
            cy.get('button.seat').contains(selectedSeatNumbers[1]).should('have.class', 'selected');
        });
    });
});