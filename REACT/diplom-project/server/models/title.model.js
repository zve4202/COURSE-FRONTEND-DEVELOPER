const { Schema, model } = require("mongoose");
const ObjectIdType = Schema.Types.ObjectId;

module.exports = model(
  "Title",
  new Schema({
    _id: { type: Number, required: true },
    alias: { type: String, required: true },
    barcode: { type: String, required: true },
    artist: { type: Number, ref: "Artist", required: true },
    title: { type: String, required: true },
    format: { type: Number, ref: "Format", required: true },
    label: { type: Number, ref: "Label" },
    origin: { type: String },
    year: { type: String },
    image: { type: String },
  })
);
