module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("TestInformations", "move_ticket", {
      type: Sequelize.STRING,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("TestInformations", "move_ticket");
  },
};
