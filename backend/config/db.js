const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql', // Or your preferred database dialect
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD, // Add your database password
  database: process.env.DB_DATABASE,
  logging: false, // Disable SQL query logging
  // dialectOptions: {
  //   // Enable SSL for secure database connections (for PostgreSQL or other supported databases)
  //   ssl: process.env.DB_SSL === 'true',
  //   // Additional dialect options can be added here
  // },
  define: {
    // Prevent Sequelize from pluralizing table names
    freezeTableName: true,
  },
  pool: {
    // Configure connection pool settings
    max: 10, // Maximum number of connections in the pool
    min: 0, // Minimum number of connections in the pool
    acquire: 30000, // Maximum time, in milliseconds, that a connection can be idle before being released
    idle: 10000, // Maximum time, in milliseconds, that a connection can be idle before being released
  },
});

module.exports = sequelize;

