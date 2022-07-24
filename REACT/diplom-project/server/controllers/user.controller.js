const { DATA_UPDATED, DATA_RECEIVED } = require("../config/config");
const UserService = require("../services/user.service");

exports.getAll = async function (req, res, next) {
    // Validate request parameters, queries using express-validator

    const { query } = req;
    const page = query.page ? query.page : 1;
    const limit = query.limit ? query.limit : 100;

    delete query.page;
    delete query.limit;

    try {
        const users = await UserService.getAll(query, page, limit);
        return res.status(200).json({
            status: 200,
            content: users,
            message: DATA_RECEIVED
        });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
};
exports.getUser = async function (req, res, next) {
    // Validate request parameters, queries using express-validator

    try {
        const user = await UserService.getUser(req.userId || req.params.userId);
        // console.log(user);
        return res.status(200).json({
            status: 200,
            content: user,
            message: DATA_RECEIVED
        });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
};

exports.update = async function (req, res, next) {
    const { userId } = req.params;
    try {
        const user = await UserService.update(userId, req.body);
        return res.status(200).json({
            status: 200,
            content: user,
            message: DATA_UPDATED
        });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
};
