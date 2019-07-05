module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Roles', [{
    name: 'Admin',
    type: 'staff',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'RPC',
    type: 'staff',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Trade Developer',
    type: 'staff',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Service Executive (Financial)',
    type: 'staff',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Service Executive (Non-Financial)',
    type: 'staff',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Head of Operations',
    type: 'lineManager',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Branch Service Manager',
    type: 'lineManager',
    createdAt: new Date(),
    updatedAt: new Date()
  }]),
  down: queryInterface => queryInterface.bulkDelete('Roles')
};
