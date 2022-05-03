"use strict";

module.exports = (sequelize, DataTypes) => {
  const Safety = sequelize.define("Safety", {
    name: DataTypes.ARRAY(DataTypes.TEXT),
  });
  Safety.associate = function (models) {
    Safety.belongsTo(models.Facility, {
      foreignKey: "facilityId",
      as: "safety",
    });
  };
  return Safety;
};
