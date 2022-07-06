var Service = require("../services/product.service");

exports.getList = async function (req, res, next) {
  // Validate request parameters, queries using express-validator

  var page = req.params.page ? req.params.page : 1;
  var limit = req.params.limit ? req.params.limit : 100;
  try {
    var data = await Service.getList({}, page, limit);
    return res.status(200).json({
      status: 200,
      content: data,
      message: "Succesfully retrieved",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
exports.getListEx = async function (req, res, next) {
  // Validate request parameters, queries using express-validator
  const { query } = req;
  var page = query.page ? query.page : 1;
  var limit = query.limit ? query.limit : 100;

  try {
    var data = await Service.getListEx(query, page, limit);
    return res.status(200).json({
      status: 200,
      content: data,
      message: "Succesfully retrieved",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.get = async function (req, res, next) {
  const { id } = req.params;
  try {
    const data = await Service.get(id);
    return res.status(200).json({
      status: 200,
      content: data,
      message: "Succesfully retrieved",
    });
  } catch (e) {
    return res.status(404).json({ status: 404, message: e.message });
  }
};
exports.update = async function (req, res, next) {
  const { id } = req.params;
  try {
    const data = await Service.update(id, req.body);
    return res.status(200).json({
      status: 200,
      content: data,
      message: "Succesfully updated",
    });
  } catch (e) {
    return res.status(404).json({ status: 404, message: e.message });
  }
};
exports.add = async function (req, res, next) {
  try {
    const data = await Service.add(req.body);
    return res.status(200).json({
      status: 200,
      content: data,
      message: "Succesfully created",
    });
  } catch (e) {
    return res.status(400).json({ status: 404, message: e.message });
  }
};
exports.delete = async function (req, res, next) {
  const { id } = req.params;
  try {
    const role = await Service.delete(id);
    return res.status(200).json({
      status: 200,
      content: role,
      message: "Succesfully deleted",
    });
  } catch (e) {
    return res.status(404).json({ status: 404, message: e.message });
  }
};
