const mongoose = require("mongoose");
const { SwymUserJourneyMetaSchema } = require("./SwymUserJourneyMeta");

const getSwymUserJourneyMeta = async (db) => {
	return db.model(
		"SwymUserJourneyMeta",
		SwymUserJourneyMetaSchema,
		"SwymUserJourneyMeta"
	);
};

module.exports = { getSwymUserJourneyMeta };
