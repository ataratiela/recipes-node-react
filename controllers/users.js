const express = require('express');
const router = express.Router();
const user = require('../models/user');

router.get('/', (req, res) => {
    user.getAll((error, result) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify( error || result ));
    });
});

module.exports = router;