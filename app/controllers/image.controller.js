const db = require("../models");
const Image = db.images;


exports.getAll = (req, res) => {
  Image.findAll()
    .then((images) => {
      res.send(images);
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};
exports.findOneNID = (req, res) => {
  const nid = req.params.nid;

  Image.findAll({
      where: {
          nid: nid
      }
  }
      
  )
    .then((image) => {
      res.send(image);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving Image with id =  ${nid}`,
      });
    });
};
