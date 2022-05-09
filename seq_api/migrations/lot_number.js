module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("TestInformations", "lot_number", {
      type: Sequelize.STRING,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("TestInformations", "lot_number");
  },
};
