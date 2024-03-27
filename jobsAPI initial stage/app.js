require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const connect = require("./connectDb/connect");

const authRouter = require("./routes/authenticate");
const jobsRouter = require("./routes/jobs");

const notFound = require("./middleware/notFoundMiddleware");
const errorHandler = require("./middleware/errorMiddleware");

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connect(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    error;
  }
};

start();
