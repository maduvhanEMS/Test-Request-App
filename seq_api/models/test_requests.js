"use strict";

module.exports = (sequelize, DataTypes) => {
  const TestRequest = sequelize.define("TestRequest", {
    test_description: DataTypes.TEXT,
    test_type: DataTypes.STRING,
    reportNo: DataTypes.STRING,
    additional: DataTypes.STRING,
    products: DataTypes.ARRAY(DataTypes.TEXT),
    tests: DataTypes.ARRAY(DataTypes.STRING),
    status: {
      type: DataTypes.STRING,
    },
  });
  TestRequest.associate = function (models) {
    TestRequest.belongsTo(models.Facility, {
      foreignKey: "facilityId",
      as: "test",
    });
    TestRequest.belongsTo(models.Product, {
      foreignKey: "productId",
      as: "product",
    });
    TestRequest.belongsTo(models.Department, {
      foreignKey: "departmentId",
      as: "department",
    });
    TestRequest.belongsTo(models.User, {
      foreignKey: "requestorId",
      as: "user",
    });
    TestRequest.hasMany(models.TestInformation, {
      foreignKey: "testRequestId",
      as: "test_information",
    });
    TestRequest.hasMany(models.TestSchedule, {
      foreignKey: "testRequestId",
      as: "testSchedule",
      onDelete: "CASCADE",
    });
    TestRequest.hasMany(models.Development, {
      foreignKey: "testRequestId",
      as: "development",
      onDelete: "CASCADE",
    });
    TestRequest.hasMany(models.CCTestInformation, {
      foreignKey: "testRequestId",
      as: "CC_info",
      onDelete: "CASCADE",
    });
  };
  return TestRequest;
};
