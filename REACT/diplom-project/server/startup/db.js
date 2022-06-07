const mongoose = require("mongoose");
const debug = require("debug")("server:db");
const chalk = require("chalk");
const dbConfig = require("../config/db.config");
const models = require("../models");
const bcrypt = require("bcryptjs");

// const professionsMock = require("../mockData/professions.json");
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
// const generateUsers=(data,model)=>{

// }
// const findProfession = (professionId, professions) => {
//   const profession = professionsMock.find((el) => el._id === professionId);
//   return professions.find((prof) => prof.name === profession.name)._id;
// };
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
  // const professionsData = await generateSimpleEntity(
  //     professionsMock,
  //     models.profession
  // );
  // if (professionsData) {
  //     debug(`Professions in DB ${chalk.green("✓")}`);
  // } else {
  //     debug(`Professions error ${chalk.red("x")}`);
  // }

  const rolesData = await generateSimpleEntity(rolesMock, models.role);
  if (rolesData) {
    debug(`Roles in DB ${chalk.green("✓")}`);
  } else {
    debug(`Roles error ${chalk.red("x")}`);
  }

  const users = await Promise.all(
    usersMock.map(async (userData) => {
      try {
        const user = await models.user.find({
          email: userData.email,
        });
        if (user.length !== 0) {
          return user[0];
        }
        delete userData._id;
        userData.roles = findRoles(userData.roles, rolesData);
        const salt = await bcrypt.genSalt(5);
        userData.password = await bcrypt.hash(userData.password, salt);
        const newUser = new models.user(userData);

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
