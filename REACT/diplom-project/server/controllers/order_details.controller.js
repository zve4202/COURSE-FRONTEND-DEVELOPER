const {
    DATA_RECEIVED,
    DATA_UPDATED,
    DATA_CREATED,
    DATA_DELETED
} = require("../config/config");
const Service = require("../services/order.service");

exports.getList = async function (req, res, next) {
    // Validate request parameters, queries using express-validator
    const { orderId } = req.params;
    const page = req.params.page ? req.params.page : 1;
    const limit = req.params.limit ? req.params.limit : 100;
    try {
        const data = await Service.getList({ orderId: orderId }, page, limit);
        return res.status(200).json({
            status: 200,
            content: data,
            message: DATA_RECEIVED
        });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
};

exports.get = async function (req, res, next) {
    const { id } = req.params;
    try {
        const data = await Service.get(id);
        return res.status(200).json({
            status: 200,
            content: data,
            message: DATA_RECEIVED
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
