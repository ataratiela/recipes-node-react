const express = require('express');
const router = express.Router();
const user = require('../models/user');

router.get('/', (req, res) => {
    user.findAll((error, result) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify( error || result ));
    });
});

router.get('/edit/:userID', (req, res) => {
    const userID = req.params.userID;

    user.findByID(userID, (error, result) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify( error || result ));
    });
});

router.get('/add', (req, res) => {
    const user = {
        userID : req.body.userID,
		name : req.body.name,
		password : req.body.password
    }

    user.save(user, (error, result) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify( error || result ));
    });
});

router.put('/update/:userID', (req, res) => {
    const user = {
        userID : req.body.userID,
		name : req.body.name,
		password : req.body.password
    }

    user.update(user, (error, result) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify( error || result ));
    });
});

router.delete('/delete/:userID', (req, res) => {
    const userID = req.params.userID;

    user.delete(userID, (error, result) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify( error || result ));
    });
});

module.exports = router;