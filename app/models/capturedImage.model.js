module.exports = (sequelize, Sequelize) => {
    const capturedImage = sequelize.define("capturedImages", {
      image: {
        type: Sequelize.STRING
      }
    });
  
    return capturedImage;
  };