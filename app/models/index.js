const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,

  dialect: config.dialect,
  operatorsAliases: 0,
  socketPath: config.socketPath,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.images = require("../models/image.model.js")(sequelize, Sequelize);
db.capturedImages = require("../models/capturedImage.model.js")(sequelize, Sequelize);
db.persons = require("../models/person.model.js")(sequelize, Sequelize);

//nid image-person relationship
db.images.belongsTo(db.persons, {
  foreignKey: {
    name: "images_id",
    allowNull: false,
  },
});

db.capturedImages.belongsTo(db.persons, {
  foreignKey: {
    name: "capturedImages_id",
    allowNull: true,
  },
});

module.exports = db;

