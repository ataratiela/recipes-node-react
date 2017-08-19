var dbPool = require('../db/db-connector');

exports.loginSuccess = (userID, passwd, done) => {
	dbPool.query('SELECT * FROM users WHERE UserID = ? AND Passwd = ?', [userID, passwd], (err, res, fields) => {
		if (err) throw err;
		done(err, true);
	});
};

exports.findAll = (done) => {
	dbPool.query('SELECT * FROM users', (err, res, fields) => {
		if (err) throw err;
		done(err, res);
	});
};

exports.findByID = (userID, done) => {
	dbPool.query('SELECT * FROM users WHERE UserID = ?', [userID], (err, res, fields) => {
		if (err) throw err;
		done(err, res);
	});
};

exports.save = (userID, name, pass, done) => {
	dbPool.query('INSERT INTO users SET ?', [{userID: userID, Name: name, Passwd: pass}], (err, res) => {
		if (err) throw err;
		done(err, res);
	});
};

exports.update = (user, done) => {
	dbPool.query('UPDATE users SET ? WHERE UserID = ?', [user, user.userID], (err, res, fields) => {
		if (err) throw err;
		done(err, res);
	});
};

exports.delete = (userID, done) => {
	dbPool.query('DELETE FROM users WHERE UserID = ?', [userID], (err, res, fields) => {
		if (err) throw err;
		done(err, res);
	});
};