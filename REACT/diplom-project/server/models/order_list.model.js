const { Schema, model } = require("mongoose");
const ObjectIdType = Schema.Types.ObjectId;

const { statuses } = require("./order.model");

module.exports = model(
  "OrderList",
  new Schema(
    {
      orderId: { type: ObjectIdType, ref: "Order", required: true },
      productId: { type: ObjectIdType, ref: "Product", required: true },
      status: {
        type: String,
        enum: statuses,
        required: true,
        default: "basket",
      },
      count: {
        type: Number,
        required: true,
        default: 0,
      },
      price: {
        type: Number,
        required: true,
        default: 0,
      },
    },
    { timestamps: true }
  )
);
