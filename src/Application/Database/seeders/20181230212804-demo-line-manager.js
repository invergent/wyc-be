module.exports = {
  up: queryInterface => queryInterface.bulkInsert('LineManagers', [{
    lineManagerRole: 6,
    firstname: 'SuperJohn',
    lastname: 'Johnny',
    email: 'super.john@init.com',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    lineManagerRole: 7,
    firstname: 'JohnBSM',
    lastname: 'DoeBSM',
    email: 'john.doiz@init.com',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    lineManagerRole: 6,
    firstname: 'DoeBBSM',
    lastname: 'JohnnyBSM',
    email: 'johnny.doey@init.com',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    lineManagerRole: 7,
    firstname: 'JohnSuppy',
    lastname: 'DoeBSMMy',
    email: 'jonz.super@init.com',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    lineManagerRole: 6,
    firstname: 'James',
    lastname: 'Enejo',
    email: 'spec.en.james@gmail.com',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    lineManagerRole: 7,
    firstname: 'James',
    lastname: 'Enejo',
    email: 'jillandroid@gmail.com',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    lineManagerRole: 7,
    firstname: 'Rodney',
    lastname: 'Lascap',
    email: 'rodlas@whytecleon.com',
    createdAt: new Date(),
    updatedAt: new Date()
  }]),
  down: queryInterface => queryInterface.bulkDelete('LineManagers')
};
