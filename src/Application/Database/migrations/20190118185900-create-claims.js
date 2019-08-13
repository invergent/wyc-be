module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Claims', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    monthOfClaim: {
      type: Sequelize.STRING
    },
    claimElements: {
      type: Sequelize.INTEGER
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    details: {
      type: Sequelize.JSON
    },
    requester: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Staff',
        key: 'id',
        as: 'requester'
      }
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false
    },
    editRequested: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    editMessage: {
      type: Sequelize.TEXT
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }, { freezeTableName: true }),
  down: queryInterface => queryInterface.dropTable('Claims')
};
