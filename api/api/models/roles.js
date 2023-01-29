"use strict";
module.exports = (sequelize, DataTypes) => {
  const roles = sequelize.define(
    "roles",
    {
      role_name: DataTypes.STRING,
    },
    {}
  );

  roles.associate = function (models) {
    // define association here
    roles.hasMany(models.profiles, {
      foreignKey: "role_id",
    });
  };
  return roles;
};
