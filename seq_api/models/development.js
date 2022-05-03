module.exports = (Sequelize, DataTypes) => {
  const Development = Sequelize.define("Development", {
    safety: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    cost_center: {
      type: DataTypes.STRING,
    },
    exp_class: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    group: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    reportNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Development.associate = function (models) {
    Development.belongsTo(models.TestRequest, {
      foreignKey: "testRequestId",
      as: "development",
    });
  };

  return Development;
};
