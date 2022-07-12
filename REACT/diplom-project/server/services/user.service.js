var Model = require("../models/user.model");
const { getSort, getMatching } = require("../utils/db_utils");

const sortMap = {
  name: ["name"],
  email: ["email"],
};

const searchMap = {
  category: "role",
  search: ["name"],
};

exports.getAll = async function (query, page, limit) {
  const options = {
    page,
    limit,
  };

  const sort = getSort(query, sortMap);

  if (sort) {
    options.sort = sort;
  }

  const match = getMatching(query, searchMap);
  console.log("match", match);

  try {
    const aggregate = match ? Model.aggregate(match) : {};
    // console.log("aggregate", aggregate);

    const data = await Model.aggregatePaginate(aggregate, options);
    return data;
  } catch (e) {
    // Log Errors
    throw Error(e.message);
  }
};
exports.getUser = async function (id) {
  try {
    var data = await Model.findById(id);
    return data;
  } catch (e) {
    // Log Errors
    throw Error("Error while Paginating Users");
  }
};

exports.addUser = async function (query, page, limit) {
  try {
    var data = await Model.find(query);
    return data;
  } catch (e) {
    // Log Errors
    throw Error("Error while Paginating Users");
  }
};

exports.update = async function (id, user) {
  try {
    if (user.new_password) {
      delete user.new_password;
      const salt = await bcrypt.genSalt(5);
      user.password = await bcrypt.hash(user.password, salt);
    }
    const data = await Model.findByIdAndUpdate(id, user, {
      new: true,
    });
    console.log(data);
    return data;
  } catch (error) {
    throw Error("Role not found");
  }
};
