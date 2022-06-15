const { Schema, model } = require("mongoose");
const ObjectIdType = Schema.Types.ObjectId;

const statuses = ["basket", "order", "pending", "assembled", "sent", "deleted"];
module.exports = statuses;
module.exports = model(
  "Order",
  new Schema(
    {
      userId: { type: ObjectIdType, ref: "User" },
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
