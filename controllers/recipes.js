const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

router.get('/', (req, res) => {
	Recipe.findAll((error, recipes) => {
		res.json(error || recipes);
	});
});

router.post('/', (req, res) => {
	var recipe = Recipe.new(req.body);

	Recipe.save(recipe.state, (err, response) => {
		if(!err) {
			res.status(201).json({ id: response.insertId });
		}
		else {
			res.status(500).end();
		}		
	});
});

module.exports = router;