const mongoose = require("mongoose");
const User = require("./User");

const cardSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: String,
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
  ],
  labels: [
    {
      name: String,
      color: String,
    },
  ],
  cover: {
    public_id: String,
    url: String,
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Card", cardSchema);
