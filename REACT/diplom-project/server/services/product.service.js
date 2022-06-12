const Product = require("../models/product.model");

exports.get = async function (id) {
  try {
    const data = await Product.findById(id);
    return data;
  } catch (error) {
    throw Error("Product not found");
  }
};

exports.update = async function (id, dataUpdate) {
  try {
    const data = await Product.findByIdAndUpdate(id, dataUpdate, {
      new: true,
    });
    console.log(data);
    return data;
  } catch (error) {
    throw Error("Product not found");
  }
};

exports.add = async function (data) {
  try {
    const product = new Product(data);
    await product.save();
    return product;
  } catch (error) {
    throw Error(error);
  }
};

exports.delete = async function (id) {
  try {
    const product = await Product.findByIdAndDelete(id);
    if (product === null) {
      throw Error(`id: ${id} not found`);
    }
    return product;
  } catch (error) {
    throw Error("Product not Found");
  }
};

exports.getList = async function (query, page, limit) {
  try {
    const data = await Product.find(query);
    return data;
  } catch (e) {
    // Log Errors
    throw Error("Error while Paginating Product");
  }
};

const agg = [
  {
    $lookup: {
      from: "catalogs",
      localField: "catalog",
      foreignField: "_id",
      as: "catalog",
    },
  },
  {
    $unwind: {
      path: "$catalog",
    },
  },
  {
    $lookup: {
      from: "formats",
      localField: "catalog.format",
      foreignField: "_id",
      as: "catalog.format",
    },
  },
  {
    $unwind: {
      path: "$catalog.format",
    },
  },
  {
    $lookup: {
      from: "labels",
      localField: "catalog.label",
      foreignField: "_id",
      as: "catalog.label",
    },
  },
  {
    $unwind: {
      path: "$catalog.label",
    },
  },
];

exports.getListEx = async function (query, page, limit) {
  try {
    const data = await Product.aggregate(agg);
    // .lookup({
    //   from: "catalogs",
    //   localField: "catalog",
    //   foreignField: "_id",
    //   as: "catalog",
    // })
    // .unwind({
    //   path: "$catalog",
    // })
    // .lookup({
    //   from: "formats",
    //   localField: "catalog.format",
    //   foreignField: "_id",
    //   as: "catalog.format",
    // })
    // .unwind({
    //   path: "$catalog.format",
    // })
    // .lookup({
    //   from: "labels",
    //   localField: "catalog.label",
    //   foreignField: "_id",
    //   as: "catalog.label",
    // })
    // .unwind({
    //   path: "$catalog.label",
    // });
    return data;
  } catch (e) {
    // Log Errors
    throw Error("Error while Paginating Product");
  }
};
