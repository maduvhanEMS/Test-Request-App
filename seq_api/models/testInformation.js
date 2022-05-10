module.exports = (sequelize, DataTypes) => {
  const TestInformation = sequelize.define("TestInformation", {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lot_number: DataTypes.STRING,
    batch_no: DataTypes.STRING,
    number: DataTypes.INTEGER,
    reference_lot: DataTypes.STRING,
    sample: DataTypes.STRING,
    condition: DataTypes.STRING,
    marking: DataTypes.STRING,
    details: DataTypes.STRING,
    reportNo: DataTypes.STRING,
    move_ticket: DataTypes.STRING,
    file: DataTypes.STRING,
    filename: DataTypes.STRING,
    Received: {
      type: DataTypes.STRING,
      defaultValue: false,
    },
  });
  TestInformation.associate = function (models) {
    TestInformation.belongsTo(models.TestRequest, {
      foreignKey: "testRequestId",
      as: "test_information",
    });
  };

  return TestInformation;
};
