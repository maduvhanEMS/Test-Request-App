module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("TestSchedules", "expected_date", {
      type: Sequelize.STRING,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("TestSchedules", "expected_date");
  },
};
