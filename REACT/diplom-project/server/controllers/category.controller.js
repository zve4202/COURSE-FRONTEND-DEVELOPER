const Service = require("../services/category.service");

exports.getList = async function (req, res, next) {
    // Validate request parameters, queries using express-validator
    const page = req.params.page ? req.params.page : 1;
    const limit = req.params.limit ? req.params.limit : 10;
    try {
        const content = await Service.getList({}, page, limit);
        return res.status(200).json({
            status: 200,
            content: content,
            message: "Succesfully retrieved"
        });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
};
