const express = require("express");
const cors = require("cors");
require("dotenv").config();
global.__basedir = __dirname;
const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));


const port = process.env.APP_PORT;

const db = require("./app/models");

db.sequelize.sync();

//connect to the database

require("./app/routes/image.routes")(app);
require("./app/routes/capturedImage.routes")(app);
require("./app/routes/persons.routes")(app);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server running on port ${port}`);
});