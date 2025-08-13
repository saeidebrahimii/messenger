require("dotenv").config();
const express = require("express");
const { indexRoutes } = require("./routes");
const { errorHandler } = require("./middlewares/errorHandler");
const app = express();
app.use(express.json());
require("./config/db")

app.use(indexRoutes);
app.use((req, res, next) => {
  res.status(404).json({ message: "route not found" });
});
app.use(errorHandler);

module.exports = app;
