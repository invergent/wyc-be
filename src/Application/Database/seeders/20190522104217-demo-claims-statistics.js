module.exports = {
  up: queryInterface => queryInterface.bulkInsert('ClaimsStatistics', [{
    year: '2019',
    Jan: '4500',
    Feb: '4850',
    Mar: '4100',
    Apr: '5100',
    May: '5600',
    Jun: '4950',
    createdAt: new Date(),
    updatedAt: new Date()
  }]),
  down: queryInterface => queryInterface.bulkDelete('ClaimsStatistics')
};
