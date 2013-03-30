/*
 * Configuration
 */

module.exports = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGOLAB_URI || 'mongodb://localhost/emma',
  twitter_consumer_key: process.env.TWITTER_CONSUMER_KEY || "abcd",
  twitter_consumer_secret: process.env.TWITTER_CONSUMER_SECRET || "1234",
  session_secret: process.env.SESSION_SECRET || "abcd1234"
};