'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Vehicles', {
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
      typeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'VehicleTypes', // Make sure this matches the name of your VehicleType table
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL', // Adjust as necessary
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
      CREATE TRIGGER update_vehicle_timestamp
      AFTER UPDATE ON Vehicles
      FOR EACH ROW
      BEGIN
        UPDATE Vehicles SET updatedAt = CURRENT_TIMESTAMP WHERE id = NEW.id;
      END;
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Vehicles');
  },
};
