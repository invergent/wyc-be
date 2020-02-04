const activities = (sequelize, DataTypes) => {
  const Activities = sequelize.define('Activities', {
    activity: {
      type: DataTypes.STRING,
      allowNull: false
    },
    staffId: {
      type: DataTypes.STRING
    }
  }, { freezeTableName: true });

  Activities.associate = (models) => {
    Activities.belongsTo(models.Staff, { as: 'creator', foreignKey: 'staffId', targetKey: 'staffId' });
  };

  return Activities;
};

export default activities;
