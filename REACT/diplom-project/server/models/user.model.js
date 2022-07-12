const { Schema, model } = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const sexes = ["male", "female"];

const schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    sex: { type: String, enum: sexes, required: true },
    role: { type: String, ref: "Role" },
  },
  { timestamps: true }
);

schema.plugin(aggregatePaginate);

module.exports = model("User", schema);
