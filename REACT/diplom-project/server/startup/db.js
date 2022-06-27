const mongoose = require("mongoose");
const debug = require("debug")("server:db");
const chalk = require("chalk");
const dbConfig = require("../config/db.config");
const models = require("../models");
const bcrypt = require("bcryptjs");

const { importXml } = require("./importXml");

const rolesMock = require("../mockData/roles.json");
const usersMock = require("../mockData/users.json");

const e = require("express");

const {
  findNewIds,
  generateSimpleEntity,
  generateSimpleEntity_AsIs,
  getNewId,
} = require("./utils");
const { xml2json } = require("./xml2json");

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
    // setInitialData();
    importXml();
    // xml2json();
  });
};
