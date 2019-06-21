module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Company', [{
    name: 'Vic Lawrence & Associates Limited',
    address: 'This is the address.',
    emailAddress: 'info@viclawrence.com',
    url: 'overtime.invergent-technologies.com',
    createdAt: new Date(),
    updatedAt: new Date()
  }]),
  down: queryInterface => queryInterface.bulkDelete('Company')
};
