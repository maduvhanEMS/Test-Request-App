"use strict";
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define("Department", {
    department_name: DataTypes.STRING,
  });
  Department.associate = function (models) {
    Department.hasMany(models.TestRequest, {
      foreignKey: "departmentId",
      as: "department",
    });
  };
  return Department;
};
