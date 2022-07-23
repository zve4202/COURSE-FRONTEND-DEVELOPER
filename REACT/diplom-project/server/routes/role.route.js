const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const Controller = require("../controllers/role.controller");

router.get("/", Controller.getList);
router.get("/:id", Controller.get);
router.post("/", [auth], Controller.add);
router.put("/:id", [auth], Controller.update);
router.delete("/:id", [auth], Controller.delete);

module.exports = router;
