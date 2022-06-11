const { Schema, model } = require("mongoose");
const ObjectIdType = Schema.Types.ObjectId;

module.exports = model(
  "Product",
  new Schema(
    {
      articul: { type: String, required: true },
      catalog: { type: ObjectIdType, ref: "Catalog", required: true },
      price: { type: Number, required: true },
      count: { type: Number, required: true },
    },
    { timestamps: true }
  )
);
