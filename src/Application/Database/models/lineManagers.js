const lineManagers = (sequelize, DataTypes) => {
  const LineManagers = sequelize.define('LineManagers', {
    lineManagerRole: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });

  LineManagers.associate = (models) => {
    LineManagers.hasMany(models.Staff, { as: 'subordinates', foreignKey: 'lineManagerId' });
    LineManagers.belongsTo(models.Roles, { as: 'designation', foreignKey: 'lineManagerRole' });
  };
  return LineManagers;
};

export default lineManagers;
