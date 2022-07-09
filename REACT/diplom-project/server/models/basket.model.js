const { Schema, model } = require("mongoose");
const ObjectIdType = Schema.Types.ObjectId;
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const schema = new Schema(
  {
    _id: { type: Number, required: true },
    userId: { type: ObjectIdType, ref: "User", unique: true },
    entities: { type: Object, required: true },
    totalQty: { type: Number, required: true, default: 0 },
    totalPrice: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

schema.plugin(aggregatePaginate);

module.exports = model("Basket", schema);
