const express = require("express");
const userRoutes = require("./routes/UserRoutes");
const fundRoutes = require("./routes/FundRoutes");

/*Config*/
const app = express();
const PORT = 3000;

/*Middleware*/
app.use(express.json());

/*Routes*/
app.use("/user", userRoutes);
app.use("/funds", fundRoutes);

app.listen(PORT, () => {
  console.log(`Sevrer is running on port ${PORT}`);
});
