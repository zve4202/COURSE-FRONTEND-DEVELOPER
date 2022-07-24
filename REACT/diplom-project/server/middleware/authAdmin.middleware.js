const tokenService = require("../services/token.service");

module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }
    try {
        if (!req.user && req.user.role !== "admin") {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
        next();
    } catch (e) {
        res.status(500).json({
            message: e.message
        });
    }
};
