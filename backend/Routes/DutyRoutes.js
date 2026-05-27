const router = require("express").Router();

const ensureAuthenticated = require("../Middlewares/Auth");
const authorizeRole = require("../Middlewares/AuthorizeRole");
const {
    assignDuty,
    getAllDuties,
    getGuardDuties,
} = require("../Controllers/DutyController");

router.post("/", ensureAuthenticated, authorizeRole("admin"), assignDuty);
router.get("/", ensureAuthenticated, authorizeRole("admin"), getAllDuties);
router.get("/guard/:guardContact", ensureAuthenticated, getGuardDuties);

module.exports = router;
