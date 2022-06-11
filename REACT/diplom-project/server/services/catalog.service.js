const Catalog = require("../models/catalog.model");

exports.get = async function (id) {
  try {
    const data = await Catalog.findById(id);
    return data;
  } catch (error) {
    throw Error("Catalog not found");
  }
};

exports.update = async function (id, dataUpdate) {
  try {
    const data = await Catalog.findByIdAndUpdate(id, dataUpdate, {
      new: true,
    });
    console.log(data);
    return data;
  } catch (error) {
    throw Error("Catalog not found");
  }
};

exports.add = async function (data) {
  try {
    const catalog = new Catalog(data);
    await catalog.save();
    return catalog;
  } catch (error) {
    throw Error(error);
  }
};

exports.delete = async function (id) {
  try {
    const catalog = await Catalog.findByIdAndDelete(id);
    if (catalog === null) {
      throw Error(`id: ${id} not found`);
    }
    return catalog;
  } catch (error) {
    throw Error("Catalog not Found");
  }
};

exports.getList = async function (query, page, limit) {
  try {
    const data = await Catalog.find(query);
    return data;
  } catch (e) {
    // Log Errors
    throw Error("Error while Paginating Catalog");
  }
};
