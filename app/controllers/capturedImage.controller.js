const db = require("../models");
const capturedImage = db.capturedImages;
const axios = require("axios");
exports.createCapturedImage = (req, res) => {
  // Validate request
  if (!req.body.image) {
    res.status(400).send({
      message: "Captured Image field can't be empty.",
    });
    return;
  }
  const nid = req.body.nidProvided;

  const image = {
    image: req.body.image,
  };
  let capturedId;
  let personRowId;
  let capResponseForUser;
  
  capturedImage
    .create(image)
    .then(async (response) => {
      capturedId = response.dataValues.id;
      console.log("When capture posted: ", capturedId);

      if (nid !== null) {
        await axios
          .post(`http://localhost:8012/api/person/create`, {
            nidProvided: nid,
            confidenceScore: null,
            status: null,
            capturedImages_id: capturedId,
          })
          .then(async (res) => {
            personRowId = res.data.id;
            console.log("Captured: ", res.data);
            console.log("Captured post response: ", personRowId);
            await axios
              .get(`http://localhost:8012/api/person/find/${personRowId}`)
              .then((response) => {
                capResponseForUser = response.data;
                console.log("new data: ", capResponseForUser);
              })
              .catch((err) =>
                console.log("error while retriving person data.")
              );
          })
          .catch((err) => console.log("error while posting to person api."));
      } else {
        await axios
          .post(`http://localhost:8012/api/person/create`, {
            nidProvided: null,
            confidenceScore: null,
            status: null,
            capturedImages_id: capturedId,
          })
          .then(async (res) => {
            personRowId = res.data.id;
            console.log("Captured: ", res.data);
            console.log("Captured post response: ", personRowId);
            await axios
              .get(`http://localhost:8012/api/person/find/${personRowId}`)
              .then((response) => {
                capResponseForUser = response.data;
                console.log("new data: ", capResponseForUser);
              })
              .catch((err) =>
                console.log("error while retriving person data.")
              );
          })
          .catch((err) => console.log("error while posting to person api."));
      }

      res.send(capResonseForUser);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the Captured Image.",
      });
    });
};

exports.findOneCapturedImage = (req, res) => {
  const id = req.params.id;
  let imageBase64;
  capturedImage.findByPk(id)
    .then((response) => {
      res.send(response);
      imageBase64 = response.image.toString('base64');
      console.log("Here.", imageBase64);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving Captured Image with id =  ${id}`,
      });
    });
};
