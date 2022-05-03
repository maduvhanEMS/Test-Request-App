module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("CCTestInformations", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      CCC_Slurry_Batch_No: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      CCC_No: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      Coating_date: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      Coating_venue: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      Coating_number: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      Coating_mass: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      CC_type: {
        type: Sequelize.STRING,
      },
      Marked: {
        type: Sequelize.STRING,
      },
      Dry_mass: {
        type: Sequelize.STRING,
      },
      Received: {
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("CCTestInformations");
  },
};
