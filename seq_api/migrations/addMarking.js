module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("TestInformations", "marking", {
      type: Sequelize.STRING,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("TestInformations", "marking");
  },
};
