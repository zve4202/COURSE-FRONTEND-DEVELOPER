const config = require("../config/config.json");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signUp = (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 5),
    sex: req.body.sex,
    role: req.body.role,
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({
        error: {
          code: 500,
          message: err,
        },
      });
      return;
    }
    var token = jwt.sign({ _id: user._id }, config.secret);

    return res.status(200).json({
      status: 200,
      content: user,
      accessToken: token,
      message: "SIGNUP_SUCCESS",
    });
  });
};

exports.signIn = (req, res) => {
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

    if (!user) {
      return res.status(400).send({
        error: {
          code: 400,
          message: "EMAIL_NOT_FOUND",
        },
      });
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(400).send({
        error: {
          code: 400,
          message: "INVALID_PASSWORD",
        },
      });
    }

    var token = jwt.sign({ _id: user._id }, config.secret);
    return res.status(200).json({
      status: 200,
      content: user,
      accessToken: token,
      message: "SIGNIN_SUCCESS",
    });
  });
};
