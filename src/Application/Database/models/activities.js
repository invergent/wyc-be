const activities = (sequelize, DataTypes) => {
  const Activities = sequelize.define('Activities', {
    activity: {
      type: DataTypes.STRING,
      allowNull: false
    },
    staffId: {
      type: DataTypes.STRING
    },
    supervisorId: {
      type: DataTypes.STRING
    }
  }, { freezeTableName: true });

  Activities.associate = (models) => {
    Activities.belongsTo(models.Staff, { as: 'creator', foreignKey: 'staffId', targetKey: 'staffId' });
    Activities.belongsTo(models.LineManagers, { as: 'sCreator', foreignKey: 'supervisorId', targetKey: 'idNumber' });
  };

  return Activities;
};

export default activities;
