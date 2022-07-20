const Label = require("../models/Label");

exports.get = async function (id) {
    try {
        const data = await Label.findById(id);
        return data;
    } catch (error) {
        throw Error("Label not found");
    }
};

exports.update = async function (id, dataUpdate) {
    try {
        const data = await Label.findByIdAndUpdate(id, dataUpdate, {
            new: true
        });
        console.log(data);
        return data;
    } catch (error) {
        throw Error("Label not found");
    }
};

exports.add = async function (data) {
    try {
        const label = new Label(data);
        await label.save();
        return label;
    } catch (error) {
        throw Error(error);
    }
};

exports.delete = async function (id) {
    try {
        const label = await Label.findByIdAndDelete(id);
        if (label === null) {
            throw Error(`id: ${id} not found`);
        }
        return label;
    } catch (error) {
        throw Error("Label not Found");
    }
};

exports.getList = async function (query, page, limit) {
    try {
        const data = await Label.find(query);
        return data;
    } catch (e) {
        // Log Errors
        throw Error("Error while Paginating Label");
    }
};
