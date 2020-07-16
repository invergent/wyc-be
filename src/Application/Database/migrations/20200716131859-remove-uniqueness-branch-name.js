module.exports = {
  up: queryInterface => queryInterface.removeConstraint('Branch', 'Branch_name_key', {}),
  down: queryInterface => queryInterface.addConstraint('Branch', ['name'], { type: 'unique', name: 'Branch_name_key' })
};
