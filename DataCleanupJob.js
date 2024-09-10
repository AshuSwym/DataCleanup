const { connectToMongoDB } = require("./dal.js");
const { getSwymUserJourneyMeta } = require("./Models/index.js");
const { TTL, INTERVAL } = require("./config.js");
const fs = require('fs');

const endDate = Date.now() - TTL;

const driver = async () => {
	const db = await connectToMongoDB();
	const SwymUserJourneyMeta = await getSwymUserJourneyMeta();

	let startDate = await getTheFirstDate(SwymUserJourneyMeta);
	let noOfRetries = 0;
	let count = 687952;
	const endDateInString = new Date(endDate).toString();

	console.log(`End date : ${endDateInString}`);

	while (startDate < endDate) {
		const startDateInString = new Date(startDate + INTERVAL).toString();
		console.log(`Deleting date before : ${startDateInString}`);
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

			const lines = `Deleted ${data} for Date : ${startDateInString} Total Deleted : ${count}\n`;
			fs.appendFile("deletion.log", lines, (err) => {
				if (err) {
					console.error(
						`Error writing to file`,
						err
					);
				}
			});
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
	return new Promise((resolve) => setTimeout(resolve, delayInms));
};

driver();
