const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

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
        user: user,
        token: token
      });
    }
  });
});

module.exports = router;