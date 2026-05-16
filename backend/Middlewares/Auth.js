const JWT = require("jsonwebtoken");

const ensureAuthenticated = (
    req,
    res,
    next
) => {

    const auth = req.headers.authorization;

    if (!auth) {

        return res.status(403).json({
            message: "JWT token required"
        });
    }

    try {

        const decoded = JWT.verify(
            auth,
            process.env.JWT_SECRET_KEY
        );

        req.user = decoded;

        next();

    } catch (err) {

        return res.status(403).json({
            message: "Invalid token"
        });
    }
};

module.exports = ensureAuthenticated;