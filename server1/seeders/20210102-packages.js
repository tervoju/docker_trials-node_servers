'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('packages', [
      {
        "name": "Acme package 1",
        "id": "acme-1234",
        "binary": "012345678",
        "publisher":"Acme Ltd.",
        "date": new Date()
      },
      {
        "name": "contoso package 1",
        "id": "contoso-1234",
        "binary": "012345678",
        "publisher":"Acme Ltd.",
        "date": new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      return queryInterface.bulkDelete('Packages', null, {});
    */
  }
};