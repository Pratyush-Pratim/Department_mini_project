const express = require("express");

const cors = require("cors");

require("dotenv").config();

require("./Models/db");

const authRoutes = require("./Routes/AuthRoutes");
const guardRoutes = require("./Routes/GuardRoutes");
const dutyRoutes = require("./Routes/DutyRoutes");
const leaveRoutes = require("./Routes/LeaveRoutes");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(
    "/auth",
    authRoutes
);

app.use("/guards", guardRoutes);

app.use("/duties", dutyRoutes);

app.use("/leaves", leaveRoutes);

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
