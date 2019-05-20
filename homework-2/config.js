const dotenv = require('./node_modules/dotenv/lib/main');
const path = require('./node_modules/path');

const root = path.join.bind(this, __dirname);
dotenv.config({ path: root('.env') });

module.exports = {
  PORT: process.env.PORT || 3000,
  MONGO_URL: process.env.MONGO_URL,
  USER: process.env.MONGO_USER,
  PASSWORD: process.env.MONGO_PASS,
  IS_PRODUCTION: process.env.NODE_ENV === 'production'
};
