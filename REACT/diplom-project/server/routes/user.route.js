const express = require("express");
const router = express.Router();

const Controller = require("../controllers/user.controller");
const auth = require("../middleware/auth.middleware");

router.get("/me", [auth], Controller.getUser);
router.get("/", [auth], Controller.getAll);
router.get("/:userId", [auth], Controller.getUser);
router.put("/:id", [auth], Controller.update);

module.exports = router;
