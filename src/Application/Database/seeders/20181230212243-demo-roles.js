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
    name: 'Driver',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Guest House',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Fireman',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Technician',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Specie Driver',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Security',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Service Executive',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Marketing Associate',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'DPSE',
    createdAt: new Date(),
    updatedAt: new Date()
  }]),
  down: queryInterface => queryInterface.bulkDelete('Roles')
};
