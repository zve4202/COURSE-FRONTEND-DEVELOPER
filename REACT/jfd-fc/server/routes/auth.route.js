const express = require("express");
const router = express.Router({ mergeParams: true });

router.post("/signUp", async (req, res) => {
    try {
    } catch (e) {
        res.status(500).json({
            message: e.message
        });
    }
});

router.post("/signInWithPassword", async (req, res) => {
    try {
    } catch (e) {
        res.status(500).json({
            message: e.message
        });
    }
});

router.post("/token", async (req, res) => {
    try {
    } catch (e) {
        res.status(500).json({
            message: e.message
        });
    }
});

router.get("/", async (req, res) => {
    res.end("OK!");
});

module.exports = router;
