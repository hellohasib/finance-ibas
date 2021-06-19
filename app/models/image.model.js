module.exports = (sequelize, Sequelize) => {
    const Image = sequelize.define("images", {
      nid: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      }
    });
  
    return Image;
  };