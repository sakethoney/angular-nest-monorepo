describe('frontend-e2e', () => {
  beforeEach(() => cy.visit('/'));

  it('should display the app title', () => {
    cy.contains('Angular Frontend (Nx Monorepo)').should('be.visible');
  });

  it('should show loading counter starting at 5', () => {
    cy.contains('Loading in...').should('be.visible');
    cy.get('div').contains('5').should('be.visible');
  });

  it('should countdown from 5 to 1', () => {
    // Check counter starts at 5
    cy.contains('5').should('be.visible');
    
    // Wait and check it decrements to 4
    cy.wait(1000);
    cy.contains('4').should('be.visible');
    
    // Wait and check it decrements to 3
    cy.wait(1000);
    cy.contains('3').should('be.visible');
    
    // Wait and check it decrements to 2
    cy.wait(1000);
    cy.contains('2').should('be.visible');
    
    // Wait and check it decrements to 1
    cy.wait(1000);
    cy.contains('1').should('be.visible');
  });

  it('should call backend API after countdown and display response', () => {
    // Intercept the API call
    cy.intercept('GET', 'http://localhost:3000/api', {
      statusCode: 200,
      body: 'Hello World!'
    }).as('apiCall');

    // Wait for countdown to complete (5 seconds + small buffer)
    cy.wait(5500);

    // Verify API was called
    cy.wait('@apiCall');

    // Check that loading disappears
    cy.contains('Loading in...').should('not.exist');

    // Check that response is displayed
    cy.contains('Message from Nest.js Backend:').should('be.visible');
    cy.contains('Hello World!').should('be.visible');
    cy.contains('API call completed successfully!').should('be.visible');
  });

  it('should handle API errors gracefully', () => {
    // Intercept the API call with an error
    cy.intercept('GET', 'http://localhost:3000/api', {
      statusCode: 500,
      body: 'Internal Server Error'
    }).as('apiError');

    // Wait for countdown to complete
    cy.wait(5500);

    // Verify API was called
    cy.wait('@apiError');

    // Check that error message is displayed
    cy.contains('Error loading data from backend').should('be.visible');
  });

  it('should complete full user flow with real API', () => {
    // Don't mock the API - test real integration
    // Verify initial state
    cy.contains('Angular Frontend (Nx Monorepo)').should('be.visible');
    cy.contains('Loading in...').should('be.visible');
    cy.contains('Calling backend API...').should('be.visible');

    // Verify counter is working
    cy.contains('5').should('be.visible');
    cy.wait(1000);
    cy.contains('4').should('be.visible');

    // Wait for API call and response (need backend running)
    cy.contains('Message from Nest.js Backend:', { timeout: 10000 }).should('be.visible');
    
    // Verify final state
    cy.contains('Loading in...').should('not.exist');
  });
});
