module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Tests", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.TEXT),
      },

      facilityId: {
        allowNull: false,
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
    return queryInterface.dropTable("Tests");
  },
};
