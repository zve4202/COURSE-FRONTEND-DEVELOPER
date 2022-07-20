const { slugify } = require("../../internet-shop/src/app/utils");
const { product_m } = require("../models");
const Product = require("../models/Product");

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
            new: true
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
            as: "title"
        }
    },
    {
        $unwind: {
            path: "$title"
        }
    },
    {
        $lookup: {
            from: "artists",
            localField: "title.artist",
            foreignField: "_id",
            as: "title.artist"
        }
    },
    {
        $unwind: {
            path: "$title.artist"
        }
    },
    {
        $lookup: {
            from: "formats",
            localField: "title.format",
            foreignField: "_id",
            as: "title.format"
        }
    },
    {
        $unwind: {
            path: "$title.format"
        }
    },
    {
        $lookup: {
            from: "labels",
            localField: "title.label",
            foreignField: "_id",
            as: "title.label"
        }
    },
    {
        $unwind: {
            path: "$title.label"
        }
    }
];

const sortMap = {
    name: ["title.artist.name", "title.title"],
    format: ["title.format.name"],
    label: ["title.label.name"],
    origin: ["title.origin"],
    price: ["price"]
};

const getSort = ({ sort, order }) => {
    if (sort) {
        const map = sortMap[sort];
        if (map) {
            const result = {};

            map.forEach((field) => {
                result[field] = Number(order);
            });
            return result;
        }
    }
    return null;
};

const searchMap = {
    category: "title.format.category",
    search: ["title.artist.alias", "title.alias"]
};

const getMatching = (query) => {
    if (Object.keys(query).length === 0) return null;

    const result = [];
    const $match = {};
    const $or = [];

    Object.keys(query).forEach((key) => {
        const map = searchMap[key];
        if (map) {
            let value = query[key];
            const numvalue = Number(value);
            // console.log("numvalue", typeof numvalue, numvalue);
            if (numvalue && numvalue == value) {
                value = numvalue;
            }
            // console.log(key, "typeof value", typeof value, value);

            if (Array.isArray(map)) {
                const alias = slugify(value);
                map.forEach((field) => {
                    if (field.includes("alias")) {
                        value = {
                            $regex: `${alias}`
                        };
                    } else {
                        value = {
                            $regex: `${value}`,
                            $options: "i"
                        };
                    }
                    $or.push({
                        [field]: value
                    });
                });
            } else {
                $match[map] = value;
            }
        }
    });

    if ($or.length > 0) {
        // console.log("$match", $match);
        // console.log("$or", $or);
        $match.$or = $or;
    }

    if (Object.keys($match).length === 0) return null;

    result.push({ $match });

    return result;
};

exports.getListEx = async function (query, page, limit) {
    const options = {
        page,
        limit
    };

    const sort = getSort(query);
    // console.log("sort", sort, query);
    if (sort) {
        delete query.sort;
        delete query.order;
        options.sort = sort;
    }
    // console.log(query);
    const match = getMatching(query);
    // console.log("match", match);
    // const aggr = search_by(query);

    // console.log("aggr", aggr);
    try {
        const aggregate = match ? product_m.aggregate(match) : {};
        // const aggregate = aggr.length > 0 ? product_m.aggregate(aggr) : {};
        const data = await product_m.aggregatePaginate(aggregate, options);
        return data;
    } catch (e) {
        // Log Errors
        throw Error("Error while Paginating Product");
    }
};
