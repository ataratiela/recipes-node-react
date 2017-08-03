var dbPool = require('../db/db-connector');

var user = {
	findAll: (done) => {
		dbPool.query('SELECT * FROM users', (err, res, fields) => {
			if (err) throw err;
			done(null, res);
		});
	},

	findByID: (userID, done) => {
		dbPool.query('SELECT * FROM users WHERE UserID = ?', [userID], (err, res, fields) => {
			if (err) throw err;
			done(null, res);
		});
	},

	save: (user, done) => {
		dbPool.query('INSERT INTO users SET ?', [user], (err, res, fields) => {
			if (err) throw err;
			done(null, res);
		});
	},

	update: (user, done) => {
		dbPool.query('UPDATE users SET ? WHERE UserID = ?', [user, user.userID], (err, res, fields) => {
			if (err) throw err;
			done(null, res);
		});
	},

	delete: (userID, done) => {
		dbPool.query('DELETE FROM users WHERE UserID = ?', [userID], (err, res, fields) => {
			if (err) throw err;
			done(null, res);
		});
	}
};

module.exports = user;