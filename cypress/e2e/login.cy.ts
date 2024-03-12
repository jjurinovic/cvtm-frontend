describe('Login', () => {
  it('Show correct page title', () => {
    cy.visit('/');
    cy.title().should('equal', 'Login | CVTM');
  });
});
