const db = require("../models");
const capturedImage = db.capturedImages;

exports.createCapturedImage = (req, res) => {
  // Validate request
  if (!req.body.image) {
    res.status(400).send({
      message: "Name can't be empty.",
    });
    return;
  }
 

  // Create a capturedImage
  const image = {
    image: req.body.image
  };

  capturedImage.create(image)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Permission.",
      });
    });
};
