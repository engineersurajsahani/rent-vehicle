const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const VehicleType = require('./VehicleType');

class Vehicle extends Model {}

Vehicle.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  typeId: {
    type: DataTypes.INTEGER,
    references: {
      model: VehicleType,
      key: 'id',
    },
  }
}, {
  sequelize,
  modelName: 'Vehicle',
});

Vehicle.belongsTo(VehicleType, { foreignKey: 'typeId' });

module.exports = Vehicle;