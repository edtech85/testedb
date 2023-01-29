"use strict";
module.exports = (sequelize, DataTypes) => {
  const profiles = sequelize.define(
    "profiles",
    {
      name: DataTypes.STRING,
      cpf: DataTypes.STRING,
      email: DataTypes.STRING,
      date_start: DataTypes.DATEONLY,
      password: DataTypes.STRING,
    },
    {}
  );
  profiles.associate = function (models) {
    profiles.belongsTo(models.roles, {
      foreignKey: "id",
    });
  };
  return profiles;
};
