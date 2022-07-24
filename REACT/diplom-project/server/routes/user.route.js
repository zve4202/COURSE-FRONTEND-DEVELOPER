const express = require("express");
const router = express.Router();

const Controller = require("../controllers/user.controller");
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");

router.get("/me", [auth], Controller.getUser);
router.get("/", [auth, admin], Controller.getAll);
router.get("/:userId", [auth, admin], Controller.getUser);
router.patch("/:userId", [auth, admin], Controller.update);

module.exports = router;
