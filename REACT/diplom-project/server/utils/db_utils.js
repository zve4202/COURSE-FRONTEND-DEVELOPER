// const conf = require("../config/config.db");
// const gen = require("mongo-incremental-id-generator")(conf.connection_string);

const sequences = require("../models/Sequence");
/*
function getNextSequence(name) {
   var ret = db.counters.findAndModify(
          {
            query: { _id: name },
            update: { $inc: { seq: 1 } },
            new: true,
            upsert : true // Creates a new document if no documents match the query
          }
   );

   return ret.seq;
}
*/

const createId = async (name) => {
    const ret = await sequences.findOneAndUpdate(
        { _id: name },
        { $inc: { seq: 1 } },
        {
            new: true,
            upsert: true // Creates a new document if no documents match the query
        }
    );
    return ret.seq;
};

const { slugify } = require("./index");

const getSort = (query, sortMap) => {
    const { sort, order } = query;
    const result = {};
    if (sort) {
        const map = sortMap[sort];
        if (map) {
            map.forEach((field) => {
                result[field] = Number(order);
            });
        }
        delete query.sort;
        delete query.order;

        return result;
    }

    return null;
};

// /abba/gi;
const getMatching = (query, searchMap) => {
    if (Object.keys(query).length === 0) return null;

    const result = [];
    const $match = {};
    const $or = [];

    Object.keys(query).forEach((key) => {
        const map = searchMap[key];
        if (map) {
            let queryValue = query[key];

            // console.log("queryValue", queryValue, "map", map.field);

            if (map.number) {
                const numvalue = Number(queryValue);
                if (numvalue && numvalue == queryValue) {
                    $match[map.field] = numvalue;
                }
            } else {
                let newValue;
                const words = queryValue.split(" ");
                for (const word of words) {
                    // console.log(word);
                    if (!word) {
                        continue;
                    }
                    if (newValue) {
                        newValue += "|" + word;
                    } else {
                        newValue = word;
                    }
                }
                const alias = slugify(newValue);
                if (Array.isArray(map.field)) {
                    map.field.forEach((field) => {
                        // console.log(field);
                        let value = {};
                        if (field.includes("alias")) {
                            value = {
                                $regex: `${alias}`
                            };
                        } else {
                            value = {
                                $regex: `^${newValue}`,
                                $options: "i"
                            };
                        }
                        // console.log(value);

                        $or.push({
                            [field]: value
                        });
                    });
                } else {
                    $or.push({
                        [map.field]: newValue
                    });
                }
            }
        }
    });

    if ($or.length > 0) {
        $match.$or = $or;
    }

    console.log("$match", $match, "$or", $or);
    if (Object.keys($match).length === 0) return null;

    result.push({ $match });

    return result;
};

module.exports = {
    getSort,
    getMatching,
    createId
};
