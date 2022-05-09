module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("TestRequests", "closed_vessel", {
      type: Sequelize.STRING,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("TestRequests", "closed_vesse");
  },
};
