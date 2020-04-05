const mongoose = require("mongoose");
const config = require("config");
const db = config.get("connectionStringMongo");

async function connectMongoDB() {
    try {
        await mongoose.connect(db, { useNewUrlParser: true,  useUnifiedTopology: true });
        console.log('Connected to Database');
    } catch (err) {
        console.log('Err: ', err);
        process.exit(1);
    }
}

module.exports = {
    connectMongoDB
};