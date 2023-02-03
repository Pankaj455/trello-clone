const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => console.log(`Database connected: ${con.connection.host}`))
    .catch((err) => console.log("Error - ", err));
};
