"use strict";

const { Sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const CCTestInformation = sequelize.define("CCTestInformation", {
    CCC_Slurry_Batch_No: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    CCC_No: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    Coating_date: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    Coating_venue: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    Coating_number: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    Coating_mass: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    CC_type: {
      type: DataTypes.STRING,
    },
    Marked: {
      type: DataTypes.STRING,
    },
    Dry_mass: {
      type: DataTypes.STRING,
    },
    file: DataTypes.STRING,
    filename: DataTypes.STRING,
    Received: {
      type: DataTypes.STRING,
      defaultValue: false,
    },
    reportNo: DataTypes.STRING,
  });
  CCTestInformation.assocaite = function (models) {
    CCTestInformation.belongsTo(models.TestRequest, {
      foreignKey: "testRequestId",
      as: "CC_info",
    });
  };

  return CCTestInformation;
};
