const Sequelize = require('sequelize');
require('dotenv').config();
// We have .env file with our own mysql usernames and passwords that we stored in the .gitignore file for security purposes

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    // This information is being pulled from .env file
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;