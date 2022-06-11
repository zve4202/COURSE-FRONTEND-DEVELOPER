const { Schema, model } = require("mongoose");
const ObjectIdType = Schema.Types.ObjectId;

module.exports = model(
  "Catalog",
  new Schema(
    {
      barcode: { type: String, required: true },
      artist: { type: String, required: true },
      title: { type: String, required: true },
      format: { type: ObjectIdType, ref: "Format", required: true },
      label: { type: ObjectIdType, ref: "Label", required: true },
      country: { type: String },
      year_release: { type: Number },
      picture: { type: String },
    },
    { timestamps: true }
  )
);
