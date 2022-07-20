const express = require("express");
const Quality = require("../models/Quality");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
    try {
        const content = await Quality.find();
        res.status(200).json({
            content,
            status: 200,
            message: "Данные получены успешно"
        });
    } catch (e) {
        res.status(500).json({
            message: e.message
        });
    }
});
module.exports = router;
