module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("TestRequests", "additional", {
      type: Sequelize.STRING,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("TestRequests", "additional");
  },
};
