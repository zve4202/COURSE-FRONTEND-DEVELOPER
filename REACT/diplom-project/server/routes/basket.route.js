const express = require("express");
const router = express.Router();

const Controller = require("../controllers/basket.controller");

router.get("/", Controller.getList);
router.get("/ex:id", Controller.getEx);
router.get("/:id", Controller.get);
router.post("/", Controller.add);
router.put("/:id", Controller.update);
router.delete("/:id", Controller.delete);

module.exports = router;
