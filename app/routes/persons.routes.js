const persons = require("../controllers/person.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/person/create", persons.createPerson);
  app.get("/api/person/all", persons.getAllPersons);
  app.get("/api/person/find/:id", persons.findOnePerson);
  app.put("/api/person/update/:id", persons.updatePerson);
};
