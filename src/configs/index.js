const { PORT, DOMAIN_NAME, MONGO_URI, JWT_SECRET_KEY, JWT_EXPIRES_TIME } =
  process.env;

const { A_WEEK } = require('../constants');

module.exports = {
  PORT,
  DOMAIN_NAME,
  MONGO_URI,
  JWT_SECRET_KEY,
  JWT_EXPIRES_TIME: parseInt(JWT_EXPIRES_TIME, 10) || A_WEEK,
};
