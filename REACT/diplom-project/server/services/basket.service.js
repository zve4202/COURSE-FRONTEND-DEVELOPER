const Model = require("../models/Basket");
const { Types } = require("mongoose");

exports.get = async function (id) {
    try {
        const data = await Model.findById(id);
        return data;
    } catch (error) {
        throw Error(error);
    }
};

exports.update = async function (id, dataUpdate) {
    try {
        const { docs } = dataUpdate;
        const totals = { totalQty: 0, totalPrice: 0 };
        docs.forEach((item) => {
            const { qty, price } = item;
            totals.totalQty += qty;
            totals.totalPrice += qty * price;
        });
        const data = await Model.findByIdAndUpdate(
            id,
            { ...dataUpdate, ...totals },
            {
                new: true
            }
        );
        console.log(data);
        return data;
    } catch (error) {
        throw Error(error);
    }
};

exports.add = async function (data) {
    try {
        const model = new Model(data);
        console.log(model);
        await model.save();
        return model;
    } catch (error) {
        console.log(error);
        throw Error(error);
    }
};

exports.delete = async function (id) {
    try {
        const model = await Model.findByIdAndDelete(id);
        if (model === null) {
            throw Error(`${Model.name} id: ${id} not found`);
        }
        return model;
    } catch (error) {
        throw Error(error);
    }
};

const agg = (id) => [
    {
        $match: {
            _id: new Types.ObjectId(id)
        }
    },
    {
        $lookup: {
            from: "products_ms",
            localField: "docs.id",
            foreignField: "_id",
            as: "products"
        }
    }
];

exports.getEx = async function (id) {
    try {
        const match = agg(id);
        console.log(match);
        const data = await Model.aggregate(match);
        console.log(data);
        return data[0];
    } catch (error) {
        throw Error(error);
    }
};
