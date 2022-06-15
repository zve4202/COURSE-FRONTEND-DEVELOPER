const express = require("express");
const router = express.Router();

const Controller = require("../controllers/user.controller");
const authJwt = require("../middleware/authJwt");

router.get("/me", [authJwt.verifyToken], Controller.getUser);
router.get("/", Controller.getUserList);
router.get("/:userId", Controller.getUser);
router.put("/:id", Controller.update);

module.exports = router;
