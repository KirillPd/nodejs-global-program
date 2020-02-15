'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Groups', [
      {
        name: 'admin',
        permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'user',
        permissions: ['READ', 'WRITE', 'SHARE', 'UPLOAD_FILES'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'guest',
        permissions: ['READ'],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Groups', null, {});
  }
};
