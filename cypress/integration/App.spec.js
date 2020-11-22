describe ('Test App', () => {

  it ('launches', () => {
    cy.visit ('/');
  });

  it ('lets users sign in', () => {
    cy.visit('/');
    cy.contains("Sign In").click();
    cy.get(`input[placeholder="Enter Email"]`).type(
        "test@gmail.com"
      );
    cy.get(`input[placeholder="Enter Password"]`).type(
      "password"
    );
    cy.contains("Sign In").click();
  });

});
