const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.post('/', (req, res) => {
    const userID = req.body.user;
    const pass = req.body.pass;

    User.loginSuccess(userID, pass, (err, user) => {
        if (err) {
            res.status(500).end();
        } else if (!user) {
            res.status(401).end();
        } else {
            res.status(200).json(user);
        }
    });
});

module.exports = router;