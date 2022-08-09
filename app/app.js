const express = require("express");
const apiRouter = require("./routers/api-router");
const app = express();
const {
  notFound,
  customError,
  psqlError,
  genericError,
} = require("./error-middleware");
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", notFound);

app.use(customError);
app.use(psqlError);
app.use(genericError);

module.exports = app;
