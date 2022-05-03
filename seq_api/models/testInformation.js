module.exports = (Sequelize, DataTypes) => {
  const TestInformation = Sequelize.define("TestInformation", {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    batch_no: DataTypes.STRING,
    number: DataTypes.INTEGER,
    reference_lot: DataTypes.STRING,
    sample: DataTypes.STRING,
    condition: DataTypes.STRING,
    marking: DataTypes.STRING,
    reportNo: DataTypes.STRING,
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
