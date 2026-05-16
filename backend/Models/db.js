const mongoose = require("mongoose");

require("dotenv").config();

mongoose.connect(process.env.MONGO_CONN)

.then(() => {

    console.log("MongoDB Connected");

})

.catch((err) => {

    console.log(err);

});