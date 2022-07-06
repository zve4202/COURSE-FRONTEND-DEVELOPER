const { slugify } = require("../../internet-shop/src/app/utils");
const { product_m } = require("../models");
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

// {$or: [{"title.artist.alias": {"$regex": "abba"}}, {"title.alias": {"$regex": "abba"}}]}
/*
  {
    $match: {
      $or: [
        {
          "title.artist.alias": {
            $regex: "abba",
          },
        },
        {
          "title.alias": {
            $regex: "abba",
          },
        },
      ],
    },
  },
*/
const agg = [
  {
    $lookup: {
      from: "titles",
      localField: "title",
      foreignField: "_id",
      as: "title",
    },
  },
  {
    $unwind: {
      path: "$title",
    },
  },
  {
    $lookup: {
      from: "artists",
      localField: "title.artist",
      foreignField: "_id",
      as: "title.artist",
    },
  },
  {
    $unwind: {
      path: "$title.artist",
    },
  },
  {
    $lookup: {
      from: "formats",
      localField: "title.format",
      foreignField: "_id",
      as: "title.format",
    },
  },
  {
    $unwind: {
      path: "$title.format",
    },
  },
  {
    $lookup: {
      from: "labels",
      localField: "title.label",
      foreignField: "_id",
      as: "title.label",
    },
  },
  {
    $unwind: {
      path: "$title.label",
    },
  },
];

//const aggregate = Product.aggregate(agg);

const search_by = ({ search, category }) => {
  const result = [];
  let match = {};
  const $or = [];
  if (category) {
    match = {
      "title.format.category": Number(category),
    };
  }
  if (search) {
    const alias = slugify(search);
    $or.push(
      {
        "title.artist.alias": {
          $regex: `${alias}`,
        },
      },
      {
        "title.alias": {
          $regex: `${alias}`,
        },
      }
    );
  }
  if ($or.length > 0) {
    match = { ...match, $or };
  }

  if (Object.keys(match).length > 0) {
    result.push({ $match: match });
  }
  return result;
};

exports.getListEx = async function (query, page, limit) {
  const options = {
    page,
    limit,
    sort: { "title.artist.name": 1, "title.title": 1 },
  };

  const aggr = search_by(query);

  console.log("aggr", aggr);
  try {
    const aggregate = aggr.length > 0 ? product_m.aggregate(aggr) : {};
    const data = await product_m.aggregatePaginate(aggregate, options);
    return data;
  } catch (e) {
    // Log Errors
    throw Error("Error while Paginating Product");
  }
};
