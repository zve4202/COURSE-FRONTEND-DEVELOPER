const { Schema, model } = require("mongoose");

module.exports = model(
  "Label",
  new Schema(
    {
      name: { type: String, required: true },
    },
    { timestamps: true }
  )
);
