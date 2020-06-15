module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Company', [{
    name: 'Whytecleon Limited',
    address: 'This is the address.',
    emailAddress: 'overtime@whytecleon.com',
    url: 'cleontime.whytecleon.ng',
    createdAt: new Date(),
    updatedAt: new Date()
  }]),
  down: queryInterface => queryInterface.bulkDelete('Company')
};
