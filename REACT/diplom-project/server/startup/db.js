const mongoose = require("mongoose");
const debug = require("debug")("server:db");
const chalk = require("chalk");
const { dbConfig } = require("../config");

const initFromMock = require("./initFromMock");
const initFromXml = require("./initFromXml");

module.exports = function () {
    mongoose.connect(
        `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`
    );

    const db = mongoose.connection;

    db.on(
        "error",
        console.error.bind(console, `${chalk.red("x")} connection error:`)
    );

    db.once("open", async function () {
        debug(`MongoDB status: Connected ${chalk.green("✓")}`);
        await initFromMock();
        await initFromXml();
    });
};
