module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("CCTestInformations", "filename", {
      type: Sequelize.STRING,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("CCTestInformations", "filename");
  },
};
