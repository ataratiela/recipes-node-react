const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const recipe = require('../models/recipe');

function formatImage(name, image) {
    let fileName = name.toLowerCase().replace(' ', '-');
    let fileData = null;

    if(fileName.includes('.png')) {
        fileName = fileName + '.png';
        fileData = image.replace(/^data:image\/png;base64,/, '');
    }
    else {
        fileName = fileName + '.jpg';
        fileData = image.replace(/^data:image\/jpeg;base64,/, '');
    }

    const filePath = path.join(__dirname, '../public/imgs/' + fileName);

    return { filePath, fileData };
}

router.get('/', (req, res) => {
    recipe.findAll((error, recipes) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(error || recipes));
    });
});

router.post('/', (req, res) => {
    const newRecipe = req.body;
    const { filePath, fileData } = formatImage(newRecipe.name, newRecipe.image);

    fs.writeFile(filePath, fileData, 'base64', (err) => {
        if (err) throw err;
    });
});

module.exports = router;