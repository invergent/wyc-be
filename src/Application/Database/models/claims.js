const claims = (sequelize, DataTypes) => {
  const Claims = sequelize.define('Claims', {
    monthOfClaim: {
      type: DataTypes.STRING
    },
    claimElements: {
      type: DataTypes.INTEGER
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    details: {
      type: DataTypes.JSON
    },
    dates: {
      type: DataTypes.JSON
    },
    requester: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { freezeTableName: true });

  Claims.associate = (models) => {
    Claims.belongsTo(models.Staff, { foreignKey: 'requester' });
    Claims.hasMany(models.ClaimApprovalHistory, { as: 'approvalHistory', foreignKey: 'claimId' });
  };

  return Claims;
};

export default claims;
