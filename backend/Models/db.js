const mongoose = require("mongoose");

require("dotenv").config();

const connectOptions = {};

if (process.env.MONGO_DB_NAME) {
    connectOptions.dbName = process.env.MONGO_DB_NAME;
}

mongoose.connect(process.env.MONGO_CONN, connectOptions)

.then(() => {

    console.log("MongoDB Connected");

})

.catch((err) => {

    console.log(err);

});
