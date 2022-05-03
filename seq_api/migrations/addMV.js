module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("TestSchedules", "move_ticket", {
      type: Sequelize.STRING,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("TestSchedules", "move_ticket");
  },
};
