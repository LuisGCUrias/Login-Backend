const { Sequelize } = require('sequelize');
const dbHost = process.env.DBHOST;
const user = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DATABSE;

const sequelize = new Sequelize(database, user, password, {
  host: dbHost,
  dialect: 'mariadb'
});

module.exports = sequelize;
