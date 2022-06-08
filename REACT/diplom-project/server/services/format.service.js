var Format = require("../models/format.model");

exports.getUsers = async function (query, page, limit) {
  try {
    var users = await Format.find(query);
    return users;
  } catch (e) {
    // Log Errors
    throw Error("Error while Paginating Format");
  }
};
