"use strict";

module.exports = (sequelize, DataTypes) => {
  const Header = sequelize.define(
    "Header",
    {
      name: DataTypes.ARRAY(DataTypes.TEXT),
    },
    {}
  );
  Header.associate = function (models) {
    Header.belongsTo(models.Facility, {
      foreignKey: "facilityId",
      as: "header",
    });
  };
  return Header;
};
