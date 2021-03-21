describe("Registration", () => {
  before(() => {
    cy.writeFile("data/users.json", "[]", "utf-8");
  });

  it("can register using valid credentials", () => {
    cy.visit("/register");
    cy.intercept("POST", "/api/register").as("request");
    cy.get("[name=email]").type("endy.hardy@outlook.com");
    cy.get("[name=fullName]").type("Endy Hardy");
    cy.get("[name=password]").type("Secret123");
    cy.get("[name=confirmPassword]").type("Secret123{enter}");

    cy.wait("@request").then((req) => {
      cy.wrap(req)
        .its("request.body.email")
        .should("eq", "endy.hardy@outlook.com");
      cy.wrap(req).its("request.body.fullName").should("eq", "Endy Hardy");
      cy.wrap(req).its("request.body.password").should("eq", "Secret123");
      cy.wrap(req)
        .its("request.body.confirmPassword")
        .should("eq", "Secret123");
      cy.wrap(req).its("response.statusCode").should("eq", 200);
    });
    cy.location("pathname").should("eq", "/login");
  });

  it("prevents registering using existing credentials", () => {
    cy.visit("/register");
    cy.intercept("POST", "/api/register").as("request");
    cy.get("[name=email]").type("endy.hardy@outlook.com");
    cy.get("[name=fullName]").type("Endy Hardy");
    cy.get("[name=password]").type("Secret123");
    cy.get("[name=confirmPassword]").type("Secret123{enter}");
    cy.wait("@request").then((req) => {
      cy.wrap(req).its("response.statusCode").should("eq", 500);
      cy.wrap(req)
        .its("response.body.message")
        .should("eq", "User with the same email address already exists.");
    });
  });
});
