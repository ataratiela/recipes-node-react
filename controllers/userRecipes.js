const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

router.get('/', (req, res) => {
	res.status(200).json({ message: 'User recipes requested' });
});

router.post('/', (req, res) => {
	let recipe = req.body;
	recipe.userID = req.user.userID;

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