'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bookings', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vehicleId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Vehicles', // Ensure this matches the name of your Vehicle table
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL', // Adjust as necessary
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false,
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
      CREATE TRIGGER update_booking_timestamp
      AFTER UPDATE ON Bookings
      FOR EACH ROW
      BEGIN
        UPDATE Bookings SET updatedAt = CURRENT_TIMESTAMP WHERE id = NEW.id;
      END;
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Bookings');
  },
};
