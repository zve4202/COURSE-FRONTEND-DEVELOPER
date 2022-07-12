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
    // console.log("getSort", query);

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
      // console.log(key, "typeof value", typeof value, value);
      // console.log(
      //   "map",
      //   typeof map,
      //   map,
      //   "Array.isArray(map)",
      //   Array.isArray(map)
      // );

      if (Array.isArray(map)) {
        const alias = slugify(value);
        map.forEach((field) => {
          // console.log("field", field);
          if (field.includes("alias")) {
            value = {
              $regex: `${alias}`,
            };
          } else {
            value = {
              $regex: `${value}`,
              $options: "i",
            };
          }
          console.log("value", typeof value, value);

          $or.push({
            [field]: value,
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

module.exports = {
  getSort,
  getMatching,
};
