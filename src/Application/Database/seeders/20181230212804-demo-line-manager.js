module.exports = {
  up: queryInterface => queryInterface.bulkInsert('LineManagers', [{
    idNumber: 'SN234567',
    solId: '203',
    firstname: 'SuperJohn',
    lastname: 'Johnny',
    email: 'super.john@init.com',
    phone: '08099887766',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    idNumber: 'SN763553',
    solId: '207',
    firstname: 'JohnBSM',
    lastname: 'DoeBSM',
    email: 'john.doiz@init.com',
    phone: '08076546766',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    idNumber: 'SN769873',
    solId: '573',
    firstname: 'DoeBBSM',
    lastname: 'JohnnyBSM',
    email: 'johnny.doey@init.com',
    phone: '08099676766',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    idNumber: 'SN760073',
    solId: '495',
    firstname: 'JohnSuppy',
    lastname: 'DoeBSMMy',
    email: 'jonz.super@init.com',
    phone: '08077232140',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    idNumber: 'SN112223',
    solId: '873',
    firstname: 'James',
    lastname: 'Enejo',
    email: 'spec.en.james@gmail.com',
    phone: '08033345766',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    idNumber: 'SN876300',
    solId: '300',
    firstname: 'James',
    lastname: 'Enejo',
    email: 'jillandroid@gmail.com',
    phone: '08090000676',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    idNumber: 'SN728367',
    solId: '522',
    firstname: 'Rodney',
    lastname: 'Lascap',
    email: 'rodlas@whytecleon.com',
    phone: '08087987896',
    createdAt: new Date(),
    updatedAt: new Date()
  }]),
  down: queryInterface => queryInterface.bulkDelete('LineManagers')
};
