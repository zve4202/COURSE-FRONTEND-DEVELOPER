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
const e = require("express");

const generateSimpleEntity = (data, model) => {
  return Promise.all(
    data.map(async (example) => {
      try {
        const exm = await model.find({
          name: example.name,
        });

        if (exm.length !== 0) {
          return exm[0];
        }
        const example_id = example._id;
        delete example._id;
        const newExm = new model(example);
        example._id = example_id;
        await newExm.save();
        return newExm;
      } catch (error) {
        return error;
      }
    })
  );
};

const getNewId = (mockId, data, mockData) => {
  const newItem = mockData.find((el) => el._id === mockId);
  return data.find((el) => el.name === newItem.name)._id;
};

const findRoles = (rolesIds, roles) => {
  const newRoles = [];
  for (const roleMosk of rolesMock) {
    for (const roleId of rolesIds) {
      if (roleId === roleMosk._id) {
        for (const role of roles) {
          if (role.role === roleMosk.role) newRoles.push(role._id);
        }
      }
    }
  }
  return newRoles;
};

async function setInitialData() {
  const categories = await generateSimpleEntity(
    categoriesMock,
    models.category
  );
  if (categories) {
    debug(`Categories in DB ${chalk.green("✓")}`);
  } else {
    debug(`Categories error ${chalk.red("x")}`);
  }

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
    debug(`Formats in DB ${chalk.green("✓")}`);
  } else {
    debug(`Formats error ${chalk.red("x")}`);
  }

  const roles = await generateSimpleEntity(rolesMock, models.role);
  if (roles) {
    debug(`Roles in DB ${chalk.green("✓")}`);
  } else {
    debug(`Roles error ${chalk.red("x")}`);
  }

  const users = await Promise.all(
    usersMock.map(async (user) => {
      try {
        const findUser = await models.user.find({
          email: user.email,
        });
        if (findUser.length !== 0) {
          return findUser[0];
        }
        user.roles = findRoles(user.roles, roles);
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
    debug(`Users in DB ${chalk.green("✓")}`);
  } else {
    debug(`Users error ${chalk.green("x")}`);
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
