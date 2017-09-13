const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const users = require('./users');
const recipes = require('./recipes');
const userRecipes = require('./userRecipes');
const categories = require('./categories');

router.post('/auth', (req, res) => {
  const { userID, pass } = req.body;

  User.findById(userID, (err, user) => {
    if (err) throw err;

    if (user) {
      if (user.passwd === pass) {
        const token = jwt.sign(user, req.app.get('secret-token'), {
          expiresIn: '1d'
        });

        user.rol = 'client';
        delete user.passwd;

        res.status(200).json({
          success: true,
          user,
          token
        });
      } else {
        res.status(401).json(['Incorrect password']);
      }
    } else {
      res.status(401).json(['Invalid user']);
    }
  });
});

router.use('/users', users);
router.use('/recipes', recipes);
router.use('/categories', categories);

router.use('/users/:user_id/recipes', userRecipes);

module.exports = router;