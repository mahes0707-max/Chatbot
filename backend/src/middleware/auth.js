
const { UserSession } = require("../models");
const logger = require("../utils/logger");

const authenticateSession = async (req, res, next) => {
    try {
        const sessionKey = req.headers["x-session-key"];

        if (!sessionKey) {
            return res.status(401).json({
                success: false,
                error: "Authentication required. Please log in.",
            });
        }

        const userSession = await UserSession.findOne({
            sessionKey,
            isActive: true,
            expiresAt: { $gt: new Date() },
        }).populate("userId");

        if (!userSession || !userSession.userId) {
            return res.status(401).json({
                success: false,
                error: "Invalid or expired session. Please log in again.",
            });
        }

        req.user = userSession.userId;
        next();
    } catch (error) {
        logger.error("Authentication middleware error", {
            error: error.message,
        });

        res.status(500).json({
            success: false,
            error: "Authentication check failed",
        });
    }
};

module.exports = authenticateSession;
