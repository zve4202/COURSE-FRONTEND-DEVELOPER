const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const chalk = require("chalk");

const PORT = 8080;
const app = express();

app.listen(PORT, () => {
  console.log(chalk.green(`Server has been start on port ${PORT}...`));
});
