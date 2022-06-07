const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.role = require("./role.model");
db.user = require("./user.model");
// db.comment = require("./comment.model");
// db.favourite = require("./favourite.model");
// db.meeting = require("./meeting.model");
// db.profession = require("./profession.model");
// db.quality = require("./quality.model");

module.exports = db;
