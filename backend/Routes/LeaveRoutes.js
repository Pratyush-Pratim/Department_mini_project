const router = require("express").Router();

const ensureAuthenticated = require("../Middlewares/Auth");
const authorizeRole = require("../Middlewares/AuthorizeRole");
const {
    createLeave,
    getLeaves,
    updateLeaveStatus,
} = require("../Controllers/LeaveController");

router.post("/", ensureAuthenticated, authorizeRole("guard"), createLeave);
router.get("/", ensureAuthenticated, authorizeRole("admin"), getLeaves);
router.patch("/:id/status", ensureAuthenticated, authorizeRole("admin"), updateLeaveStatus);

module.exports = router;
