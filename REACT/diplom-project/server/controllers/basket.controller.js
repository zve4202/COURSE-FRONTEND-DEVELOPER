const Service = require("../services/basket.service");

exports.get = async function (req, res, next) {
    const { id } = req.params;
    try {
        const data = await Service.get(id);
        return res.status(200).json({
            status: 200,
            content: data,
            message: "Succesfully data Retrieved"
        });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
};

exports.getEx = async function (req, res, next) {
    const { id } = req.params;
    try {
        const data = await Service.getEx(id);
        return res.status(200).json({
            status: 200,
            content: data,
            message: "Succesfully data Retrieved"
        });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
};

exports.update = async function (req, res, next) {
    const { id } = req.params;
    try {
        const data = await Service.update(id, req.body);
        return res.status(200).json({
            status: 200,
            content: data,
            message: DATA_UPDATED
        });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
};

exports.add = async function (req, res, next) {
    try {
        const data = await Service.add(req.body);
        return res.status(200).json({
            status: 200,
            content: data,
            message: DATA_CREATED
        });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
};

exports.delete = async function (req, res, next) {
    const { id } = req.params;
    try {
        const data = await Service.delete(id);
        return res.status(200).json({
            status: 200,
            content: data,
            message: DATA_DELETED
        });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
};

exports.apply = async function (req, res, next) {
    const { id } = req.params;
    try {
        const data = await Service.update(id, req.body);
        return res.status(200).json({
            status: 200,
            content: data,
            message: DATA_UPDATED
        });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
};
