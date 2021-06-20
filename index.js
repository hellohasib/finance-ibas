const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();
global.__basedir = __dirname;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Finance Pensioneer Life Verification application.",
  });
});

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

// var variantfolder = "///home/asraful-sigmind/Music";

// fs.readdir(variantfolder, (err, fileNames) => {
//   let count = 0;
//   fileNames.forEach((fileName) => {
//     console.log("name: ", fileName);
//     fs.readFile(`${variantfolder}/${fileName}`, "base64", (err, base64Data) => {
//       // Do your thing with the file data.
//       if (err) {
//         console.log("error");
//       } else {
//         console.log("....../////.......");
//         console.log("BASE 64 DATA COUNT : ", base64Data, count);
        
//       }
//     });
//     count++;
//   });
// });