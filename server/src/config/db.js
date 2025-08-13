const mongoose = require("mongoose");
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("✅ Successfully connected to database");
  })
  .catch((err) => {
    console.log("DB ERROR: ", err);
  });
