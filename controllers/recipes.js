const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

router.get('/', (req, res) => {
	Recipe.findAll((error, recipes) => {
		res.json(error || recipes);
	});
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    Recipe.findById(id, (err, results) => {
        if (err) {
            res.status(500).end();
        } else {
            res.status(200).json(results);
        }
    });
});

router.post('/', (req, res) => {
	var recipe = Recipe.new(req.body);

	Recipe.save(recipe.state, (err, response) => {
		if(!err) {
			res.status(201).json({ id: response });
		}
		else {
			res.status(500).end();
		}		
	});
});

module.exports = router;