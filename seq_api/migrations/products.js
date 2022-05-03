module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      product_name: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      specification: {
        type: Sequelize.STRING,
      },
      facilityId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Facilities",
          key: "id",
          as: "facilityId",
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Products");
  },
};
