const mongoose = require("mongoose");
const config = require("config");
const db = config.get("connectionStringMongo");

async function connectDB() {
    try {
        await mongoose.connect(db, { useNewUrlParser: true });
        console.log('Connected to Database');
    } catch (err) {
        console.log('Err: ', err);
        process.exit(1);
    }
}

module.exports = {
    connectMongoDB
};