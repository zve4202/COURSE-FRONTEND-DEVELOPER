const { Schema, model } = require("mongoose");

const { statuses } = require("./Order");

const schema = new Schema(
  {
    orderId: { type: Number, ref: "Order", required: true },
    productId: { type: Number, ref: "Product", required: true },
    status: {
      type: String,
      enum: statuses,
      required: true,
      default: "ordered",
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
);

module.exports = model("OrderList", schema);
