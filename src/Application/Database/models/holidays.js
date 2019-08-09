const holidays = (sequelize, DataTypes) => {
  const Holidays = sequelize.define('Holidays', {
    name: {
      type: DataTypes.STRING
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.INTEGER,
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
