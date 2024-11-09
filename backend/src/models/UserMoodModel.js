const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userMoodSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    moodId: {
      type: Schema.Types.ObjectId,
      ref: "Mood",
      required: true,
    },
    entryDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserMood = model("UserMood", userMoodSchema);

module.exports = UserMood;
