module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Holidays', [{
    month: 7,
    date: 9,
    fullDate: '2019-08-09T22:23:33.739Z',
    createdAt: 'Now',
    updatedAt: 'Now'
  }]),
  down: queryInterface => queryInterface.bulkDelete('Holidays')
};
