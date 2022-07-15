const { product_m } = require("../models");

const agg = [
  {
    $match: {
      count: {
        $gt: 0,
      },
    },
  },
  {
    $group: {
      _id: {
        category: "$title.format.category",
      },
      count: {
        $sum: 1,
      },
    },
  },
  {
    $lookup: {
      from: "categories",
      localField: "_id.category",
      foreignField: "_id",
      as: "category",
    },
  },
  {
    $unwind: {
      path: "$category",
    },
  },
  {
    $project: {
      _id: "$category._id",
      name: "$category.name",
      count: "$count",
    },
  },
  {
    $sort: {
      count: -1,
    },
  },
];

exports.getList = async function (query, page, limit) {
  try {
    const data = await product_m.aggregate(agg);
    // console.log(data);
    return data;
  } catch (error) {
    throw Error(error.message);
  }
};
