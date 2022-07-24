const Service = require("../services/role.service");

exports.getList = async function (req, res, next) {
    // Validate request parameters, queries using express-validator

    const page = req.params.page ? req.params.page : 1;
    const limit = req.params.limit ? req.params.limit : 10;
    try {
        const roles = await Service.getList({}, page, limit);
        return res.status(200).json({
            status: 200,
            content: roles,
            message: "Succesfully retrieved"
        });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
};

exports.get = async function (req, res, next) {
    const { id } = req.params;
    try {
        const role = await Service.get(id);
        return res.status(200).json({
            status: 200,
            content: role,
            message: "Succesfully retrieved"
        });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
};

exports.update = async function (req, res, next) {
    const { id } = req.params;
    try {
        const role = await Service.update(id, req.body);
        return res.status(200).json({
            status: 200,
            content: role,
            message: "Succesfully updated"
        });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
};

exports.add = async function (req, res, next) {
    try {
        const role = await Service.add(req.body);
        return res.status(200).json({
            status: 200,
            content: role,
            message: "Succesfully created"
        });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
};

exports.delete = async function (req, res, next) {
    const { id } = req.params;
    try {
        const role = await Service.delete(id);
        return res.status(200).json({
            status: 200,
            content: role,
            message: "Succesfully deleted"
        });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
};
