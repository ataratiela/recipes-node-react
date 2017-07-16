'use strict';

var mysql = require('mysql');

var conf = require('./db-conf');
var dbOption = {
	host: conf.mysql.host,
	port: conf.mysql.port,
	user: conf.mysql.user,
	password: conf.mysql.pass,
	database: conf.mysql.db
};

var myConn = mysql.createConnection(dbOption)

myConn.connect((err) => {
	return (err) ? console.log(`Error connecting to MySQL: ${error.stack}`) : console.log(`Connection established with MySQL Nº: ${myConn.threadId}`);
});

module.exports = myConn;