describe("Universities List", () => {
  it("can load list page", () => {
    cy.visit("/");
    cy.location("pathname").should("eq", "/");
    cy.get("#universitySearchForm").should("exist");
    cy.get("#universitiesList").should("exist");
  });

  it("can search universities by term", () => {
    cy.intercept(/http:\/\/universities.hipolabs.com\//).as("request");
    cy.get("#universitySearchForm input").type("Sydney{enter}");
    cy.url().should("contain", "_q=Sydney");
    cy.get("#universitiesList").should("exist");
    cy.get("#universitiesList ul > li")
      .should("contain", "Sydney")
      .should("length.gt", 0);
    cy.wait("@request").its("request.url").should("contain", "name=Sydney");
  });

  it("can reset search results", () => {
    cy.intercept(/http:\/\/universities.hipolabs.com\//).as("request");
    cy.get("#universitySearchForm input + button").click();
    cy.get("#universitySearchForm input").should("be.empty");
    cy.url().should("not.contain", "_q=");
    cy.wait("@request").its("request.url").should("not.contain", "name=");
  });

  it("can search from term set in page query", () => {
    cy.intercept(/http:\/\/universities.hipolabs.com\//).as("request");
    cy.visit("/?_q=Sydney");
    cy.get("#universitySearchForm input").should("have.value", "Sydney");
    cy.wait("@request").its("request.url").should("contain", "name=Sydney");
  });

  it("can open university website in new tab", () => {
    cy.get("#universitiesList ul > li a").each((item) => {
      cy.get(item).should("have.attr", "target", "_blank");
    });
  });
});
