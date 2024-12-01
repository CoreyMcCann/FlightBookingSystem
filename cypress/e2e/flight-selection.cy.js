describe('Flight Selection Functionality', () => {
    beforeEach(() => {
        // Start from the search page and perform a search that will show guaranteed flights
        cy.visit('/search');
        cy.get('form').should('be.visible');

        // Search for the guaranteed Chicago to Paris flight
        cy.get('#from').should('be.visible').type('Chicago');
        cy.get('#to').should('be.visible').type('Paris');
        cy.get('#departure').should('be.visible').type('2024-12-20');
        cy.get('button[type="submit"]').click();
    });

    it('should display correct flight details for Global Airlines flight', () => {
        // Verify we're on the search results page
        cy.url().should('include', '/search-results');

        // Find and click on the Global Airlines flight
        cy.get('#results').within(() => {
            cy.contains('.card', 'Global Airlines').within(() => {
                // Verify flight information before selecting
                cy.contains('.card-title', 'Global Airlines').should('exist');
                cy.contains('.card-title', '$450').should('exist');
                cy.contains('From: Chicago').should('exist');
                cy.contains('To: Paris').should('exist');

                // Click the Check button for this flight
                cy.get('.btn-primary').click();
            });
        });

        // Verify flight details page
        cy.url().should('include', '/flight-details');
        cy.get('.card').within(() => {
            cy.contains('.card-title', 'Global Airlines').should('exist');
            cy.contains('From: Chicago').should('exist');
            cy.contains('To: Paris').should('exist');
            cy.contains('Price: $450').should('exist');
        });

        // Verify the presence of the Choose Seats button
        cy.get('.btn-primary').contains('Choose Seats').should('exist');
    });

    it('should display correct flight details for Skyways flight', () => {
        // Verify we're on the search results page
        cy.url().should('include', '/search-results');

        // Find and click on the Skyways flight
        cy.get('#results').within(() => {
            cy.contains('.card', 'Skyways').within(() => {
                // Verify flight information before selecting
                cy.contains('.card-title', 'Skyways').should('exist');
                cy.contains('.card-title', '$475').should('exist');
                cy.contains('From: Chicago').should('exist');
                cy.contains('To: Paris').should('exist');

                // Click the Check button for this flight
                cy.get('.btn-primary').click();
            });
        });

        // Verify flight details page
        cy.url().should('include', '/flight-details');
        cy.get('.card').within(() => {
            cy.contains('.card-title', 'Skyways').should('exist');
            cy.contains('From: Chicago').should('exist');
            cy.contains('To: Paris').should('exist');
            cy.contains('Price: $475').should('exist');
        });

        // Verify the presence of the Choose Seats button
        cy.get('.btn-primary').contains('Choose Seats').should('exist');
    });

    it('should allow navigation back to search results', () => {
        // Select a flight
        cy.contains('.card', 'Global Airlines').within(() => {
            cy.get('.btn-primary').click();
        });

        // Verify we're on the details page
        cy.url().should('include', '/flight-details');

        // Click the back button
        cy.get('.btn-secondary').click();

        // Verify we're back on the search results page with our previous search results
        cy.url().should('include', '/search-results');
        cy.contains('.card-title', 'Global Airlines').should('exist');
        cy.contains('.card-title', 'Skyways').should('exist');
    });
});