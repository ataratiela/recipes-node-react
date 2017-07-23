var dbPool = require('../db/db-connector');

var user = {
	getAll: (done) => {
		dbPool.query('SELECT * FROM users', (err, res, fields) => {
			if (err) throw err;
			done(null, res);
		});
	}
};

/*User.getAll = (cb) => {
	myConn.query('SELECT * FROM users', cb);
};

User.getOne = (UserID, cb) => {
	myConn.query('SELECT * FROM users WHERE UserID = ?', UserID, cb);
};

User.insert = (data, cb) => {
	myConn.query('INSERT INTO users SET ?', data, cb);
};

User.update = (data, cb) => {
	myConn.query('UPDATE users SET ? WHERE UserID = ?', [data, data.UserID], cb);
};

User.delete = (UserID, cb) => {
	myConn.query('DELETE FROM users WHERE UserID = ?', UserID, cb)
};*/

module.exports = user;