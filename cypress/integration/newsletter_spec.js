describe("Newsletter", () => {
  it("can subscribe to newsletter", () => {
    cy.visit("/newsletter");
    cy.intercept("post", "/api/registerNewsletter").as("request");
    cy.get("input[name=email]").type("endy.hardy@outlook.com{enter}");
    cy.wait("@request").then((req) => {
      cy.wrap(req).its("response.statusCode").should("eq", 200);
      cy.get("input[name=email]").should("not.exist");
    });
  });
});
