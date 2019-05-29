const bcrypt = require('bcrypt');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Staff', [{
    tenantRef: 'INIT',
    staffId: 'TN012345',
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@init.com',
    password: bcrypt.hashSync('password', 7),
    image: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1536757459/dummy-profile.png',
    phone: '08065432109',
    branchId: 1,
    supervisorId: 4,
    bsmId: 2,
    roleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    tenantRef: 'INIT',
    staffId: 'TN046345',
    firstname: 'Jane',
    lastname: 'Doe',
    email: 'jane.doe@init.com',
    password: bcrypt.hashSync('password', 7),
    image: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1536757459/dummy-profile.png',
    phone: '08065468109',
    branchId: 2,
    supervisorId: 1,
    bsmId: 2,
    roleId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    tenantRef: 'INIT',
    staffId: 'TN032375',
    firstname: 'Mercy',
    lastname: 'Brawl',
    email: 'mercy.brown@init.com',
    password: bcrypt.hashSync('password', 7),
    image: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1536757459/dummy-profile.png',
    phone: '08098342109',
    branchId: 1,
    supervisorId: 4,
    bsmId: 2,
    roleId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    tenantRef: 'INIT',
    staffId: 'TN046455',
    firstname: 'Molly',
    lastname: 'Dee',
    email: 'molly.dee@init.com',
    password: bcrypt.hashSync('password', 7),
    image: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1536757459/dummy-profile.png',
    phone: '08065432345',
    branchId: 2,
    supervisorId: 4,
    bsmId: 2,
    roleId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    tenantRef: 'INIT',
    staffId: 'TN044455',
    firstname: 'Gamolly',
    lastname: 'Zeezana',
    email: 'zana.ford@init.com',
    password: bcrypt.hashSync('password', 7),
    image: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1536757459/dummy-profile.png',
    phone: '08065466109',
    branchId: 2,
    supervisorId: 4,
    bsmId: 2,
    roleId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    tenantRef: 'INIT',
    staffId: 'TN042995',
    firstname: 'Ligamala',
    lastname: 'Anziba',
    email: 'ligamala.muche@init.com',
    password: bcrypt.hashSync('password', 7),
    image: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1536757459/dummy-profile.png',
    phone: '08012432133',
    branchId: 2,
    supervisorId: 4,
    bsmId: 2,
    roleId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    tenantRef: 'INIT',
    staffId: 'TN074695',
    firstname: 'Archnic',
    lastname: 'Zintra',
    email: 'zintra.zulch@init.com',
    password: bcrypt.hashSync('password', 7),
    image: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1536757459/dummy-profile.png',
    phone: '07065432209',
    branchId: 1,
    supervisorId: 1,
    bsmId: 3,
    roleId: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    tenantRef: 'INIT',
    staffId: 'TN075595',
    firstname: 'Blizcan',
    lastname: 'Ablick',
    email: 'ablick.pitz@init.com',
    password: bcrypt.hashSync('password', 7),
    image: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1536757459/dummy-profile.png',
    phone: '09065777109',
    branchId: 1,
    supervisorId: 1,
    bsmId: 3,
    roleId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    tenantRef: 'INIT',
    staffId: 'ADMIN001',
    firstname: 'TheAdmin',
    lastname: 'JustAdmin',
    email: 'theadmin@init.com',
    password: bcrypt.hashSync('password', 7),
    image: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1536757459/dummy-profile.png',
    phone: '08065432122',
    roleId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    tenantRef: 'INIT',
    staffId: 'TN098432',
    firstname: 'King',
    lastname: 'James',
    email: 'spec.en.james@gmail.com',
    password: bcrypt.hashSync('password', 7),
    image: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1536757459/dummy-profile.png',
    phone: '08077772109',
    supervisorId: 4,
    bsmId: 2,
    branchId: 2,
    roleId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    tenantRef: 'INIT',
    staffId: 'TN111111',
    firstname: 'Esther',
    lastname: 'Ohiorhenuan',
    email: 'omoyeberry@gmail.com',
    password: bcrypt.hashSync('password', 7),
    image: 'https://res.cloudinary.com/dbsxxymfz/image/upload/v1536757459/dummy-profile.png',
    phone: '08055552109',
    supervisorId: 5,
    bsmId: 6,
    branchId: 2,
    roleId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  }]),
  down: queryInterface => queryInterface.bulkDelete('Staff')
};
