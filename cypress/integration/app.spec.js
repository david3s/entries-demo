it('should open page', () => {
  const testEntryValue = 'testing' + Math.random();
  cy.visit('http://localhost:3000');
  cy.findByPlaceholderText('type entry').type(testEntryValue);
  cy.findByRole('button', {name: 'Create'}).click();
  cy.findByText(testEntryValue).its('length').should('be.gte', 0);
  cy.findByText(testEntryValue).next().click();
  cy.findByText(testEntryValue).should('not.exist');
})