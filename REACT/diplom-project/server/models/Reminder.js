const mongoose = require("mongoose");
const { Types } = mongoose;

const schema = new mongoose.Schema(
    {
        userId: { type: Types.ObjectId, ref: "User" },
        titleId: { type: Number, ref: "Title" },
        reminder: {
            type: String,
            enum: ["notify-me", "to-order"],
            required: true
        }
    },
    { timestamps: true }
);

schema.index({ userId: 1, titleId: 1 }, { unique: true });
module.exports = mongoose.model("Reminder", schema);
