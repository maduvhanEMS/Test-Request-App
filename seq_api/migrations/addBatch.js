module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("TestInformations", "batch_no", {
      type: Sequelize.STRING,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("TestInformations", "batch_no");
  },
};
