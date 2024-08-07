const path = require('path');

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || 'db',
      port: process.env.DB_PORT || 5432,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'myapp_dev',
    },
    migrations: {
      directory: path.join(__dirname, 'DataBase', 'Migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'DataBase', 'Seeds'),
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, 'DataBase', 'Migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'DataBase', 'Seeds'),
    },
  },
};