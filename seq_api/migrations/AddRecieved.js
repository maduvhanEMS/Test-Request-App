module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("CCTestInformations", "Received", {
      type: Sequelize.STRING,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("CCTestInformations", "Received");
  },
};
