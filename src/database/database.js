const { Sequelize } = require('sequelize');
const path = require('path');

const dbStorage =
  process.env.DB_STORAGE || path.join(__dirname, '..', '..', 'database.sqlite');

const logging =
  process.env.DB_LOGGING && process.env.DB_LOGGING.toLowerCase() === 'true'
    ? console.log
    : false;

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbStorage,
  logging,
});

module.exports = sequelize;
