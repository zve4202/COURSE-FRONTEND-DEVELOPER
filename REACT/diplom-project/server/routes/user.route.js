const express = require("express");
const router = express.Router();

const Controller = require("../controllers/user.controller");
const authJwt = require("../middleware/authJwt");

router.get("/me", [authJwt.verifyToken], Controller.getUser);
router.get("/", [authJwt.verifyToken], Controller.getAll);
router.get("/:userId", [authJwt.verifyToken], Controller.getUser);
router.put("/:id", [authJwt.verifyToken], Controller.update);

module.exports = router;
