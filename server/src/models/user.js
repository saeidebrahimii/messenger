const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: false,
      default: true,
    },
    emailVerifiedAt: {
      type: Date,
      required: false,
    },
    avatar: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
const userModel = model("User", userSchema);
module.exports = userModel;
