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

  // Create a capturedImage
  const image = {
    image: req.body.image,
  };
  let capturedId;
  let personRowId;
  capturedImage
    .create(image)
    .then(async (response) => {
      capturedId = response.dataValues.id;
      console.log("When capture posted: ", capturedId);
      
      await axios
        .post(`http://localhost:8012/api/person/create`, {
          nidProvided: null,
          confidenceScore: null,
          status: null,
          capturedImages_id: capturedId,
        })
        .then((res) => {
          
          personRowId = res.data.id;
          console.log("Captured: ", res.data);
          console.log("Captured post response: ", personRowId);
        })
        .catch((err) => console.log("error while posting to person api."));

    res.json(personRowId)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the Captured Image.",
      });
    });
};
