const lineManagers = (sequelize, DataTypes) => {
  const LineManagers = sequelize.define('LineManagers', {
    idNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });

  LineManagers.associate = (models) => {
    LineManagers.hasMany(models.Staff, { as: 'subordinates', foreignKey: 'lineManagerId' });
  };
  return LineManagers;
};

export default lineManagers;
