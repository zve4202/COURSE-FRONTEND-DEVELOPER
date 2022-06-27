const { Schema, model } = require("mongoose");

module.exports = model(
  "Category",
  new Schema({
    _id: { type: Number, required: true },
    alias: { type: String, required: true },
    name: { type: String, required: true },
  })
);
