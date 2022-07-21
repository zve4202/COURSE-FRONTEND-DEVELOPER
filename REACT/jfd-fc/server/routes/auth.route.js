const express = require("express");
const router = express.Router({ mergeParams: true });
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const { generateUserData } = require("../utils/helpers");
const tokenService = require("../services/token.service");

router.post("/signUp", async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                error: {
                    message: "EMAIL_EXISTS",
                    code: 400
                }
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            ...generateUserData(),
            ...req.body,
            password: hashedPassword
        });

        const tokens = tokenService.generate({ userId: (await newUser)._id });

        res.status(201).send({ ...tokens, userId: newUser._id });
    } catch (e) {
        res.status(500).json({
            message: e.message
        });
    }
});

router.post("/signInWithPassword", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = User.findOne({ email });
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
