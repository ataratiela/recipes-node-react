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

	if (image.includes('png')) {
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
	saveImage(recipe.name, recipe.image)
		.then((route) => {
			recipe.image = route
			dbPool.query('INSERT INTO Recipes SET ?', [recipe], (err, res) => {
				if (err) throw err;
				done(err, res);
			});
		})
		.catch(err => {
			done(err);
		});
}