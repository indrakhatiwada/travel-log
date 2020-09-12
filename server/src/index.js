const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
const logs = require("./api/logs");
// console.log(process.env.DATABASE_URL);
//connectig to the DB
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const middlewares = require("./middlewares");

//middlewares
app.use(morgan("common"));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "hello world",
  });
});

app.use("/api/logs", logs);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
const port = process.env.PORT || 1337;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
