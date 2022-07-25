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

const getMatching = (query, searchMap) => {
    if (Object.keys(query).length === 0) return null;

    const result = [];
    const $match = {};
    const $or = [];

    Object.keys(query).forEach((key) => {
        const map = searchMap[key];
        if (map) {
            let value = query[key];

            const numvalue = Number(value);
            if (numvalue && numvalue == value) {
                value = numvalue;
            }

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
        $match.$or = $or;
    }

    if (Object.keys($match).length === 0) return null;

    result.push({ $match });

    return result;
};

module.exports = {
    getSort,
    getMatching
};
