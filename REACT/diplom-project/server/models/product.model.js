const { Schema, model } = require("mongoose");

module.exports = model(
  "Product",
  new Schema(
    {
      _id: { type: Number, required: true },
      article: { type: String, required: true },
      title: { type: Number, ref: "Title", required: true },
      quality: { type: String },
      price: { type: Number, required: true },
      count: { type: Number, required: true },
    },
    { timestamps: true }
  )
);
