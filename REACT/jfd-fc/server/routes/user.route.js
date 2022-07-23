const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/User");
const auth = require("../middleware/auth.middleware");

router.get("/", [auth], async (req, res) => {
    try {
        const content = await User.find();
        res.send({
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

router.patch("/:id", [auth], async (req, res) => {
    try {
        const { id } = req.params;

        if (id && req.user._id === id) {
            const content = await User.findByIdAndUpdate(id, req.body, {
                new: true
            });
            return res.json({
                content,
                status: 200,
                message: "Данные успешно обновлены"
            });
        }

        res.status(401).json({
            message: "Unathorized"
        });
    } catch (e) {
        res.status(500).json({
            message: e.message
        });
    }
});
module.exports = router;
