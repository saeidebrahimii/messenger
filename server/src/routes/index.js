const { Router } = require("express");
const { userRoutes } = require("./user");
const { authRoutes } = require("./auth");

const router = Router();
router.use("/users", userRoutes);
router.use("/auth", authRoutes);

module.exports = { indexRoutes: router };
