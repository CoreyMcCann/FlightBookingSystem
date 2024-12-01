describe('Flight Search Functionality', () => {
  beforeEach(() => {
    // Visit the search page before each test
    cy.visit('/search', {
      onBeforeLoad(win) {
        // Clear any existing storage
        win.sessionStorage.clear();
      },
      failOnStatusCode: false
    });

    // Wait for the form to be visible
    cy.get('form').should('be.visible');
  });

  it('should search for existing flights from Chicago to Paris', () => {
    // Use the guaranteed flight data from the seed
    cy.get('#from').should('be.visible').type('Chicago');
    cy.get('#to').should('be.visible').type('Paris');

    // Use the specific date from the seed data
    cy.get('#departure').should('be.visible').type('2024-12-20');

    // Submit the search
    cy.get('button[type="submit"]').click();

    // Verify search results page loads
    cy.url().should('include', '/search-results');

    // Check for specific content from the seeded flights
    cy.get('#results').should('exist').within(() => {
      // Verify flight cards are displayed
      cy.get('.card').should('have.length.at.least', 1);

      // Check for specific airlines from the seed data
      cy.contains('.card-title', 'Skyways').should('exist');
      cy.contains('.card-title', 'Global Airlines').should('exist');

      // Verify origin and destination are displayed
      cy.contains('.card-body', 'Chicago').should('exist');
      cy.contains('.card-body', 'Paris').should('exist');
    });
  });

  it('should handle searches with no matching flights', () => {
    // Search for a non-existent route
    cy.get('#from').should('be.visible').type('UnknownCity');
    cy.get('#to').should('be.visible').type('AnotherCity');

    // Use a future date
    cy.get('#departure').should('be.visible').type('2024-12-25');

    // Submit the search
    cy.get('button[type="submit"]').click();

    // Verify no results message
    cy.contains('No flights found. Please try a different search.')
      .should('be.visible');
  });

  it('should prevent search with empty parameters', () => {
    // Try to submit the form without filling in any fields
    cy.get('button[type="submit"]').click();

    // Check HTML5 form validation
    cy.get('#from:invalid').should('exist');
    cy.get('#to:invalid').should('exist');
    cy.get('#departure:invalid').should('exist');
  });

  it('should validate date input', () => {
    // Get today's date
    const today = new Date().toISOString().split('T')[0];

    // Check that departure date input has min attribute set to today
    cy.get('#departure').should('be.visible').then(($input) => {
      const minDate = $input.attr('min');
      expect(minDate).to.equal(today);
    });

    // Try to input a past date
    const pastDate = '2023-01-01';
    cy.get('#from').should('be.visible').type('Chicago');
    cy.get('#to').should('be.visible').type('Paris');
    cy.get('#departure').should('be.visible').type(pastDate);

    // Submit form to check validation
    cy.get('button[type="submit"]').click();

    // Verify we're still on the search page (form wasn't submitted)
    cy.url().should('include', '/search');
  });

  it('should complete a full search flow', () => {
    // Perform a complete search
    cy.get('#from').should('be.visible').type('Chicago');
    cy.get('#to').should('be.visible').type('Paris');
    cy.get('#departure').should('be.visible').type('2024-12-20');

    // Submit the search
    cy.get('button[type="submit"]').click();

    // Verify search results page loads
    cy.url().should('include', '/search-results');

    // Select the first flight
    cy.get('.card .btn-primary').first().should('be.visible').click();

    // Verify flight details page is loaded
    cy.url().should('include', '/flight-details');
    cy.contains('h1', 'Flight Details').should('be.visible');
  });
});