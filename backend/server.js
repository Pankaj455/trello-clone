const server = require("./app");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");

// making connection to the database
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

server.listen(process.env.PORT, () =>
  console.log(`server is running on PORT: ${process.env.PORT}`)
);
