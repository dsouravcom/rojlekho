const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const moodSchema = new Schema(
  {
    emotionSlug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    emotionName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

// index the emotionSlug field
moodSchema.index({ emotionSlug: 1 }, { unique: true });

const Mood = model("Mood", moodSchema);

module.exports = Mood;
