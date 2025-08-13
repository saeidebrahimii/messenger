const app = require("./app");

app.listen(process.env.PORT, () => {
  console.log(`🚀 Messanger run on port ${process.env.PORT}`);
});
