module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Staff', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    staffId: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    middlename: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    phone: {
      type: Sequelize.STRING,
      unique: true
    },
    altPhone: {
      type: Sequelize.STRING,
      unique: true
    },
    accountNumber: {
      type: Sequelize.STRING,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'password'
    },
    image: {
      type: Sequelize.STRING,
      defaultValue: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1536757459/dummy-profile.png'
    },
    branchId: {
      type: Sequelize.INTEGER,
      onDelete: 'SET NULL',
      references: {
        model: 'Branch',
        key: 'id',
        as: 'branch'
      }
    },
    lineManagerId: {
      type: Sequelize.INTEGER,
      onDelete: 'SET NULL',
      references: {
        model: 'LineManagers',
        key: 'id',
        as: 'lineManager'
      }
    },
    roleId: {
      type: Sequelize.INTEGER,
      onDelete: 'SET NULL',
      references: {
        model: 'Roles',
        key: 'id',
        as: 'role'
      }
    },
    changedPassword: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    extraMonthsPermitted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    extraMonthsData: {
      type: Sequelize.JSON
    },
    canUpdateBranch: {
      type: Sequelize.BOOLEAN
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
  down: queryInterface => queryInterface.dropTable('Staff')
};
