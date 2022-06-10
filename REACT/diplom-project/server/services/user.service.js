var User = require("../models/user.model");

exports.getUserList = async function (query, page, limit) {
  try {
    var users = await User.find(query);

    return users;
  } catch (e) {
    // Log Errors
    throw Error("Error while Paginating Users");
  }
};
exports.getUser = async function (id) {
  try {
    var users = await User.findById(id);
    return users;
  } catch (e) {
    // Log Errors
    throw Error("Error while Paginating Users");
  }
};

exports.addUser = async function (query, page, limit) {
  try {
    var users = await User.find(query);
    return users;
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
    const data = await User.findByIdAndUpdate(id, user, {
      new: true,
    });
    console.log(data);
    return data;
  } catch (error) {
    throw Error("Role not found");
  }
};
