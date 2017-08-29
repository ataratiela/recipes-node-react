var dbPool = require('../db/db-connector');

exports.loginSuccess = (userID, passwd, done) => {
	dbPool.query('SELECT * FROM Users WHERE UserID = ?', [userID], (err, res, fields) => {
		if (err) throw err;

		const user = res[0];
		if (user) {
			if(user.passwd === passwd){
				delete user.passwd;
				done(err, user);
			}else{
				done(['Incorrect password']);
			}
		} else {
			done(['Invalid user']);
		}
	});
};

exports.findAll = (done) => {
	dbPool.query('SELECT * FROM Users', (err, res, fields) => {
		if (err) throw err;
		done(err, res);
	});
};

exports.findByID = (userID, done) => {
	dbPool.query('SELECT * FROM Users WHERE UserID = ?', [userID], (err, res, fields) => {
		if (err) throw err;
		done(err, res);
	});
};

exports.save = (userID, name, pass, done) => {
	dbPool.query('INSERT INTO Users SET ?', [{ userID: userID, Name: name, Passwd: pass }], (err, res) => {
		if (err) throw err;
		done(err, res);
	});
};

exports.update = (userID, name, pass, done) => {
	dbPool.query('UPDATE Users SET ? WHERE UserID = ?', [userID, name, pass], (err, res, fields) => {
		if (err) throw err;
		done(err, res);
	});
};

exports.delete = (userID, done) => {
	dbPool.query('DELETE FROM Users WHERE UserID = ?', [userID], (err, res, fields) => {
		if (err) throw err;
		done(err, res);
	});
};