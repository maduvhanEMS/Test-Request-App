module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("TestRequests", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      test_description: {
        type: Sequelize.STRING,
      },
      test_type: {
        type: Sequelize.STRING,
      },
      tests: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      requestorId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
          as: "requestorId",
        },
      },
      facilityId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Facilities",
          key: "id",
          as: "facilityId",
        },
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Products",
          key: "id",
          as: "productId",
        },
      },
      departmentId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Departments",
          key: "id",
          as: "departmentId",
        },
      },
      reportNo: {
        type: Sequelize.STRING,
        unique: true,
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
      status: {
        type: Sequelize.STRING,
        defaultValue: "Received",
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("TestRequests");
  },
};
