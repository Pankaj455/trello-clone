const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then((con) => console.log(`Database connected: ${con.connection.host}`));
};
