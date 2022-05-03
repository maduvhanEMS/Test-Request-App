"use strict";

module.exports = (sequelize, DataTypes) => {
  const Facility = sequelize.define(
    "Facility",
    {
      facility_name: DataTypes.STRING,
    },
    {}
  );
  Facility.associate = function (models) {
    Facility.hasMany(models.Product, {
      foreignKey: "facilityId",
      as: "facility",
      onDelete: "CASCADE",
    });
    Facility.hasMany(models.TestRequest, {
      foreignKey: "facilityId",
      as: "test",
      onDelete: "CASCADE",
    });
    Facility.hasMany(models.Header, {
      foreignKey: "facilityId",
      as: "header",
      onDelete: "CASCADE",
    });
    Facility.hasMany(models.Test, {
      foreignKey: "facilityId",
      as: "tests",
      onDelete: "CASCADE",
    });
    Facility.hasMany(models.Safety, {
      foreignKey: "facilityId",
      as: "safety",
      onDelete: "CASCADE",
    });
  };
  return Facility;
};
