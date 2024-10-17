'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('VehicleTypes', [
      { name: 'Hatchback', wheel: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'SUV', wheel: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sedan', wheel: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sports', wheel: 2, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('VehicleTypes', null, {});
  }
};
