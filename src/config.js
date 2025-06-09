require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 4000,
  MONGO_URI: process.env.MongoDBUri,
  JWT_SECRET: process.env.JWT_SECRET
}                                                         