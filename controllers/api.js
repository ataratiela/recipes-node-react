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
    if (err) {
      throw err;
    } else if (!user || user.passwd !== pass) {
      res.status(401).json({ success: false, message: 'Invalid user or password' });
    } else {
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
    }
  });
});

router.use('/users', users);
router.use('/recipes', recipes);
router.use('/categories', categories);

router.use('/users/:user_id', (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, req.app.get('secret-token'), (err, decoded) => {      
      if (err) {
        return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        req.decoded = decoded;    
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

router.use('/users/:user_id/recipes', userRecipes);

module.exports = router;