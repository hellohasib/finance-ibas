module.exports = (sequelize, Sequelize) => {
    const Person = sequelize.define("persons", {
      nidProvided: {
        type: Sequelize.STRING
      },
      confidenceScore: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      }
    });
  
    return Person;
  };