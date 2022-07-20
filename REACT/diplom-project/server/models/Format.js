const { Schema, model } = require("mongoose");

const schema = new Schema({
  _id: { type: Number, required: true },
  alias: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: Number, ref: "Category" },
});

module.exports = model("Format", schema);
