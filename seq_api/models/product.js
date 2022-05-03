"use strict";

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      product_name: DataTypes.STRING,
      specification: DataTypes.STRING,
    },
    {}
  );
  Product.associate = function (models) {
    Product.belongsTo(models.Facility, {
      foreignKey: "facilityId",
      as: "facility",
    });
    Product.hasMany(models.TestRequest, {
      foreignKey: "productId",
      as: "product",
    });
  };
  return Product;
};
