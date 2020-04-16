module.exports = {
  up: queryInterface => queryInterface.bulkInsert('ClaimsStatistics', [{
    year: '2020',
    Jan: '0',
    Feb: '0',
    Mar: '0',
    createdAt: new Date(),
    updatedAt: new Date()
  }]),
  down: queryInterface => queryInterface.bulkDelete('ClaimsStatistics')
};
