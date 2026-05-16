const express = require("express");

const cors = require("cors");

require("dotenv").config();

require("./Models/db");

const authRoutes = require("./Routes/AuthRoutes");

const app = express();

app.use(express.json());

app.use(cors());

app.use(
    "/auth",
    authRoutes
);

app.get("/", (req, res) => {

    res.send("Backend Running");

});

app.listen(
    process.env.PORT,
    () => {

        console.log(
            `Server running on ${process.env.PORT}`
        );

    }
);