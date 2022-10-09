const express = require("express");
const app = express();
const cors = require("cors");
const board = require("./routes/board");
const list = require("./routes/list");
const user = require("./routes/user");

app.use(cors());
app.use(express.json());

app.use("/api/v1/board", board);
app.use("/api/v1/board", list);
app.use("/api/v1/user", user);

module.exports = app;
