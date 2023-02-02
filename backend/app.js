require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const board = require("./routes/board");
const list = require("./routes/list");
const user = require("./routes/user");
const { requestLogger } = require("./utils/requestLogger");
const sendEmail = require("./utils/sendEmail");
// sendEmail({
//   to: "pkds2585@gmail.com",
//   subject: "Testing",
//   message: "Hi Pankaj!",
// });

app.use(cors());
app.use(express.json({ limit: "10mb", extended: true }));
app.use(requestLogger);

app.use("/api/v1/board", board);
app.use("/api/v1/board", list);
app.use("/api/v1/user", user);

module.exports = app;
