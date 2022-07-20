const { Schema, model } = require("mongoose");

const schema = new Schema({
  _id: { type: Number, required: true },
  alias: { type: String, required: true },
  barcode: { type: String, required: true },
  artist: { type: Object },
  title: { type: String, required: true },
  format: { type: Object },
  label: { type: Object },
  origin: { type: String },
  year: { type: String },
  image: { type: String },
});

module.exports = model("Title_m", schema);
