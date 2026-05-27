const JWT = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET_KEY || process.env.JWT_SECRET || process.env.jWT_SECRET;

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

    const token = auth.startsWith("Bearer ")
        ? auth.slice(7)
        : auth;

    try {

        const decoded = JWT.verify(
            token,
            JWT_SECRET
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
