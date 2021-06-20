const db = require("../models");
const Person = db.persons;
const axios = require("axios");
exports.createPerson = async (req, res) => {
  // let imageId;
  // const providedNid = "1925";
  // await axios
  //   .get(`http://localhost:8012/api/images/find/${providedNid}`)
  //   .then((response) => {
  //     console.log("Response: ", response.data);
  //     const data = response.data;
  //     data.map((image) => (imageId = image.id));
  //     console.log("Image ID: ", imageId);
  //   })
  //   .catch((err) => console.log("Error while retriving image id"));

  //Create a capturedImage
  // const person = {
  //   nidProvided: providedNid,
  //   confidenceScore: "empty",
  //   status: "null",
  //   images_id: imageId,
  //   capturedImages_id: 1
  // };

  const person = {
    nidProvided: req.body.nidProvided,
    confidenceScore: req.body.confidenceScore,
    status: req.body.status,
    capturedImages_id: req.body.capturedImages_id,
  };

  Person.create(person)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Person.",
      });
    });
};
exports.getAllPersons = (req, res) => {
  Person.findAll()
    .then((persons) => {
      res.send(persons);
      console.log("persons: ", persons);
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};
exports.findOnePerson = (req, res) => {
  const id = req.params.id;

  Person.findByPk(id)
    .then((person) => {
      res.send(person);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving Vehicle with id =  ${id}`,
      });
    });
};
exports.updatePerson = (req, res) => {
  const id = req.params.id;
  const updatePerson = req.body;
  console.log("Updated data: ", updatePerson);
  Person.update(updatePerson, {
    where: {
      id: id,
    },
  })
    .then(() => {
      res.status(200).send({
        message: `Person ${req.params.id} updated successfully.`,
      });
    })
    .catch((error) => {
      res.status(401).send({
        message: ` error: ${error.message}`,
      });
    });
};
