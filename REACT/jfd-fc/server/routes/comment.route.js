const express = require("express");
const router = express.Router({ mergeParams: true });
const Comment = require("../models/Comment");

router.get("/", async (req, res) => {
    try {
        const content = await Comment.find();
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
