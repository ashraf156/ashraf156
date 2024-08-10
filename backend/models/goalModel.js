const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },

    text: {
      type: String,
      required: [true, "Please add a goal"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Goal", goalSchema);
