const holidays = (sequelize, DataTypes) => {
  const Holidays = sequelize.define('Holidays', {
    name: {
      type: DataTypes.STRING
    },
    yearMonth: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fullDate: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Holidays;
};

export default holidays;
