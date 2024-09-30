const dotenv = require("dotenv");

dotenv.config();

const MONGOURI = {
	v3free: process.env.MONGO_FREE_URI,
	v3starter: process.env.MONGO_STARTER_URI,
	v3pro: process.env.MONGO_PRO_URI,
	v3premium: process.env.MONGO_PREMIUM_URI,
	v3enterprise: process.env.MONGO_ENTERPRISE_URI,
};
const DATABASE = {
	v3free: "swymv3free-01",
	v3starter: "swymv3starter-01",
	v3pro: "swymv3pro-01",
	v3premium: "swymv3premium-01",
	v3enterprise: "swymv3enterprise-01",
};

module.exports = {
	MONGOURI,
	DATABASE,
	TTL: parseInt(process.env.TTL),
	INTERVAL: parseInt(process.env.INTERVAL),
};
