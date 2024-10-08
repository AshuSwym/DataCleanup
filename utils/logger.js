const fs = require("fs");

const error = (lines) => {
	fs.appendFile(
		"./logs/DataCleanUp.error.log",
		`${new Date(Date.now()).toString()} ${lines} \n`,
		(err) => {
			if (err) {
				console.error(`Error writing to file`, err);
			}
		}
	);
};

const info = (lines) => {
	fs.appendFile(
		"./logs/DataCleanUp.log",
		`${(new Date(Date.now())).toString()} ${lines} \n`,
		(err) => {
			if (err) {
				console.error(`Error writing to file`, err);
			}
		}
	);
};

module.exports = {
	error,
	info,
};
