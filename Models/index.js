const mongoose = require("mongoose");
const { SwymUserJourneyMetaSchema } = require("./SwymUserJourneyMeta");

const getSwymUserJourneyMeta = async () => {
	return mongoose.model(
		"SwymUserJourneyMeta",
		SwymUserJourneyMetaSchema,
		"SwymUserJourneyMeta"
	);
};

module.exports = { getSwymUserJourneyMeta };
