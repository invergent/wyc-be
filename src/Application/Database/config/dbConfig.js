require('dotenv').config();

const {
  DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_DIALECT
} = process.env;

const config = {
  host: DB_HOST,
  port: 5432,
  database: DB_NAME,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  dialect: DB_DIALECT
};

module.exports = { [process.env.NODE_ENV || 'development']: config };
