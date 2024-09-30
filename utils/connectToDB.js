const mongoose = require("mongoose");

const { MONGOURI, DATABASE } = require("../config");
const logger = require("./logger");

const mongoConnections = new Map();

const createMongoConnection = async (tier) => {
	try {
		const uri = MONGOURI[tier];
		const options = { dbName: DATABASE[tier] };
		const connection = await mongoose
			.createConnection(uri, options)
			.asPromise();
		connection.on("error", (error) => {
			logger.error(
				`MongoDB connection error for ${tier}: ${error.message}`
			);
			mongoConnections.delete(tier);
		});

		connection.on("disconnected", () => {
			logger.info(`MongoDB connection disconnected for ${tier}`);
			mongoConnections.delete(tier);
		});

		connection.on("connected", () => {
			logger.info(`MongoDB connection established for ${tier}`);
		});
		return connection;
	} catch (error) {
		logger.error(
			`Error connecting to MongoDB for ${tier}: ${error.message}`
		);
	}
};

const createMongoConnections = async () => {
	// Initialize all connections
	for (const tier of Object.keys(MONGOURI)) {
		if (MONGOURI[tier] !== "" && MONGOURI[tier] !== undefined) {
			const connection = await createMongoConnection(tier);
			mongoConnections.set(tier, connection);
		}
	}
};

const getMongoConnection = async (tier) => {
	const connection = mongoConnections.get(tier);
	if (!connection || !connection.readyState) {
		const connection = await createMongoConnection(tier);
		mongoConnections.set(tier, connection);
		return mongoConnections.get(tier);
	}
	return connection;
};

module.exports = { getMongoConnection, createMongoConnections };
