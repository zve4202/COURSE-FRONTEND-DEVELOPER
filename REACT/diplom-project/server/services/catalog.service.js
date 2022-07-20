const Model = require("../models/Catalog");

exports.get = async function (id) {
    try {
        const data = await Model.findById(id);
        return data;
    } catch (error) {
        throw Error("Not found");
    }
};

exports.update = async function (id, dataUpdate) {
    try {
        const data = await Model.findByIdAndUpdate(id, dataUpdate, {
            new: true
        });
        console.log(data);
        return data;
    } catch (error) {
        throw Error("Not found");
    }
};

exports.add = async function (data) {
    try {
        const catalog = new Model(data);
        await catalog.save();
        return catalog;
    } catch (error) {
        throw Error(error);
    }
};

exports.delete = async function (id) {
    try {
        const catalog = await Model.findByIdAndDelete(id);
        if (catalog === null) {
            throw Error(`id: ${id} not found`);
        }
        return catalog;
    } catch (error) {
        throw Error("Model not Found");
    }
};

exports.getList = async function (query, page, limit) {
    try {
        const data = await Model.find(query);
        return data;
    } catch (e) {
        // Log Errors
        throw Error("Error while Paginating Model");
    }
};
