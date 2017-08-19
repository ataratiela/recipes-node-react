const dbPool = require('../db/db-connector');
const path = require('path');
const fs = require('fs');

function saveImage(name, image) {
	const { filePath, fileData, fileName } = formatImage(name, image);
	const route = '/imgs/' + fileName;

	return new Promise((resolve, reject) => {
		fs.writeFile(filePath, fileData, 'base64', function (err) {
			if (err) reject(err);
			else resolve(route);
		});
	});
}

function formatImage(name, image) {
	let fileName = name.toLowerCase().replace(' ', '-');
	let fileData = null;

	if (image.slice(0, 20).includes('png')) {
		fileName = fileName + '.png';
		fileData = image.replace(/^data:image\/png;base64,/, '');
	}
	else {
		fileName = fileName + '.jpg';
		fileData = image.replace(/^data:image\/jpeg;base64,/, '');
	}

	const filePath = path.join(__dirname, '../public/imgs/' + fileName);

	return { filePath, fileData, fileName };
}

const recipe = (recipe) => {
	let state = recipe;

	return {
		state
	}
}

exports.new = recipe;

exports.findAll = (done) => {
	dbPool.query('SELECT * FROM Recipes', (err, res, fields) => {
		if (err) throw err;

		let recipes = res.map(r => recipe(r)).map(r => r.state);
		done(null, recipes);
	});
};

exports.save = (recipe, done) => {
	let { name, image, steps } = recipe;


	delete recipe.steps;

	saveImage(name, image)
		.then(route => {
			recipe.image = route;
			dbPool.getConnection((error, connection) => {
				connection.beginTransaction(err => {
					if (error) { 
						connection.release();
						throw error; 
					}
					console.log(recipe);
					connection.query('INSERT INTO Recipes SET ?', [recipe], (err, res) => {
						if (err) {
							return connection.rollback(function () {
								connection.release();
								throw err;
							});
						}

						const insertSets = steps.map(s => {
							return [ s.value, res.insertId ];
						});

						connection.query('INSERT INTO Steps (step, recipeID) VALUES ?', [insertSets], function (error, results) {
							if (error) {
								return connection.rollback(function () {
									connection.release();
									throw error;
								});
							}
							connection.commit(function (err) {
								if (err) {
									return connection.rollback(function () {
										connection.release();
										throw err;
									});
								}
								connection.release();
								done(err, res.insertId);
							});
						});
					});
				});
			});
		})
		.catch(err => {
			done(err);
		});
}