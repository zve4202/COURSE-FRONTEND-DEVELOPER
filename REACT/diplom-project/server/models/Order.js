const { Schema, model } = require("mongoose");
const ObjectIdType = Schema.Types.ObjectId;

const statuses = ["new, ordered", "pending", "assembled", "sent", "deleted"];
module.exports = statuses;

const schema = new Schema(
    {
        userId: { type: ObjectIdType, ref: "User" },
        status: {
            type: String,
            enum: statuses,
            required: true,
            default: "new"
        },
        count: {
            type: Number,
            required: true,
            default: 0
        },
        price: {
            type: Number,
            required: true,
            default: 0
        }
    },
    { timestamps: true }
);

module.exports = model("Order", schema);
