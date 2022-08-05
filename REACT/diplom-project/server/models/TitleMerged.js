const { Schema, model } = require("mongoose");

const schema = new Schema({
    _id: { type: Number, required: true },
    alias: { type: String, required: true },
    barcode: { type: String, required: true },
    artist: { type: Object },
    name: { type: String, required: true },
    format: { type: Object },
    year: { type: String },
    label: { type: Object },
    style: { type: String },
    origin: { type: String },
    image: { type: String }
});

module.exports = model("Title_m", schema);
