describe('Testing Grid Page', () => {
  it('Adding new fruits', () => {
    cy.visit('/chart');
    cy.contains('Add new fruit')
      .click()
      .click()
      .click()
      .click()
      .click()
      .click();

    cy.contains('Raspberries');
    cy.contains('Blueberries');
    cy.contains('Pears');
    cy.contains('Mango');
  });
});
