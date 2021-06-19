const db = require("../models");
const Person = db.persons;

exports.createPerson = (req, res) => {
  // Validate request
  if (!req.body.image) {
    res.status(400).send({
      message: "Name can't be empty.",
    });
    return;
  }
 

  // Create a capturedImage
  const person = {
    image: req.body.image
  };

  Person.create(image)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Person.",
      });
    });
};
