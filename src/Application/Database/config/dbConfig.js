require('dotenv').config();

const {
  DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_DIALECT
} = process.env;

module.exports = {
  development: {
    host: DB_HOST,
    port: 5432,
    database: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    dialect: DB_DIALECT,
    logging: true
  },
  test: {
    host: DB_HOST,
    port: 5432,
    database: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    dialect: DB_DIALECT,
    logging: false
  },
  cloud_local: {
    host: DB_HOST,
    port: 5432,
    database: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    dialect: DB_DIALECT,
    logging: true
  },
  cloud_test: {
    host: DB_HOST,
    port: 5432,
    database: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    dialect: DB_DIALECT,
    logging: false
  },
  cloud_build: {
    host: DB_HOST,
    port: 5432,
    database: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    dialect: DB_DIALECT,
    logging: false
  },
  production: {
    host: DB_HOST,
    port: 5432,
    database: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    dialect: DB_DIALECT,
    logging: false
  }
};
