const roles = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  Roles.associate = (models) => {
    Roles.hasMany(models.Staff, { foreignKey: 'id' });
    Roles.hasMany(models.LineManagers, { foreignKey: 'id' });
  };
  return Roles;
};

export default roles;
