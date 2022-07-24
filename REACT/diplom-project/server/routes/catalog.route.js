const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const authAdmin = require("../middleware/authAdmin.middleware");

const Controller = require("../controllers/catalog.controller");

router.get("/", Controller.getList);
router.get("/:id", Controller.get);
router.post("/", [auth, authAdmin], Controller.add);
router.put("/:id", [auth, authAdmin], Controller.update);
router.delete("/:id", [auth, authAdmin], Controller.delete);

module.exports = router;
