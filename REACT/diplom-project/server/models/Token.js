const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    accessToken: { type: String, require: true },
    refreshToken: { type: String, require: true },
    expiresIn: Number,
  },
  { timestamps: true }
);

module.exports = model("Token", schema);
