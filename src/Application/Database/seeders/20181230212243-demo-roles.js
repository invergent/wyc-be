module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Roles', [{
    name: 'Super Admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Auditor',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'RPC',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Trade Developer',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Service Executive (Financial)',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Service Executive (Non-Financial)',
    createdAt: new Date(),
    updatedAt: new Date()
  }]),
  down: queryInterface => queryInterface.bulkDelete('Roles')
};
