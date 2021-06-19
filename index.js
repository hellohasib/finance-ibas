const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");

require('dotenv').config();
global.__basedir = __dirname;
const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
  };
  
app.use(cors(corsOptions));
  
  // parse requests of content-type - application/json
app.use(bodyParser.json());
  
  // parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
  
  // simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Finance Pensioneer Life Verification application." });
});
  

const port = process.env.APP_PORT;

const db = require("./app/models");

db.sequelize.sync();

//connect to the database

require("./app/routes/image.routes")(app);
require("./app/routes/capturedImage.routes")(app);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server running on port ${port}`)
});