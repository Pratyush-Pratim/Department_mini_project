const router = require("express").Router();

const ensureAuthenticated = require("../Middlewares/Auth");
const authorizeRole = require("../Middlewares/AuthorizeRole");
const { getGuards, getGuardStats, deleteGuard, getActiveGuards } = require("../Controllers/GuardController");

router.get("/stats", ensureAuthenticated, authorizeRole("admin"), getGuardStats);

router.get("/active", ensureAuthenticated, authorizeRole("admin"), getActiveGuards);

router.get("/", ensureAuthenticated, authorizeRole("admin"), getGuards);

router.delete("/:id", ensureAuthenticated, authorizeRole("admin"), deleteGuard);

module.exports = router;
