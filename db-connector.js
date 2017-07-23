'use strict';

var mysql = require('mysql');

var dbOption = require('./db-conf').mysql;

var myConn = mysql.createConnection(dbOption)

myConn.connect((err) => {
	return (err) ? console.log(`Error connecting to MySQL: ${error.stack}`) : console.log(`Connection established with MySQL Nº: ${myConn.threadId}`);
});

var UserConexion = () => {};

UserConexion.getAll = (cb) => {
	myConn.query('SELECT * FROM users', cb);
};

UserConexion.getOne = (UserID, cb) => {
	myConn.query('SELECT * FROM users WHERE UserID = ?', UserID, cb);
};

UserConexion.insert = (data, cb) => {
	myConn.query('INSERT INTO users SET ?', data, cb);
};

UserConexion.update = (data, cb) => {
	myConn.query('UPDATE users SET ? WHERE UserID = ?', [data, data.UserID], cb);
};

UserConexion.delete = (UserID, cb) => {
	myConn.query('DELETE FROM users WHERE UserID = ?', UserID, cb)
};

module.exports = myConn;