const { getSort, getMatching } = require("../utils/db_utils");
const { slugify } = require("../utils");
const { product_m } = require("../models");
const Product = require("../models/Product");

const {
    DATA_CREATED,
    DATA_UPDATED,
    DATA_RECEIVED,
    DATA_DELETED
} = require("../config/config");

const searchMap = {
    category: "title.format.category",
    search: ["title.artist.alias", "title.alias"]
};

const sortMap = {
    name: ["title.artist.name", "title.title"],
    format: ["title.format.name"],
    label: ["title.label.name"],
    origin: ["title.origin"],
    price: ["price"]
};

exports.getAll = async function (req, res, next) {
    const { query } = req;

    const options = {
        page: query.page || 1,
        limit: query.limit || 100
    };
    delete query.page;
    delete query.limit;
    const sort = getSort(query);
    if (sort) {
        delete query.sort;
        delete query.order;
        options.sort = sort;
    }
    const match = getMatching(query);

    try {
        const aggregate = match ? await product_m.aggregate(match) : {};
        const data = await product_m.aggregatePaginate(aggregate, options);
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
        const data = await Product.findById(id);
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
        const data = await Product.findByIdAndUpdate(id, dataUpdate, {
            new: true
        });
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
        const data = await Product.create(req.body);
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
        const data = await Product.findByIdAndDelete(id);
        if (data === null) {
            throw Error(`id: ${id} not found`);
        }
        return res.status(200).json({
            status: 200,
            content: data,
            message: DATA_DELETED
        });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
};
