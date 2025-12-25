// Test constants
const COUNTDOWN_DURATION_MS = 5000; // 5 seconds countdown
const COUNTDOWN_BUFFER_MS = 500; // Small buffer for timing variations
const COUNTDOWN_TOTAL_WAIT_MS = COUNTDOWN_DURATION_MS + COUNTDOWN_BUFFER_MS;

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
    
    // Use Cypress retry logic to wait for countdown changes
    cy.contains('4', { timeout: 2000 }).should('be.visible');
    cy.contains('3', { timeout: 2000 }).should('be.visible');
    cy.contains('2', { timeout: 2000 }).should('be.visible');
    cy.contains('1', { timeout: 2000 }).should('be.visible');
  });

  it('should call backend API after countdown and display response', () => {
    const apiUrl = Cypress.env('apiUrl') || 'http://localhost:3000/api';
    
    // Intercept the API call
    cy.intercept('GET', apiUrl, {
      statusCode: 200,
      body: 'Hello World!'
    }).as('apiCall');

    // Wait for countdown to complete
    cy.wait(COUNTDOWN_TOTAL_WAIT_MS);

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
    const apiUrl = Cypress.env('apiUrl') || 'http://localhost:3000/api';
    
    // Intercept the API call with an error
    cy.intercept('GET', apiUrl, {
      statusCode: 500,
      body: 'Internal Server Error'
    }).as('apiError');

    // Wait for countdown to complete
    cy.wait(COUNTDOWN_TOTAL_WAIT_MS);

    // Verify API was called
    cy.wait('@apiError');

    // Check that error message is displayed
    cy.contains('Error loading data from backend').should('be.visible');
  });

  it('should complete full user flow with real API', () => {
    const apiUrl = Cypress.env('apiUrl') || 'http://localhost:3000/api';
    
    // Prerequisite: Nest.js backend must be running at http://localhost:3000
    // Perform a simple health check to fail fast if the backend is not available
    cy.request({
      method: 'GET',
      url: apiUrl,
    });
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
