const mongoose = require("mongoose");

const boardSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  cover: {
    public_id: String,
    url: String,
  },
  description: String,
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  visibility: {
    type: Boolean,
    default: true,
  },
  lists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Board", boardSchema);
