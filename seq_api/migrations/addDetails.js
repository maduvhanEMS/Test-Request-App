module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("TestInformations", "details", {
      type: Sequelize.STRING,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("TestInformations", "details");
  },
};
