const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Board = require("./Board");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    minlength: [6, "Password must be at least of 6 characters"],
    required: [true, "Password is required"],
    // (select : false) tells all the data of a user will be fetched except password(in this case)
    select: false,
  },
  avatar: {
    public_id: String,
    url: String,
  },
  description: String,
  boards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.ACCESS_TOKEN_SECRET);
};

module.exports = mongoose.model("User", userSchema);
