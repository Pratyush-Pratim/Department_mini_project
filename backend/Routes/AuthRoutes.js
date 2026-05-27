const router = require("express").Router();

const {
    signup,
    login,
    adminLogin
} = require("../Controllers/AuthController");

router.post(
    "/signup",
    signup
);

router.post(
    "/login",
    login
);

router.post(
    "/admin-login",
    adminLogin
);

module.exports = router;
