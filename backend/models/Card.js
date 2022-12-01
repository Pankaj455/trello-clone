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
      theme: {
        color: String,
        bg: String,
      },
    },
  ],
  cover: {
    public_id: String,
    url: String,
  },
  comments: [
    {
      _id: String,
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
      },
      comment: {
        type: String,
        required: true,
      },
      commentedAt: {
        type: Date,
        default: new Date(),
      },
    },
  ],
});

module.exports = mongoose.model("Card", cardSchema);
