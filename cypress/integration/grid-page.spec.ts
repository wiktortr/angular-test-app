describe('Testing Grid Page', () => {

  it('Testing', () => {

    cy.intercept(
      {
        method: 'GET',
        url: '/assets/data.json'
      },
      {
        fixture: 'chart-data.json'
      }
    ).as('getData');

    cy.visit('/grid');
    cy.contains('Foo').click();
    cy.contains('Get Selected').click();
    cy.contains('Selected items:\nFoo - Bar - 123');
    
  });

});