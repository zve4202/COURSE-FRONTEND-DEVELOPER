var Model = require("../models/Format");

exports.getAll = async function (query, page, limit) {
    try {
        var data = await Model.find(query);
        return data;
    } catch (e) {
        // Log Errors
        throw Error("Error while Paginating Model");
    }
};
