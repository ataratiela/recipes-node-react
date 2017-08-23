const express = require('express');
const router = express.Router();
const user = require('../models/user');

router.post('/', (req, res) => {
    const userID = req.body.user;
    const name = req.body.name;
    const pass = req.body.pass;

    user.save(userID, name, pass, (error, results) => {
        if (error) {
            res.status(500).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;