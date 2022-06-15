const Order = require("../models/order.model");

exports.get = async function (id) {
  try {
    const data = await Order.findById(id);
    return data;
  } catch (error) {
    throw Error("Order not found");
  }
};

exports.update = async function (id, dataUpdate) {
  try {
    const data = await Order.findByIdAndUpdate(id, dataUpdate, {
      new: true,
    });
    console.log(data);
    return data;
  } catch (error) {
    throw Error("Order not found");
  }
};

exports.add = async function (data) {
  try {
    const order = new Order(data);
    await order.save();
    return order;
  } catch (error) {
    throw Error(error);
  }
};

exports.delete = async function (id) {
  try {
    const order = await Order.findByIdAndDelete(id);
    if (order === null) {
      throw Error(`id: ${id} not found`);
    }
    return order;
  } catch (error) {
    throw Error("Order not Found");
  }
};

exports.getList = async function (query, page, limit) {
  try {
    const data = await Order.find(query);
    return data;
  } catch (e) {
    // Log Errors
    throw Error("Error while Paginating Order");
  }
};
