const server = require("./app");
require("dotenv").config({ path: "./config/config.env" });

// making connection to the database
const connectDatabase = require("./config/database");
connectDatabase();

server.listen(process.env.PORT, () =>
  console.log(`server is running on PORT: ${process.env.PORT}`)
);
