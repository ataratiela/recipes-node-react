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

exports.findLikes = (userID, done) => {
	dbPool.query('SELECT * FROM recipes INNER JOIN likes on likes.recipeID = recipes.recipeID WHERE likes.userID = ?', [userID], (err, res, fields) => {
		if(err) throw err;
		done(err, res);		
	});
};

exports.saveLikes = (userID, recipeID, done) => {
	dbPool.getConnection((error, connection) => {
		connection.beginTransaction(err => {
			if(error) {
				connection.release();
				throw error;
			}
			connection.query('SELECT * FROM likes WHERE userID = ? AND recipeID = ?', [userID, recipeID], (err, res) => {
				const like = res[0];
				if(error) {
					return connection.rollback(function () {
						throw error;
					});
				}
				if(like) {
					return connection.commit((error) => {
						done({ message: 'Like already exists' });
					});
				}
				connection.query('INSERT INTO likes SET ?', [{ userID: userID, recipeID: recipeID }], (err, res) => {
					if(err) {
						return connection.rollback(() => {
							throw err;
						})
					}
					connection.commit((error) => {
						if(error) {
							return connection.rollback(() => {
								throw error;
							})
						}
						done(err, res);
					});	
				});
			});
		});
	});
};

exports.deleteLike = (userID, recipeID, done) => {
	dbPool.getConnection((error, connection) => {
		connection.beginTransaction(err => {
			if(error) {
				connection.release();
				throw error;
			}
			connection.query('SELECT * FROM likes WHERE userID = ? AND recipeID = ?', [userID, recipeID], (err, res) => {
				const like = res[0];
				if (error) {
					return connection.rollback(function () {
						throw error;
					});
				}
				if (!like) {
					return connection.commit(function (error) {
						done({ message: 'Like not found' });
					}); 
				}
				connection.query('DELETE FROM likes WHERE userID = ? AND recipeID = ?', [userID, recipeID], (err, res) => {
					if (err) {
						return connection.rollback(function () {
							throw err;
						});
					}
					connection.commit((error) => {
						if(error) {
							return connection.rollback(function () {
								throw error;
							})
						}
						done(err, res);
					})
				})
			});
		});
	});
};

exports.findById = (userID, done) => {
	dbPool.query('SELECT * FROM Users WHERE UserID = ?', [userID], (err, res, fields) => {
		if (err) throw err;
		done(err, res[0]);
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