const { Schema, model } = require("mongoose");

const sexes = ["male", "female"];

module.exports = model(
  "User",
  new Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
      sex: { type: String, enum: sexes, required: true },
      role: { type: String, ref: "Role" },
    },
    { timestamps: true }
  )
);
