const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.role = require("./role.model");
db.user = require("./user.model");
db.category = require("./category.model");
db.format = require("./format.model");
db.label = require("./label.model");
db.catalog = require("./catalog.model");
db.product = require("./product.model");
db.order = require("./order.model");
db.order_details = require("./order_details.model");

module.exports = db;
