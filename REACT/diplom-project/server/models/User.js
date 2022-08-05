const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const slug = require("mongoose-slug-generator");
const { createId } = require("../utils/db_utils");

mongoose.plugin(slug);
const sexes = ["male", "female"];

const schema = new mongoose.Schema(
    {
        _id: { type: Number },
        alias: { type: String, slug: "name" },
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        sex: { type: String, enum: sexes, required: true },
        role: { type: String, ref: "Role" },
        image: { type: String }
    },
    { timestamps: true }
);

schema.pre("save", async function (next) {
    if (!this._id) {
        this._id = await createId("user");
    }
    next();
});

schema.plugin(aggregatePaginate);

module.exports = mongoose.model("User", schema);
