// models/Booking.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Vehicle = require('./Vehicle');

class Booking extends Model {}

Booking.init({
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vehicleId: {
    type: DataTypes.INTEGER,
    references: {
      model: Vehicle,
      key: 'id',
    },
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Booking',
});

Booking.belongsTo(Vehicle, { foreignKey: 'vehicleId' });

module.exports = Booking;
