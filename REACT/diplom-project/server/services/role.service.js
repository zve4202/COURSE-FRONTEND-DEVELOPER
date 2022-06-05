const Role = require("../models/role.model");

exports.get = async function (id) {
  try {
    const data = await Role.findById(id);
    return data;
  } catch (error) {
    throw Error("Role not found");
  }
};

exports.update = async function (id, dataUpdate) {
  try {
    const data = await Role.findByIdAndUpdate(id, dataUpdate, {
      new: true,
    });
    console.log(data);
    return data;
  } catch (error) {
    throw Error("Role not found");
  }
};
exports.add = async function (data) {
  try {
    const role = new Role(data);
    await role.save();
    return role;
  } catch (error) {
    throw Error(error);
  }
};
exports.delete = async function (id) {
  try {
    const role = await Role.findByIdAndDelete(id);
    if (role === null) {
      throw Error(`id: ${id} not found`);
    }
    return role;
  } catch (error) {
    throw Error("Role not Found");
  }
};

exports.getList = async function (query, page, limit) {
  try {
    const data = await Role.find(query);
    return data;
  } catch (e) {
    // Log Errors
    throw Error("Error while Paginating Role");
  }
};
