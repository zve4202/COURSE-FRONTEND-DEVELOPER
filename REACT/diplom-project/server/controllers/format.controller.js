var Service = require("../services/format.service");

exports.getAll = async function (req, res, next) {
  // Validate request parameters, queries using express-validator
  var page = req.params.page ? req.params.page : 1;
  var limit = req.params.limit ? req.params.limit : 10;
  try {
    var content = await Service.getAll({}, page, limit);
    return res.status(200).json({
      status: 200,
      content: content,
      message: "Succesfully retrieved",
    });
  } catch (e) {
    return res.status(500).json({ status: 500, message: e.message });
  }
};
