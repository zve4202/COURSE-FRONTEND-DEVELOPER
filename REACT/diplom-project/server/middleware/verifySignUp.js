const db = require("../models");
const User = db.user;

checkDuplicateEmail = (req, res, next) => {
  // Email
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({
        error: {
          code: 500,
          message: err,
        },
      });
      return;
    }

    if (user) {
      res.status(400).send({
        error: {
          code: 400,
          message: "EMAIL_EXISTS",
        },
      });
      return;
    }

    next();
  });
};

const verifySignUp = {
  checkDuplicateEmail,
};

module.exports = verifySignUp;
