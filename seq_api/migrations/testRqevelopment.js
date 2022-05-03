module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Developments", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      safety: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
      },
      cost_center: {
        type: Sequelize.STRING,
      },
      exp_class: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
      },
      group: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
      },
      testRequestId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "TestRequests",
          key: "id",
          as: "testRequestId",
        },
      },
      reportNo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
};
