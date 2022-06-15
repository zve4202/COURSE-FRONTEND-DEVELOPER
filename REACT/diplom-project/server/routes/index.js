const express = require("express");
const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const roleRoute = require("./role.route");
const categoryRoute = require("./category.route");
const productRoute = require("./product.route");
const formatRoute = require("./format.route");
const orderRoute = require("./order.route");
const orderListRoute = require("./order_list.route");

const router = express.Router({ mergeParams: true });

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/role", roleRoute);
router.use("/category", categoryRoute);
router.use("/product", productRoute);
router.use("/format", formatRoute);
router.use("/order", orderRoute);
router.use("/orderlist", orderListRoute);

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.use("/api/v1", router);
};
