// @ts-nocheck
require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_MAILER_SECRET: process.env.NODE_MAILER_SECRET,
  OPEN_AI_KEY1: process.env.OPEN_AI_KEY1,
  OPEN_AI_KEY2: process.env.OPEN_AI_KEY2,
  OPEN_AI_KEY3: process.env.OPEN_AI_KEY3,
  OPEN_AI_KEY4: process.env.OPEN_AI_KEY4,
};
