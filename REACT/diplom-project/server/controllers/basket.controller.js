var Service = require("../services/basket.service");

exports.get = async function (req, res, next) {
  const { id } = req.params;
  try {
    const data = await Service.get(id);
    return res.status(200).json({
      status: 200,
      content: data,
      message: "Succesfully data Retrieved",
    });
  } catch (e) {
    return res.status(404).json({ status: 404, message: e.message });
  }
};
exports.getEx = async function (req, res, next) {
  const { id } = req.params;
  try {
    const data = await Service.getEx(id);
    return res.status(200).json({
      status: 200,
      content: data,
      message: "Succesfully data Retrieved",
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
    const data = await Service.delete(id);
    return res.status(200).json({
      status: 200,
      content: data,
      message: "Succesfully deleted",
    });
  } catch (e) {
    return res.status(404).json({ status: 404, message: e.message });
  }
};
