const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");

const Controller = require("../controllers/catalog.controller");

router.get("/", Controller.getList);
router.get("/:id", Controller.get);
router.post("/", [auth, admin], Controller.add);
router.put("/:id", [auth, admin], Controller.update);
router.delete("/:id", [auth, admin], Controller.delete);

module.exports = router;
