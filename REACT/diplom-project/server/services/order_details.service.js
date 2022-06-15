const OrderList = require("../models/order_details.model");

exports.get = async function (id) {
  try {
    const data = await OrderList.findById(id);
    return data;
  } catch (error) {
    throw Error("OrderList not found");
  }
};

exports.update = async function (id, dataUpdate) {
  try {
    const data = await OrderList.findByIdAndUpdate(id, dataUpdate, {
      new: true,
    });
    console.log(data);
    return data;
  } catch (error) {
    throw Error("OrderList not found");
  }
};

exports.add = async function (data) {
  try {
    const order_details = new OrderList(data);
    await order_details.save();
    return order_details;
  } catch (error) {
    throw Error(error);
  }
};

exports.delete = async function (id) {
  try {
    const order_details = await OrderList.findByIdAndDelete(id);
    if (order_details === null) {
      throw Error(`id: ${id} not found`);
    }
    return order_details;
  } catch (error) {
    throw Error("OrderList not Found");
  }
};

exports.getList = async function (query, page, limit) {
  try {
    const data = await OrderList.find(query);
    return data;
  } catch (e) {
    // Log Errors
    throw Error("Error while Paginating OrderList");
  }
};
