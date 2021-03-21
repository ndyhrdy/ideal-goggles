describe("Authenticated User", () => {
  before(() => {
    cy.writeFile("data/users.json", "[]", "utf-8");
    cy.request("POST", "/api/register", {
      email: "endy.hardy@outlook.com",
      fullName: "Endy Hardy",
      password: "Secret123",
      confirmPassword: "Secret123",
    });
  });

  beforeEach(() => {
    cy.request("POST", "/api/auth", {
      email: "endy.hardy@outlook.com",
      password: "Secret123",
    })
      .its("body.token")
      .as("token");
    cy.get("@token").then((token) => {
      localStorage.setItem("authToken", token);
    });
  });

  it("shows user details", () => {
    cy.visit("/");
    cy.get("#logoutButton").should("exist").should("contain", "Endy Hardy");
  });

  it("shows favorite university button", () => {
    cy.visit("/");
    cy.get("#universitiesList ul > li").each((item, index) => {
      if (index < 5) {
        cy.get(item).within(() => {
          cy.get("button.fav-button").should("exist");
        });
      }
    });
  });

  it("can set universities as favorite", () => {
    cy.visit("/");
    cy.get("#universitiesList ul > li").each((item, index) => {
      if (index < 3) {
        cy.get(item).within(() => {
          cy.intercept("POST", "/api/favorite").as("request");
          cy.get("h3").as("universityName");
          cy.get("button.fav-button").click();
          cy.wait("@request").then((req) => {
            cy.get("@universityName").then((universityName) => {
              cy.wrap(req)
                .its("response.body.favorites")
                .each((favorite, favIndex) => {
                  if (favIndex === index) {
                    cy.wrap(favorite)
                      .its("name")
                      .should("eq", universityName.text());
                  }
                });
            });
          });
        });
      }
    });
  });

  it("can load and list favorites", () => {
    cy.visit("/favorites");
    cy.get("#favoritesList ul > li").should("have.length", 3);
  });

  it("can log out", () => {
    cy.visit("/");
    cy.get("#logoutButton").click({ force: true });
    cy.location("pathname").should("eq", "/");
    cy.get("#logoutButton").should("not.exist");
    cy.wrap(localStorage.getItem("authToken")).should("be.null");
  });
});
