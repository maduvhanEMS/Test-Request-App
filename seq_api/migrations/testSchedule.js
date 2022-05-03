module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable("TestSchedules", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      start: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      reportNo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      files: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      testRequestId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "TestRequests",
          key: "id",
          as: "testRequestId",
        },
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
