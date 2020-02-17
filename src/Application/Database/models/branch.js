const branch = (sequelize, DataTypes) => {
  const Branch = sequelize.define('Branch', {
    solId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, { freezeTableName: true });

  Branch.associate = (models) => {
    Branch.hasMany(models.Staff, { foreignKey: 'branchId' });
    Branch.hasMany(models.LineManagers, { as: 'supervisors', foreignKey: 'solId', sourceKey: 'solId' });
  };
  return Branch;
};

export default branch;
