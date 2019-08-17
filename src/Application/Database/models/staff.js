const staff = (sequelize, DataTypes) => {
  const Staff = sequelize.define('Staff', {
    staffId: {
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
    middlename: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    altPhone: {
      type: DataTypes.STRING,
      unique: true
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'password'
    },
    image: {
      type: DataTypes.STRING
    },
    branchId: {
      type: DataTypes.INTEGER
    },
    lineManagerId: {
      type: DataTypes.INTEGER
    },
    roleId: {
      type: DataTypes.INTEGER
    },
    changedPassword: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, { freezeTableName: true });

  Staff.associate = (models) => {
    Staff.belongsTo(models.LineManagers, { as: 'lineManager', foreignKey: 'lineManagerId' });
    Staff.belongsTo(models.Branch, { as: 'branch', foreignKey: 'branchId' });
    Staff.belongsTo(models.Roles, { as: 'role', foreignKey: 'roleId' });
    Staff.hasMany(models.Claims, { foreignKey: 'requester' });
    Staff.hasMany(models.Notifications, { as: 'notifications', foreignKey: 'userId' });
    Staff.hasMany(models.Activities, { as: 'activities', foreignKey: 'staffId' });
  };
  return Staff;
};

export default staff;
