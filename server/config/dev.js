const { parsed: envs } = require('dotenv').config();

module.exports = {
  DATABASE_URL: envs.MONGODB_URL ,
  JWT_SECRET: envs.JWT_SECRET,
  PORT: envs.PORT,
};
