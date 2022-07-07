//import Sequelize (CRM) to manage the database created in postgres
//alse import DataTypes to help sending string, integer, etc
const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env'});

// Connect to database
const db = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST, // you can put IP server... in this case the database is in my own laptop
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB,
    logging: false
});

module.exports = { db, DataTypes };