module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("CCTestInformations", "file", {
      type: Sequelize.STRING,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("CCTestInformations", "file");
  },
};
