describe('Testing Landing Page', () => {
  it('Check redirection to home page', () => {
    cy.visit('/');
    cy.url().should('include', '/home');
  });

  it('Trying to get access to grid page', () => {
    cy.visit('/');
    cy.contains('Grid').click();
    cy.url().should('include', '/grid');
  });

  it('Trying to get access to chart page', () => {
    cy.visit('/');
    cy.contains('Chart').click();
    cy.url().should('include', '/chart');
  });
});
