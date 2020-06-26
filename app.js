const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cors = require("cors");
const { json, urlencoded } = require("body-parser");
require("express-async-errors");
const authRouter = require("./components/Auth");
const errorHandler = require("./error-handling");
//getting port and databaseUrl from env variabes
const port = process.env.PORT || 8080;
const databaseUrl = process.env.DATABASEURL;

app.use(cors());

//database connection
const db = mongoose
  .connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("database connected");
  })
  .catch((error) => {
    console.error(error);
  });

//to parse the request body
app.use(json());
app.use(urlencoded({ extended: true }));

//routings for authentication
app.use("/", authRouter);
//errors handling
app.use((err, req, res, next) => {
  const error = errorHandler(err);
  res.status(error.status).json(error);
});

//stablishing the connection
const connection = app.listen(port, () => {
  console.log(`news app listenning on port ${port}`);
});
