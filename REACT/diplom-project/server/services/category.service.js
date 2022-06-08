const Model = require("../models/category.model");

exports.getList = async function (query, page, limit) {
  try {
    const data = await Model.find(query);
    return data;
  } catch (e) {
    // Log Errors
    throw Error("Error while Paginating Categories");
  }
};
