'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('VehicleTypes', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      wheel: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 2,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Add trigger to update `updatedAt` on row updates
    await queryInterface.sequelize.query(`
      CREATE TRIGGER update_vehicle_type_timestamp
      AFTER UPDATE ON VehicleTypes
      FOR EACH ROW
      BEGIN
        UPDATE VehicleTypes SET updatedAt = CURRENT_TIMESTAMP WHERE id = NEW.id;
      END;
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('VehicleTypes');
  },
};
