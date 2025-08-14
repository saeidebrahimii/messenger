const { Router } = require("express");
const authController = require("../controllers/auth");

const router = Router();
router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshToken);

module.exports = { authRoutes: router };
