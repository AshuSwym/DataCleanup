const {
	connectToMongoDB,
	getMongoConnection,
} = require("./utils/connectToDB.js");
const { getSwymUserJourneyMeta } = require("./Models/index.js");
const { TTL, INTERVAL } = require("./config.js");
const logger = require("./utils/logger.js");
const { createMongoConnections } = require("./utils/connectToDB.js");
const { formatNumber } = require("./utils/index.js");

const tiers = ["v3free", "v3starter", "v3pro", "v3premium", "v3enterprise"];

const driver = async () => {
	await createMongoConnections();
	while (true) {
		const endDate = Date.now() - TTL;
		const endDateInString = new Date(endDate).toString();

		console.log(`End date : ${endDateInString}`);
		for (let i = 0; i < tiers.length; i++) {
			const tier = tiers[i];
			const dbConnection = await getMongoConnection(tier);
			await bulkDeleteData(dbConnection, tier, endDate);
		}

		await delay(INTERVAL);
	}
};

const queryBuilder = (startDate, interval) => {
	return {
		UpdatedOnUtc: { $lt: startDate + interval },
	};
};

const getTheFirstDate = async (SwymUserJourneyMeta) => {
	const firstRecord = await SwymUserJourneyMeta.find()
		.sort({ UpdatedOnUtc: 1 })
		.limit(1);
	const firstRecordDate = firstRecord?.[0]?.CreatedOnUtc;
	return firstRecordDate;
};

const delay = (delayInms) => {
	console.log(`Waiting for ${delayInms}`);
	return new Promise((resolve) => setTimeout(resolve, delayInms));
};

const bulkDeleteData = async (db, tier, endDate) => {
	const SwymUserJourneyMeta = await getSwymUserJourneyMeta(db);
	let startDate = await getTheFirstDate(SwymUserJourneyMeta);
	let noOfRetries = 0;
	let count = 0;

	while (startDate + INTERVAL < endDate) {
		const startDateInString = new Date(startDate + INTERVAL).toString();
		console.log(`Deleting date before : ${startDateInString} for ${tier}`);
		try {
			const query = queryBuilder(startDate, INTERVAL);
			const data = await SwymUserJourneyMeta.countDocuments(query);
			const deleteOperation = await SwymUserJourneyMeta.bulkWrite([
				{
					deleteMany: {
						filter: query,
					},
				},
			]);
			count = count + data;
			console.log(data);
			console.log(deleteOperation);

			const lines = `Deleted ${formatNumber(
				data
			)} for Date : ${startDateInString} Total Deleted : ${formatNumber(
				count
			)} in ${tier}`;
			logger.info(lines);
			startDate = startDate + INTERVAL;
		} catch (error) {
			console.log(error);
			if (noOfRetries < 5) {
				await delay(5000);
				await connectToMongoDB();
			} else return;
			noOfRetries++;
		}
	}
};

driver();
