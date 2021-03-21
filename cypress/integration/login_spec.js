describe("Login", () => {
  before(() => {
    cy.writeFile("data/users.json", "[]", "utf-8");
    cy.request("POST", "/api/register", {
      email: "endy.hardy@outlook.com",
      fullName: "Endy Hardy",
      password: "Secret123",
      confirmPassword: "Secret123",
    });
  });

  it("can log in with correct credentials", () => {
    cy.visit("/login");
    cy.location("pathname").should("eq", "/login");
    cy.intercept("post", "/api/auth").as("request");
    cy.get("input[name=email]").type("endy.hardy@outlook.com");
    cy.get("input[name=password]").type("Secret123{enter}");

    cy.wait("@request").then((req) => {
      cy.wrap(req).its("response.body.token").as("token");
    });

    cy.location("pathname").should("eq", "/");
    cy.get("#logoutButton").should("exist").should("contain", "Endy Hardy");
    cy.get("@token").then((token) => {
      cy.wrap(localStorage.getItem("authToken")).should("eq", token);
    });
  });

  it("prevents logging in with incorrect credentials", () => {
    cy.visit("/login");
    cy.intercept("post", "/api/auth").as("request");
    cy.get("input[name=email]").type("endy.hardy@outlook.com");
    cy.get("input[name=password]").type("IncorrectPassword{enter}");

    cy.wait("@request").then((req) => {
      cy.wrap(req).its("response.statusCode").should("eq", 403);
      cy.location("pathname").should("eq", "/login");
      cy.wrap(localStorage.getItem("authToken")).should("be.null");
    });
  });
});
