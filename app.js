const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const logins = require('./controllers/login');
const register = require('./controllers/register');
const users = require('./controllers/users');
const recipes = require('./controllers/recipes');
const categories = require('./controllers/categories');

// Uncoment once we have a favicon
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/login', logins);
app.use('/register', register);
app.use('/users', users);
app.use('/recipes', recipes);
app.use('/categories', categories);

app.get('*', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, 'client/build/index.html'));
});

module.exports = app;