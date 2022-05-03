module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
  });

  User.associate = function (models) {
    User.hasMany(models.TestRequest, {
      foreignKey: "requestorId",
      onDelete: "CASCADE",
    });
  };

  return User;
};
