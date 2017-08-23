const express = require('express');
const router = express.Router();
const user = require('../models/user');

router.get('/', (req, res) => {
    user.findAll((error, results) => {
        if (err) {
            res.status(500).end();
        } else {
            res.status(200).json(results);
        }
    });
});

router.get('/edit/:userID', (req, res) => {
    const userID = req.params.UserID;

    user.findByID(UserID, (error, results) => {
        if (err) {
            res.status(500).end();
        } else {
            res.status(200).json(results);
        }
    });
});

router.put('/update/:userID', (req, res) => {
    const userID = req.body.UserID;
    const name = req.body.Name;
    const password = req.body.Passwd;

    user.update(user, (error, results) => {
        if (err) {
            res.status(500).end();
        } else {
            res.status(200).end(results);
        }
    });
});

router.delete('/delete/:userID', (req, res) => {
    const userID = req.params.UserID;

    user.delete(userID, (error, results) => {
        if (err) {
            res.status(500).end();
        } else {
            res.status(200).json(results);
        }
    });
});

module.exports = router;