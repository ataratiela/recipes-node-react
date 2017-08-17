const express = require('express');
const router = express.Router();
const category = require('../models/category');

router.get('/', (req, res) => {
    category.findAll((error, categories) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify( error || categories ));
    });
});

module.exports = router;