const express = require('express');
const router = express.Router();
const recipe = require('../models/recipe');

router.get('/', (req, res) => {
    recipe.findAll((error, recipes) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify( error || recipes ));
    });
});

module.exports = router;