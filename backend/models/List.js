const mongoose = require("mongoose");

const listSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card",
    },
  ],
});

module.exports = mongoose.model("List", listSchema);
