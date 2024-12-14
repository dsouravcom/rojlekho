const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationTokenExpiresAt: {
      type: Date,
    },
    premiumUser: {
      type: Boolean,
      default: false,
    },
    subscription: {
      type: String,
      default: "free",
    },
    subscriptionStartDate: {
      type: Date,
    },
    subscriptionExpirationDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// index the email field
userSchema.index({ email: 1 }, { unique: true });

const User = model("User", userSchema);

module.exports = User;
