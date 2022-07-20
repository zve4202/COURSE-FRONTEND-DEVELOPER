const { Schema, model } = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const schema = new Schema(
  {
    _id: { type: Number, required: true },
    article: { type: String, required: true },
    title: { type: Number, ref: "Title", required: true },
    quality: { type: String },
    price: { type: Number, required: true },
    count: { type: Number, required: true },
  },
  { timestamps: true }
);

schema.plugin(aggregatePaginate);

module.exports = model("Product", schema);
