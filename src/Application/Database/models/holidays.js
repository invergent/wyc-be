const holidays = (sequelize, DataTypes) => {
  const Holidays = sequelize.define('Holidays', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    day: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Holidays;
};

export default holidays;
