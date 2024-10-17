'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Vehicles', [
      { name: 'Vehicle 1', typeId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Vehicle 2', typeId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Vehicle 3', typeId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Vehicle 4', typeId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Vehicle 5', typeId: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Vehicle 6', typeId: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Vehicle 7', typeId: 4, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Vehicles', null, {});
  }
};
