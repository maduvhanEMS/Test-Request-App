module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("TestInformations", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      number: {
        type: Sequelize.INTEGER,
      },
      reference_lot: {
        type: Sequelize.STRING,
      },
      sample: {
        type: Sequelize.STRING,
      },
      condition: {
        type: Sequelize.STRING,
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
      filename: {
        type: Sequelize.STRING,
      },
      file: {
        type: Sequelize.STRING,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      Received: {
        type: Sequelize.STRING,
        defaultValue: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("TestInformations");
  },
};
