const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const logins = require('./login');
const register = require('./register');
const users = require('./users');
const recipes = require('./recipes');
const categories = require('./categories');

router.post('/auth', (req, res) => {
  const { userId, pass } = req.body;

  User.findById(userId, pass, (err, user) => {
    if (err) {
      throw err;
    } else if (!user || user.passwd !== pass) {
      res.status(401).json({ success: false, message: 'Invalid user or password' });
    } else {
      var token = jwt.sign(user, app.get('secret-token'), {
        expiresInMinutes: 1440
      });

      delete user.passwd;

      res.status(200).json({
        success: true,
        token: token
      });
    }
  });
});

route.use((req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, app.get('token-secret'), (err, decoded) => {      
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

module.exports = router;