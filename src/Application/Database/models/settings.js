const settings = (sequelize, DataTypes) => {
  const Settings = sequelize.define('Settings', {
    emailSchedule: {
      type: DataTypes.STRING
    },
    overtimeWindowStart: {
      type: DataTypes.STRING
    },
    overtimeWindowEnd: {
      type: DataTypes.STRING
    },
    overtimeWindow: {
      type: DataTypes.STRING
    },
    overtimeWindowIsActive: {
      type: DataTypes.BOOLEAN
    }
  }, { freezeTableName: true });

  return Settings;
};

export default settings;
