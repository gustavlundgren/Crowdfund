const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const userRoutes = require("./routes/UserRoutes");
const fundRoutes = require("./routes/FundRoutes");
const corsOptions = require("./config/Cors");

/*Config*/
const app = express();
const PORT = 3000;

/*Middleware*/
app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan("common"));

/*Routes*/
app.use("/user", userRoutes);
app.use("/funds", fundRoutes);

app.listen(PORT, () => {
  console.log(`Sevrer is running on port ${PORT}`);
});
