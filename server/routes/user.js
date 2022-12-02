const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../models/Users');
router.use(bodyParser.json());

router.get('/', async (req, res) => {
    const users = await User.find();
    try {
        res.status(200).json({
            status: "Success",
            data: users
        })
    } catch(e) {
        res.status(400).json({
            Status: "Failed to get user",
            message: e.message
        })
    }
})

router.post('/', async (req, res) => {
    const users = await User.create(req.body);
    try {
        res.status(200).json({
            status: "Success",
            users
        })
    } catch(e) {
        res.status(400).json({
            Status: "Failed to post user",
            message: e.message
        })
    }
})

module.exports = router;