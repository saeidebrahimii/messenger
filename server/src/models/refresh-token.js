const { Types, model } = require("mongoose");
const { Schema } = require("mongoose");

const refreshTokenSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
      ref: "Users",
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);
const RefreshToken = model("RefreshToken", refreshTokenSchema);
module.exports = { RefreshToken };
