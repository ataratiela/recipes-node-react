var mysql = require('mysql');

var dbOption = require('../config/db-conf').mysql;

var pool = mysql.createPool(dbOption);

module.exports = pool;