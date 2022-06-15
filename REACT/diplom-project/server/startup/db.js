const mongoose = require("mongoose");
const debug = require("debug")("server:db");
const chalk = require("chalk");
const dbConfig = require("../config/db.config");
const models = require("../models");
const bcrypt = require("bcryptjs");

const categoriesMock = require("../mockData/categories.json");
const formatsMock = require("../mockData/formats.json");
const rolesMock = require("../mockData/roles.json");
const usersMock = require("../mockData/users.json");
const catalogMock = require("../mockData/catalog.json");
const labelMock = require("../mockData/labels.json");
const productMock = require("../mockData/products.json");
const e = require("express");
const {
  findNewIds,
  generateSimpleEntity,
  generateSimpleEntity_AsIs,
  getNewId,
} = require("./utils");

async function InitSimpleEntity(name, data, model, asIs = false) {
  var result = undefined;
  if (asIs) {
    result = await generateSimpleEntity_AsIs(data, model);
  } else {
    result = await generateSimpleEntity(data, model);
  }
  if (result) {
    debug(`${name} in DB ${chalk.green("✓")}`);
  } else {
    debug(`${name} error ${chalk.red("x")}`);
  }
  return result;
}

async function setInitialData() {
  const roles = await InitSimpleEntity("roles", rolesMock, models.role, true);

  const users = await Promise.all(
    usersMock.map(async (user) => {
      try {
        const findUser = await models.user.find({
          email: user.email,
        });
        if (findUser.length !== 0) {
          return findUser[0];
        }
        const salt = await bcrypt.genSalt(5);
        user.password = await bcrypt.hash(user.password, salt);
        delete user._id;
        const newUser = new models.user(user);
        await newUser.save();
        return newUser;
      } catch (error) {
        return error;
      }
    })
  );
  if (users) {
    debug(`users in DB ${chalk.green("✓")}`);
  } else {
    debug(`users error ${chalk.green("x")}`);
  }

  const categories = await InitSimpleEntity(
    "categories",
    categoriesMock,
    models.category
  );

  const formats = await Promise.all(
    formatsMock.map(async (item) => {
      try {
        const findFormat = await models.format.find({
          name: item.name,
        });
        if (findFormat.length !== 0) {
          return findFormat[0];
        }
        item.category = getNewId(item.category, categories, categoriesMock);
        const example_id = item._id;
        delete item._id;
        const newFormat = new models.format(item);
        item._id = example_id;
        await newFormat.save();
        return newFormat;
      } catch (error) {
        return error;
      }
    })
  );
  if (formats) {
    debug(`formats in DB ${chalk.green("✓")}`);
  } else {
    debug(`formats error ${chalk.red("x")}`);
  }

  const labels = await InitSimpleEntity("labels", labelMock, models.label);

  const catalog = await Promise.all(
    catalogMock.map(async (item) => {
      try {
        const find = await models.catalog.find({
          barcode: item.barcode,
        });
        if (find.length !== 0) {
          return find[0];
        }
        item.format = getNewId(item.format, formats, formatsMock);
        item.label = getNewId(item.label, labels, labelMock);
        const example_id = item._id;
        delete item._id;
        const newItem = new models.catalog(item);
        item._id = example_id;
        await newItem.save();
        return newItem;
      } catch (error) {
        return error;
      }
    })
  );
  if (catalog) {
    debug(`catalog in DB ${chalk.green("✓")}`);
  } else {
    debug(`catalog error ${chalk.red("x")}`);
  }

  const products = await Promise.all(
    productMock.map(async (item) => {
      try {
        const find = await models.product.find({
          article: item.article,
        });
        if (find.length !== 0) {
          return find[0];
        }
        item.catalog = getNewId(item.catalog, catalog, catalogMock, "barcode");
        const example_id = item._id;
        delete item._id;
        const newItem = new models.product(item);
        item._id = example_id;
        await newItem.save();
        return newItem;
      } catch (error) {
        return error;
      }
    })
  );
  if (products) {
    debug(`products in DB ${chalk.green("✓")}`);
  } else {
    debug(`products error ${chalk.red("x")}`);
  }
}

module.exports = function () {
  mongoose.connect(
    `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`
  );
  var db = mongoose.connection;
  db.on(
    "error",
    console.error.bind(console, `${chalk.green("x")} connection error:`)
  );
  db.once("open", function () {
    debug(`MongoDB status: Connected ${chalk.green("✓")}`);
    setInitialData();
  });
};
