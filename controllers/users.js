const express = require('express');
const router = express.Router();
const user = require('../models/user');
const recipe = require('../models/recipe');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    user.findAll((error, results) => {
        if (err) {
            res.status(500).end();
        } else {
            res.status(200).json(results);
        }
    });
});

router.use('/:user_id', (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, req.app.get('secret-token'), (err, decoded) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                req.user = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

router.get('/:user_id/recipes', (req, res) => {
	const { userID } = req.user;
    recipe.findByUser(userID, (error, recipes) => {
      res.json(error || recipes);
      console.log(recipes);
    });
});

router.get('/:user_id/liked-recipes', (req, res) => {
	const { userID } = req.user;
    user.findLikes(userID, (error, recipes) => {
      res.json(error || recipes);
    });
});

router.post('/:user_id/liked-recipes', (req, res) => {
    const { userID } = req.user;
    const recipeID = req.body.recipeID;
    user.saveLikes(userID, recipeID, (error, recipe) => {
        if(error && error.message) {
            res.status(500).json(error.message);
        } else if(error) {
            res.status(500).end();
        } else {
            res.status(201).json({ userID, recipeID });
        }
    });
});

router.delete('/:user_id/liked-recipes/recipes/:recipe_id', (req, res) => {
    const userID = req.body.userID;
    const recipeID = req.params.recipe_id;
    user.deleteLike(userID, recipeID, (error, results) => {
        if(error && error.message) {
            res.status(404).json([error.message]);
        } else if(error) {
            res.status(500).end();
        } else {
            res.status(200).json(['User ' + userID + ' no longer likes recipe ' + recipeID]);
        }
    });
});

module.exports = router;