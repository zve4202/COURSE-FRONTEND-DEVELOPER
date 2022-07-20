const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        content: {
            type: String,
            require: true
        },
        pageId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    { timestamps: { createdAt: "created_at" } }
);

module.exports = model("Comment", schema);
