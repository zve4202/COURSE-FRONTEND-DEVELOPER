const express = require("express");
const router = express.Router({ mergeParams: true });
const Profession = require("../models/Profession");

router.get("/", async (req, res) => {
    try {
        const content = await Profession.find();
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
