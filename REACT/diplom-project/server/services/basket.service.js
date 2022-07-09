const Model = require("../models/basket.model");

exports.get = async function (id) {
  try {
    const data = await Model.findById(id);
    return data;
  } catch (error) {
    throw Error(error);
  }
};

exports.update = async function (id, dataUpdate) {
  try {
    const { docs } = dataUpdate;
    const totals = { totalQty: 0, totalPrice: 0 };
    docs.forEach((item) => {
      const { qty, price } = item;
      totals.totalQty += qty;
      totals.totalPrice += qty * price;
    });
    const data = await Model.findByIdAndUpdate(
      id,
      { ...dataUpdate, ...totals },
      {
        new: true,
      }
    );
    console.log(data);
    return data;
  } catch (error) {
    throw Error(error);
  }
};

exports.add = async function (data) {
  try {
    const model = new Model(data);
    await model.save();
    return model;
  } catch (error) {
    throw Error(error);
  }
};

exports.delete = async function (id) {
  try {
    const model = await Model.findByIdAndDelete(id);
    if (model === null) {
      throw Error(`${Model.name} id: ${id} not found`);
    }
    return model;
  } catch (error) {
    throw Error(error);
  }
};

exports.getList = async function (query, page, limit) {
  try {
    const data = await Model.find(query);
    return data;
  } catch (error) {
    throw Error(error);
  }
};
