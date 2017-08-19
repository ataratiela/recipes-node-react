const express = require('express');
const router = express.Router();

const User = require ('../models/user');

router.post('/', (req, res)=>{
    const userID=req.body.user;
    const pass=req.body.pass;

    User.loginSuccess(userID, pass, (err, success)=>{
        if (err){
            res.status(500).end();
        }  else {
            res.status(200).json({id: userID});
        }
    });
});

module.exports=router;