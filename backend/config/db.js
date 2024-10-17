const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite', 
});

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected To database...');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

testConnection();

module.exports = sequelize;
