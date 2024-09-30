const fs = require("fs");

const error = (lines) => {
	fs.appendFile("./logs/DataCleanUp.error.log", lines + "\n", (err) => {
		if (err) {
			console.error(`Error writing to file`, err);
		}
	});
};

const info = (lines) => {
	fs.appendFile("./logs/DataCleanUp.log", lines + "\n", (err) => {
		if (err) {
			console.error(`Error writing to file`, err);
		}
	});
};

module.exports = {
	error,
	info,
};
