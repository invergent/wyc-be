module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Activities',
    'supervisorId',
    { type: Sequelize.STRING }
  ),

  down: queryInterface => queryInterface.removeColumn('Activities', 'supervisorId')
};
