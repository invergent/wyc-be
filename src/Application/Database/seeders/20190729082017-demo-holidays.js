module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Holidays', [{
    name: 'Christmas',
    day: '12/25',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Independence',
    day: '10/1',
    createdAt: new Date(),
    updatedAt: new Date()
  }]),
  down: queryInterface => queryInterface.bulkDelete('Notifications')
};
