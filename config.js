const dotenv = require("dotenv");

dotenv.config();

module.exports = {
	mongoConnectionURI: process.env.MONGO_CONN_URI,
	TTL: parseInt(process.env.TTL),
	INTERVAL: parseInt(process.env.INTERVAL),
};
