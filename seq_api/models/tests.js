"use strict";

module.exports = (sequelize, DataTypes) => {
  const Test = sequelize.define(
    "Test",

    {
      name: DataTypes.ARRAY(DataTypes.TEXT),
      additional: DataTypes.TEXT,
    }
  );
  Test.associate = function (models) {
    Test.belongsTo(models.Facility, {
      foreignKey: "facilityId",
      as: "tests",
    });
  };
  return Test;
};
