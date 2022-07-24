const express = require("express");
const router = express.Router();

const Controller = require("../controllers/user.controller");
const auth = require("../middleware/auth.middleware");
const authAdmin = require("../middleware/authAdmin.middleware");

router.get("/me", [auth], Controller.getUser);
router.get("/", [auth, authAdmin], Controller.getAll);
router.get("/:userId", [auth], Controller.getUser);
router.put("/:userId", [auth], Controller.update);

module.exports = router;
