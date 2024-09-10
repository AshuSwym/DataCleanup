const { mongoConnectionURI } = require("./config");
const { mongoose } = require(`mongoose`);

const connectToMongoDB = async () => {
    try {
        const db = await mongoose.connect(mongoConnectionURI).then(({connection}) => {
            console.log(
				`\nSucessfully connected\n    Host : ${connection.host}\n    Database : ${connection.name}`
			);
        })
        return db;
	} catch (error) {
		console.log("Error while connecting MongoDB", error);
	}
};

module.exports = { connectToMongoDB };