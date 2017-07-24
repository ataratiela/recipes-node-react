var dbPool = require('../db/db-connector');

var user = {
	getAll: (done) => {
		dbPool.query('SELECT * FROM users', (err, res, fields) => {
			if (err) throw err;
			done(null, res);
		});
	},

	getOne: (userID, done) => {
		dbPool.query('SELECT * FROM users WHERE UserID = ?', (err, res, fields) => {
			if (err) throw err;
			done(null, res);
		});
	},

	insert: (user, done) => {
		dbPool.query('INSERT INTO users SET ?', (err, res, fields) => {
			if (err) throw err;
			done(null, res);
		});
	},

	update: (user, userID, done) => {
		dbPool.query('UPDATE users SET ? WHERE UserID = ?', (err, res, fields) => {
			if (err) throw err;
			done(null, res);
		});
	},

	delete: (userID, done) => {
		dbPool.query('DELETE FROM users WHERE UserID = ?', (err, res, fields) => {
			if (err) throw err;
			done(null, res);
		});
	}
};

module.exports = user;