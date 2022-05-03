module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Facilities", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      facility_name: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
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
    return queryInterface.dropTable("Facilities");
  },
};
