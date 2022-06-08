const { Schema, model } = require("mongoose");
const ObjectIdType = Schema.Types.ObjectId;

module.exports = model(
  "Format",
  new Schema(
    {
      name: { type: String, required: true },
      category: { type: ObjectIdType, ref: "Category", required: true },
    },
    { timestamps: true }
  )
);
