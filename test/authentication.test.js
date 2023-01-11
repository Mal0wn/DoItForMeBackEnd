const authenticationService = require("../src/services/authentication.service");

describe("Connexion Test", () => {
  test("Try Connexion with Empty Email", () => {
    return authenticationService.findUser("", "totoleharicot").catch((data) => {
      expect(data).toBe("There is an empty string");
    });
  });
  test("Try Connexion with Empty Password", () => {
    return authenticationService
      .findUser("jeanbon@gmail.com", "")
      .catch((data) => {
        expect(data).toBe("There is an empty string");
      });
  });
});