const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.route"));
router.use("/comment", require("./comment.route"));
router.use("/profession", require("./profession.route"));
router.use("/quality", require("./quality.route"));
router.use("/user", require("./user.route"));

module.exports = router;
