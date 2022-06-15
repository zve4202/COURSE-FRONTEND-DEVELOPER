const express = require("express");
const router = express.Router();

const Controller = require("../controllers/order_details.controller");
const authJwt = require("../middleware/authJwt");

router.get("/", [authJwt.verifyToken], Controller.getList);
router.get("/:orderId", [authJwt.verifyToken], Controller.get);
router.put("/:id", [authJwt.verifyToken], Controller.update);
router.post("/:id", [authJwt.verifyToken], Controller.add);
router.delete("/:id", [authJwt.verifyToken], Controller.delete);

module.exports = router;
