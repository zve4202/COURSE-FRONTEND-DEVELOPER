const { Schema, model } = require("mongoose");
const ObjectIdType = Schema.Types.ObjectId;

module.exports = model(
  "Format",
  new Schema({
    _id: { type: Number, required: true },
    alias: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: Number, ref: "Category" },
  })
);
